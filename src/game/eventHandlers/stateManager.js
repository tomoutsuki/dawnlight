const EventManager = require.main.require('./game/eventHandlers/eventManager');
const BattleManager = require.main.require('./game/eventHandlers/battleManager');

const StateMachine = require('javascript-state-machine');
const BattleSession = require.main.require('./models/BattleSession');
const ObjectId = require('mongoose').Types.ObjectId; 

let member, choice, customId;
let registerProgress = {};

let battleState = {};

module.exports = {
    initRegister: (member) => {
        registerProgress[member.id] = new StateMachine({
            init: 'joining',
            transitions: [
                { name: 'joined', from: 'joining', to: 'setting_language'},
                { name: 'languageSelected', from: 'setting_language', to: 'setting_faction'},
                { name: 'factionSelected', from: 'setting_faction', to: 'tutorial'},
                { name: 'tutorialDone', from: 'tutorial', to: 'done'}
            ],
            methods: {
                onBeforeJoined: async function() {await EventManager.languageSelect(member)},
                onBeforeLanguageSelected: async function() { await EventManager.factionSelect(member) },
                onBeforeFactionSelected: async function() { console.log("Done:") }
            }
        });
        registerProgress[member.id].joined();
    },
    initBattle: async (message, characters) => {
        //characters is an array
        
        characters = characters.sort((a, b) => parseFloat(a.character.speed) - parseFloat(b.character.speed));
        for (let i = 0; i < characters.length; i++) {
            characters[i].position = i;
        }

        console.log(characters);
        let firstCharacterPosition = characters[0].position.toString();
        console.log(firstCharacterPosition);
        console.log(characters);
        let battleSession = await new BattleSession({
            "characters": characters,
            "turn": firstCharacterPosition,
            "startTime": new Date(),
        }).save();
        let sessionId = battleSession._id.toString();

        let characterMethods = {};
        let characterTransition = [{
            name: 'init', from: 'ready', to: firstCharacterPosition
        }];

        for (let i = 0; i < characters.length; i++) {
            let characterOfTurn = characters[i];
            let characterOfNextTurn = characters[(i + 1) % characters.length];

            characterTransition.push({
                name: 'changeTurn',
                from: characterOfTurn.position.toString(),
                to: characterOfNextTurn.position.toString()
            });
            
            characterMethods['onEnter'+ characterOfTurn.position.toString()] = async(lifecycle) => {
                let state = lifecycle.to;
                BattleSession.findOneAndUpdate(
                    { _id: new ObjectId(this.sessionId)},
                    { state: lifecycle.to}
                );
            }
        }
        console.log(characterTransition);
        battleState = new StateMachine({
            init: 'ready',
            transitions: [
                ...characterTransition,
                { name: 'endBattle', from: '*', to: 'end'}
            ],
            data: {
                sessionId: sessionId
            },
            methods: {
                ...characterMethods,
                onEnterEnd: async function () {
                    await BattleManager.endBattle(message, characters)
                }
            }
        });

        await BattleManager.initBattle(message, battleState);
        await BattleManager.loopBattle(message, battleState);
    },
    handleRegistration: async (interaction) => {
        member = interaction.user;
        customId = interaction.customId;
        choice = interaction.values[0];

        switch(customId) {
            case "register_language":
                registerChoice[member.id].language = choice;
                registerProgress[member.id].languageSelected();
                break;
            case "register_faction":
                registerChoice[member.id].faction = choice;
                registerProgress[member.id].factionSelected();
                break;
        }
    }
}