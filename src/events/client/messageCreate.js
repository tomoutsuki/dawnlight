const fs = require('fs');
const Player = require('../../models/Player');
const Monster = require.main.require('./models/Monster');
const BattleSession = require('../../models/BattleSession');

const State = require.main.require('./game/eventHandlers/stateManager');
const Dice = require.main.require('./game/generators/diceGenerator');
const BattleManager = require.main.require('./game/eventHandlers/battleManager');

const modules = {};

const messageFiles = fs.
    readdirSync(`./src/messages`)
    .filter((file) => file.endsWith(".js"));
for (const file of messageFiles) {
    const moduleName = file.replace('.js','');
    modules[moduleName] = require(`../../messages/${file}`);
}


module.exports = {
    name: "messageCreate",
    async execute(message, client) {

        if (message.author.bot) return;

        if (message.content.startsWith('$')) {
            BattleManager.handleBattleCommands(message)
        }

        if (!message.content.startsWith('!')) return;

        // !<command> <args[0]> <args[1]> ...
        const [command, ...args] = message.content.substring(1).split(' ');
        if (command == "db") await modules.db(message, args);
        console.log(message.author.id);
        const player = await Player.findOne({userId: message.author.id});
        console.log(player);
        if (!player) return;
        console.log(player.name, "used the command", command, ".");

        switch (command.toUpperCase()) {
            case "TEST":
                modules.test();
        }
        
        if (message.author.id != "824330499539075124") return;;
        switch (command.toUpperCase()) {
            case "DB":
                await modules.db(message, args);
                break;
            case "GENERATE":
                console.log("Generating message");
                await modules.generate(message, args);
                break;
                
            case "EMOJI":
                message.reply('sup');
                await modules.emojiTest(message, args);
                break;

            case "BAR":
                await modules.statusBar(message, args);
                break;

            case "CITY":
                await modules.cityMaker(message, args[0]);
                break;

            case "DICE":
                await Dice(message, args[0]);
                break;
            case "BATTLE":
                let primaryPlayerId = player._id.toString();
                let primaryPlayer = {
                    team: 1,
                    type: "Player",
                    character: primaryPlayerId
                }
                console.log("primaryPlayer:", primaryPlayer);
                let monsters = [];
                for (arg of args) {
                    let monster = await Monster.findOne({monsterId: arg});
                    if (monster) {
                        monsters.push(
                            {
                                team: 2,
                                type: "Monster",
                                character: monster._id.toString()
                            }
                        );
                    }
                }
                let characters = [
                    primaryPlayer,
                    ...monsters
                ];

                console.log("Characters:", characters);
                await State.initBattle(message, characters);
        }
    }
}