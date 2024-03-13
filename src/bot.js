require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');

const {Client, Collection, GatewayIntentBits, Partials} = require('discord.js');
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
]});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for (const file of functionFiles)
            require(`./functions/${folder}/${file}`)(client);
            
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch((error) => console.error(error));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.handleEvents();
client.handleCommands();

client.login(process.env.BOT_TOKEN);