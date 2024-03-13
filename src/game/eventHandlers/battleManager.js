const {
    Client,
    GatewayIntentBits,
    Partials,
    /* ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,*/
    EmbedBuilder 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});
const ObjectId = require('mongoose').Types.ObjectId; 

const BattleSession = require.main.require('./models/BattleSession');

module.exports = {
    initBattle: async (message, battleState) => {
        console.log("Battle Started!");
        // Message of Battle Start
        message.channel.send({
            content: "Fight!!!!",
        });
        await battleState.init();
    },
    handleBattleCommands: async (message) => {

        const [command, ...args] = message.content.substring(1).split(' ');
    
        const battleSession = await BattleSession.findOne({
            characters: { $elemMatch: { characterId: message.author.id}}
        });

        // Return if the player is not in a battle
        if (!battleSession) {
            message.channel.send({
                content: "You're not in a battle!",
            });
            return;
        }

        // Return if it's not player's turn
        if (battleSession.turn) {
            message.reply({
                content: "It's not your turn! @" + message.author.id
            });
            return;
        }

        const commands = {
            "ATTACK": async (args) => {
                let targetString = args[0].toLowerCase();
                let target = battleSession.characters.includes(targetString);
                await attack(battleSession, )
            },
            "SKILL": async (args) => {
                let target = args[0].toUpperCase() + str.slice(1);
                
                await useSkill()
            },
            "ITEM": async (args) => {
                await useItem()
            },
            
        };

        commands[command.toUpperCase()](args);
    },
    loopBattle: async (message, battleState) => {

        let sessionId = battleState.sessionId;

        //Fetch session data from Database
        const battleSession = await BattleSession.findOne({ _id: new ObjectId(sessionId)});
        
        await battleSession.populate('characters.character');
        
        if (!battleSession) {
            console.log("Critical Error");
            return;
        }

        let characters = battleSession.characters;
        let turnCounter = battleSession.turnCounter;

        let turn, currentCharacter, action;

        while (!isBattleEnded(characters)) {
            turn = battleState.state;
            
            // increment if every characters took an action
            if (turn == 0) turnCounter++;
            
            console.log("The turn is: ", turn);

            currentCharacter = characters[turn].character;
            let team = characters[turn].team;
            
            // ===================================================
            //                MONSTER TURN LOGIC
            // ===================================================
            if (characters[turn].type == "Monster") {
                action = await actionMaker(message, battleSession, turn);
            };

            // ===================================================
            //                 PLAYER TURN LOGIC
            // ===================================================

            if (characters[turn].type == "Player") {
                // Time Limit to the Player to Take Action (sec)
                let actionTimeLimit = 3;

                let timeLimitUnix = Math.floor(
                    (new Date().getTime() / 1000) + actionTimeLimit
                );
                let countdownMessage = await message.channel.send({
                    content: `You have <t:${timeLimitUnix}:R> to take an action!!`,
                });
                
                let playerDidAction = false;
                for (let ptimer = 0; ptimer < actionTimeLimit; ptimer++) {
                    await sleep(1000);
                    if (turn != battleState.state) {
                        console.log('Player did the action');
                        await countdownMessage.delete();
                        playerDidAction = true;
                        break;
                    }
                }
                if (playerDidAction) continue;
                await countdownMessage.delete();

                message.channel.send({
                    content: "You couldn't take an action in time!",
                });
            }

            // ===================================================
            //                 UNIVERSAL LOGIC
            // ===================================================
            battleState.changeTurn();
            processRegen(battleSession);

            await battleSession.save();
            await sleep(3000);
        }
    },
    endBattle: async (battleSessionId) => {
        // Fetch the battle session from the database
        const battleSession = await BattleSession.findById(battleSessionId);

        // Perform end battle logic, reward distribution, etc.
        // ...

        // Remove the battle session from the database
        await BattleSession.findByIdAndDelete(battleSessionId);

        return 'Battle ended successfully.';
    }
}

async function actionMaker (message, battleSession, currentPos) {
    let characters = battleSession.characters;
    let currentCharacter = characters[currentPos].character;
    let behaviors = currentCharacter.behaviors;
    
    let action, targetPos;

    let d100 = 1 + Math.floor(Math.random() * 100);
    let cumulativeChance = 0;
    
    // Decide the action by chances
    for (let behavior of behaviors) {
        cumulativeChance += behavior.chance;
        if (d100 <= cumulativeChance) {
            action = behavior;
            break;
        }
    }
    let team = battleSession.characters[currentPos].team;
    // Decide the target if it's single target
    if (action.name == "attack") {
        targetPos = selectSingleTarget(team, characters);
    } else {
        
        if (action.name == "useSkill") {
            if (action.skill.targetType == "single") {
                targetPos = selectSingleTarget(team, characters);
            }
            // Continue here =================================================================================================================
        }
        console.log("NOT YET IMPLEMENTED");
        return;
    }
    
    console.log("CHARACTER: ", currentCharacter.name, ", ACTION: ", action.name);

    const actionFunction = {
        "attack": attack(message, battleSession, currentPos, targetPos),
        "useSkill": useSkill(message, battleSession, currentPos, targetPos),
        "useItem": useItem(message, battleSession, currentPos, targetPos)
    }
}
async function attack (message, battleSession, attackerPos, defenderPos) {
    let attacker = battleSession.characters[attackerPos].character;
    let defender = battleSession.characters[defenderPos].character;
    
    let dice = 1 + Math.floor(Math.random()*0.2); // 1 to 1.2
    let damage = Math.floor(
        attacker.power * dice 
    );
    defender.vital.now -= damage;

    const attackEmbed = new EmbedBuilder()
        .setTitle(`${attacker.name} attacked ${defender.name}!`)
        .setDescription(`It caused ${damage} damage to ${defender.name}!`)
        .setThumbnail(attacker.image);

    message.channel.send({
        content: " ",
        embeds: [ attackEmbed ]
    });

    console.log(attacker.name, "attacks!");
    console.log(damage, "damage to ", defender.name, "!");
}
async function useSkill (message, attacker, defender) {

}
async function useItem (message, attacker, defender) {

}

function processRegen(battleSession) {
    let characters = battleSession.characters;
    for (character of characters) {
        let vital = character.character.vital;
        let mana = character.character.mana;
        let stamina = character.character.stamina;

        vital.now += vital.regen;
        if (vital.now > vital.max) vital.now = vital.max;

        if (mana) {
            mana.now += mana.regen;
            if (mana.now > mana.max) mana.now = mana.max;
        }
        if (stamina) {
            stamina.now += stamina.regen;
            if (stamina.now > stamina.max) stamina.now = stamina.max;
        }
    }
}

function isBattleEnded(characters) {
    let teamVariations = [...new Set(characters.map(obj => obj.team))];
    let teamArray;
    
    for (team of teamVariations) {
        teamArray = characters.filter(obj => obj.team === team);
        
        // If any team has everyone with 0 HP, return true
        if (teamArray.every(element => element.hp <= 0)) return true;
    }
    return false;
}

function selectSingleTarget(team, characters) {
    console.log("TEAM: ", team);
    targetArray = characters.filter(
        (character) => character.team != team
    );
    diceIndex = Math.floor(Math.random() * targetArray.length);
    target = targetArray[diceIndex];
    return target.position;
} 

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
} 