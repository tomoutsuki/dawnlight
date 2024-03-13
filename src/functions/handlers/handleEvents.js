const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.
                readdirSync(`./src/events/${folder}`)
                .filter((file) => file.endsWith(".js"));
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        console.log("Loaded", event.name, "event");
                        //If the event is executed ONCE:
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        //If the event is aways EXECUTING (listening)
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                    
                default:
                    break;
            }
        }
    }
}