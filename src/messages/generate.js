const Event = require.main.require('./game/eventHandlers/eventManager');
const Status = require.main.require('./game/generators/statusGenerator');
const Bag = require.main.require('./game/generators/bagGenerator');
const Emoji = require('./emojiTest');
const CityMaker = require('./cityMaker');
const ShopMaker = require('./shopMaker');
const StatusBar = require('./statusBar');


module.exports = async (message, args) => {
    let member = message.author;
    if (!args[0]) return;
    
    switch (args[0].toUpperCase()) {
        case "DEBUG":
            Event.newPlayerSetting(member);
            break;
        case "CITY":
            const city = args[1];
            CityMaker(message, city);
            break;
        case "SHOP":
            const shop = args[1];
            ShopMaker(message, shop);
            break;
        case "BAR":
            const barmin = args[1];
            const barmax = args[2];
            StatusBar(message, barmin, barmax);
            break;
        case "STATUS":
            Status(message);
            break;
        case "EMOJI":
            Emoji(message, args[1]);
            break;
        case "BAG":
            Bag(message);
            break;
    }
}