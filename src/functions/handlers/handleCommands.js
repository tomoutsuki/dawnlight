const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {

        const commandFolders = fs.readdirSync('./src/commands')
        const {commands, commandArray} = client;
        
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command ${command.data.name} has been passed.`);
                
            }
        }
        const clientId = '1117488766236495922';
        const guildId = '1117666274328203327';
        const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
        try {
            console.log("Started refreshing application (/) commands.");
            
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: commandArray,
            });

            console.log('Successfully reloaded application (/) commands.');

        } catch (error) {
            console.error(error);
        }
    }
}