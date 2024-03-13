const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');
const LoadContent = require.main.require('./game/eventHandlers/loadContent');
const contents = LoadContent();

// Remove after db implementation
const Item = require.main.require('./models/Item');
const coin_emoji = "<:silver_coin:1211457975693082624> ";

module.exports = async (message, shop) => {
    let context = contents.shopMaker.en[shop];

    await message.channel.send({
        files: [{ attachment: context.sign, name: "welcome_sign.png"}]
    });

    const shopWelcomeEmbed = new EmbedBuilder()
        .setColor(0xaa502f)
        .setTitle(context.title)
        .setDescription(context.description + "\n\n")
        .setImage(context.image);

    await message.channel.send({
        content: " ",
        embeds: [shopWelcomeEmbed]
    });

    await sleep(1000);
    let itemShopEmbeds = [];
    let itemShopRows = [];
    let buyOneButton, buyTenButton;
    let itemInfo;
    for (const item of context.items) {
        itemInfo = await Item.findOne({ itemId : item.id});
        itemShopEmbeds.push(
            new EmbedBuilder()
            .setColor(0xaa502f)
            .setTitle(itemInfo.name)
            .setDescription(itemInfo.description)
            .setThumbnail(itemInfo.image)
            .addFields(
                { name: ' ', value: coin_emoji + item.price}
            )
        );

        buyOneButton = new ButtonBuilder()
            .setCustomId(`buy@1@${item.id}@${item.price}`)
            .setLabel('Buy 1')
            .setStyle(ButtonStyle.Secondary);
        
        buyTenButton = new ButtonBuilder()
            .setCustomId(`buy@10@${item.id}@${item.price}`)
            .setLabel('Buy 10')
            .setStyle(ButtonStyle.Secondary);

        itemShopRows.push(
            new ActionRowBuilder()
            .addComponents(buyOneButton, buyTenButton)
        );
    }
    
    for (let i = 0; i < itemShopEmbeds.length; i++) {

        await message.channel.send({
            content: "ㅤ",
            embeds: [ itemShopEmbeds[i] ],
            components: [ itemShopRows[i] ]
        });
        await sleep(500);
    };
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
