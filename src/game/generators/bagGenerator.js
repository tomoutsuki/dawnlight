const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder
} = require('discord.js');

const Player = require.main.require('./models/Player');
const Item = require.main.require('./models/Item');

module.exports = async (message) => {
    const bagEmoji = "<:bag:1217287289156403230>";

    let player = await Player.findOne({userId: message.author.id});
    await player.populate('items.item');

    let totalItemAmount = 0;
    let fields = [];
    for (itemObject of player.items) {
        fields.push({
            name: ` `,
            value: `**・${itemObject.item.name}** × ${itemObject.amount}`
        });
        totalItemAmount += itemObject.amount;
    }
    const bagEmbed = new EmbedBuilder()
        .setColor(0xaa502f)
        .setTitle(`${bagEmoji} ${player.name}'s Bag`)
        .setDescription(`Total Items: ${totalItemAmount} \n ㅤ`)
        .setThumbnail(player.image)
        .setFields(fields);

    await message.channel.send({
        content: "ㅤ",
        embeds: [ bagEmbed ]
    });
}