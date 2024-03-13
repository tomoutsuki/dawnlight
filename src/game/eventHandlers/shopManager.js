const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder
} = require('discord.js');

const Player = require.main.require('./models/Player');
const Item = require.main.require('./models/Item');

const coinEmoji = "<:silver_coin:1211457975693082624>";
const bagEmoji = "<:bag:1217287289156403230>";

/* const LoadContent = require('./loadContent');
const contents = LoadContent();
let context; */

const Shop = {
    buyItem: async (interaction, args) => {
        let member = interaction.user;

        let amount = parseInt(args[0]);
        let itemId = args[1];
        let itemPrice = parseInt(args[2]);

        const item = await Item.findOne({itemId: itemId});
        if (!item) {console.log("NO ITEM");return;}

        const player = await Player.findOne({userId: member.id});
        if (!player) {console.log("NO PLAYER");return;}
        
        let cost = itemPrice * amount;
        console.log(cost);

        if (player.coin < cost) {console.log("Not enough coins");return;}

        console.log(player.coin,"-=",cost);

        player.coin -= cost;
        let itemObject = player.items.find(({ item })=> item == item._id.toString());
        if (!itemObject) {
            player.items.push({
                item: item._id,
                amount: amount
            });
        } else {
            itemObject.amount += amount;
        }

        await player.save();
        console.log(player.name, "bought", amount, item.name, "for", cost, "coins");

        let buyEmbed = new EmbedBuilder()
            .setColor(0xaa502f)
            .setTitle(`${player.name} bought ${amount} ${item.name} for ${cost} coins!`)
            .setDescription(`Now you have:`)
            .setThumbnail(player.image)
            .setFields(
                { name: " ", value: `${bagEmoji}${item.name} x ${itemObject.amount}`, inline: true},
                { name: " ", value: `${coinEmoji}${player.coin}`, inline: true}
            );

        await interaction.channel.send({
            content: "ㅤ",
            embeds: [ buyEmbed ]
        });
    },
}

/* function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
} */

module.exports = Shop;