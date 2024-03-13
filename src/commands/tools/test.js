const { SlashCommandBuilder } = require('discord.js');
const Event = require.main.require('./game/eventHandlers/eventManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('デバッグ用コマンド'),
    async execute(interaction, client) {
        let member = interaction.user;
        Event.newPlayerSetting(member);
    }
}