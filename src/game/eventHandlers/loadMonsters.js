const fs = require('fs');

module.exports = () => {
    raw_items = fs.readFileSync(`./src/tmp/monster.json`);
    return JSON.parse(raw_items);
}