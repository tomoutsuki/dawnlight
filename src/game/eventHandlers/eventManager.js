const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder
} = require('discord.js');
const LoadContent = require('./loadContent');
const contents = LoadContent();
let context;

const Events = {
    debug: () => {
        console.log("Hello!");
    },
    languageSelect: async (member) => {
        
        let languageEmbed = new EmbedBuilder()
        .setTitle('Select your language.')
        .setDescription(' ');
        
        let languageMenu = new StringSelectMenuBuilder()
            .setCustomId('register_language')
            .setPlaceholder('Language')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('English')
                    .setValue('en'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('日本語')
                    .setValue('ja'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Português')
                    .setValue('pt')
            );
        const languageRow = new ActionRowBuilder().addComponents(languageMenu);

        member.send({
            content: " ",
            embeds: [ languageEmbed ],
            components: [ languageRow ]
        });
    },
    factionSelect: async (member) => {
        context = contents.factionSelect.en;

        const welcome_image = "https://i.imgur.com/aIN0IO5.png";
        const welcomeEmbed1 = new EmbedBuilder()
            .setTitle(context.welcome.title)
            .setDescription(context.welcome.description)
            .setImage(welcome_image);
            
        const welcomeEmbed2 = new EmbedBuilder()
            .setTitle(" ")
            .setDescription(context.explaining_world1);

        member.send({
            content: " ",
            embeds: [ welcomeEmbed1, welcomeEmbed2 ]
        });
        
        scientiaEmbed = new EmbedBuilder()
        .setColor(0xfdfad3)
        .setTitle(context.scientia.title)
        .setDescription(context.scientia.description)
        .setThumbnail(context.scientia.flag)
        .addFields (
            {
                name: context.scientia.fields[0].name,
                value: context.scientia.fields[0].value,
                inline: true
            },
            {
                name: context.scientia.fields[1].name,
                value: context.scientia.fields[1].value,
                inline: true
            }
        )

        magiaEmbed = new EmbedBuilder()
            .setColor(0xe7bb00)
            .setTitle(context.magia.title)
            .setDescription(context.magia.description)
            .setThumbnail(context.magia.flag)
            .addFields (
                {
                    name: context.magia.fields[0].name,
                    value: context.magia.fields[0].value,
                    inline: true
                },
                {
                    name: context.magia.fields[1].name,
                    value: context.magia.fields[1].value,
                    inline: true
                }
            )

        hybridaEmbed = new EmbedBuilder()
            .setColor(0x19316c)
            .setTitle(context.hybrida.title)
            .setDescription(context.hybrida.description)
            .setThumbnail(context.hybrida.flag)
            .addFields (
                {
                    name: context.hybrida.fields[0].name,
                    value: context.hybrida.fields[0].value,
                    inline: true
                },
                {
                    name: context.hybrida.fields[1].name,
                    value: context.hybrida.fields[1].value,
                    inline: true
                }
            );
        

        let factionMenu = new StringSelectMenuBuilder()
            .setCustomId('register_faction')
            .setPlaceholder(context.faction_action_row.placeholder)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(context.faction_action_row.option[0].label)
                    .setValue(context.faction_action_row.option[0].value)
                    .setEmoji(context.faction_action_row.option[0].emoji),
                new StringSelectMenuOptionBuilder()
                    .setLabel(context.faction_action_row.option[1].label)
                    .setValue(context.faction_action_row.option[1].value)
                    .setEmoji(context.faction_action_row.option[1].emoji),
                new StringSelectMenuOptionBuilder()
                    .setLabel(context.faction_action_row.option[2].label)
                    .setValue(context.faction_action_row.option[2].value)
                    .setEmoji(context.faction_action_row.option[2].emoji)
            );
        const factionRow = new ActionRowBuilder().addComponents(factionMenu);

        member.send({
            content: " ",
            embeds: [ scientiaEmbed, magiaEmbed, hybridaEmbed ],
            components: [ factionRow ]
        });
    },
    tutorial: async (member) => {
        
    }
}

/* function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
} */

module.exports = Events;