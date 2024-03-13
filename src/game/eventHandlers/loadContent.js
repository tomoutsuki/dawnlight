const fs = require('fs');

module.exports = () => {
    let contents = {};
    let raw_content;
    const contentsFolders = fs.readdirSync('./src/contents');
    for (const folder of contentsFolders) {
        const contentsFiles = fs
            .readdirSync(`./src/contents/${folder}`)
            .filter((file) => file.endsWith(".json"));
            for (const file of contentsFiles) {
                raw_content = fs.readFileSync(`./src/contents/${folder}/${file}`);
                contents[file.replace('.json','')] = {};
                contents[file.replace('.json','')][folder] = JSON.parse(raw_content);
            }
    }
    return contents;
}