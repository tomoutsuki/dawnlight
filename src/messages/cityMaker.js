const {
    ActionRowBuilder,
    //StringSelectMenuBuilder,
    //StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');
const LoadContent = require.main.require('./game/eventHandlers/loadContent');
const contents = LoadContent();

module.exports = async (message, city) => {
    let context = contents.cityMaker.en[city];

    const cityMainEmbed = new EmbedBuilder()
        .setColor(parseInt(context.color, 16))
        .setTitle(context.title)
        .setDescription(context.description + "\n\n")
        .setThumbnail(context.thumbnail)
        .addFields (
            {
                name: context.fields[0].name,
                value: context.fields[0].value,
                inline: true
            },
            {
                name: context.fields[1].name,
                value: context.fields[1].value,
                inline: true
            }
        );
    
    const shopEmbed = new EmbedBuilder()
        .setColor(parseInt(context.color, 16))
        .setTitle(context.shop.emoji + context.shop.title)
        .setDescription(context.shop.description);

    /* const shopButton = new ButtonBuilder()
        .setCustomId(city + '_shop')
        .setLabel('Visit')
        .setStyle(ButtonStyle.Success)
        .setEmoji("✅");
                
    const shopRow = new ActionRowBuilder().
        addComponents(shopButton); */

    message.channel.send({
        content: " ",
        embeds: [ cityMainEmbed, shopEmbed ],
        components: []
    });
}