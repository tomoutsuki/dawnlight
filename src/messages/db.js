let LoadMonsters = require.main.require('./game/eventHandlers/loadMonsters');

const fs = require('fs');

const  BattleSession = require.main.require('./models/BattleSession');
const  Location = require.main.require('./models/Location');
const  Equipment = require.main.require('./models/Equipment');
const  Item = require.main.require('./models/Item');
const  Monster = require.main.require('./models/Monster');
const  Material = require.main.require('./models/Material');
const  Player = require.main.require('./models/Player');
const  Skill = require.main.require('./models/Skill');

module.exports = async (message, args) => {
    let option = args[0];
    let target = args[1];
    let rawJson = fs.readFileSync(`./src/tmp/data.json`);
    let jsonData = JSON.parse(rawJson);
    if (!option) return;

    const targets = {
        "BattleSession":  () => { return BattleSession },
        "Location":       () => { return Location },
        "Equipment":      () => { return Equipment },
        "Item":           () => { return Item },
        "Material":       () => { return Material},
        "Monster":        () => { return Monster },
        "Player":         () => { return Player },
        "Skill":          () => { return Skill }
    }

    let targetModel = targets[target]();
    if (!targetModel) return;

    const options = {
        "upload": uploadData(targetModel, jsonData),
        "updateParameter": updateParameterName(target, args[2], args[3])
    }

    options[option];
    /* let monsters = LoadMonsters();
    for (monster in monsters) {
        if (monsters[monster]) {
            console.log(monsters[monster]);
            await Monster.create(monsters[monster]);
        }
    } */
}
async function uploadData(model, jsonData) {
    for (data in jsonData) {
        if (jsonData[data]) {
            console.log(jsonData[data]);
            await model.create(jsonData[data]);
        }
    }
    console.log("success!")
}
async function updateParameterName (modelName, oldParameter, newParameter) {
    let target;
    const options = {
        "BattleSession": target = BattleSession,
        "Location": target = Location,
        "Equipment": target = Equipment,
        "Item": target = Item,
        "Monster": target = Monster,
        "Player": target = Player,
        "Skill": target = Skill
    }
    options[modelName];
    let operation = { $rename: {oldParameter}}
}