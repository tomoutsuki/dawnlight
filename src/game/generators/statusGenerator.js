const { EmbedBuilder } = require('discord.js');
const Player = require.main.require('./models/Player.js');
const BarGenerator = require('./barGenerator');

module.exports = async (message) => {
    let member = message.author;
    let globalName = member.globalName;

    let userId = member.id;
    let avatarId = member.avatar;
    let avatar = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
    console.log(avatar);
    let player;
    try {
        player = await Player.findOne({userId: userId}, );
    } catch (error) {
        console.log("Something went wrong :" + error);
        return;
    }

    let vitalBar =   await BarGenerator(6, player.vital.now, player.vital.max);
    let manaBar =    await BarGenerator(6, player.mana.now, player.mana.max);
    let staminaBar = await BarGenerator(6, player.stamina.now, player.stamina.max);

    let vitalDisplay = `${player.vital.now}/${player.vital.max}`;
    let manaDisplay = `${player.mana.now}/${player.mana.max}`;
    let staminaDisplay = `${player.stamina.now}/${player.stamina.max}`;

    const vitalEmoji = "<:vital:1211790288767422515>";
    const manaEmoji = "<:mana:1211791699341484105>";
    const staminaEmoji = "<:stamina:1211791702474620959>";

    const helmetEmoji = "<:helmet:1211797800640323604>";
    const chestplateEmoji = "<:chestplate:1211797798794829834>";
    const bootsEmoji = "<:boots:1211797796806463548>";
    const ringEmoji = " <:gem_ring:1211798855834800208>";

    const coinEmoji = "<:silver_coin:1211457975693082624>";
    const poisonEmoji = "<:poison:1211840755463626812>";
    const speedEmoji = "<:speed:1211840757284208670>";

    let playerParameterField =
        vitalEmoji + "`VITAL:" + vitalDisplay.padStart(9) + "`ㅤ" + vitalBar + "\n" +
        manaEmoji + "`MANA: " + manaDisplay.padStart(9) + "`ㅤ" + manaBar + "\n" +
        staminaEmoji + "`STM:  " + staminaDisplay.padStart(9) + "`ㅤ" + staminaBar + "\n";

    let otherParameterField =
        coinEmoji + "`COIN:" + player.coin + "`";


    let equipmentField = [{
            name: helmetEmoji + " [RARE] Plate Armour Helmet   ",
            value: "`Defense [+7]`\n`Agility [-2]`",
            inline: false
        },
        {
            name: chestplateEmoji + " [COMMON] Lether Jacket",
            value: "`Defense [+12]`\n`Agility [+1]`",
            inline: false
        },
        {
            name: bootsEmoji + " [COMMON] Traveler's Boot",
            value: "`Defense [+6]`\n`Agility [+3]`",
            inline: false
        },
        {
            name: ringEmoji + " [EPIC] Hunter's Ring",
            value: "`Defense [+2]`\n`Agility [+5]`",
            inline: false
        },
    ];

    let effectString = poisonEmoji + "`Poison: 5` " + speedEmoji + "`SpeedBoost: 2`";
    const barEmbed = new EmbedBuilder()
        .setAuthor({ name: "Traveler - Lv."+player.level})
        .setTitle(globalName)
        .setDescription(effectString)
        .setThumbnail(avatar)
        .addFields({name: " ", value: playerParameterField, inline: true});
        //.addFields(equipmentField);
    

    await message.channel.send({
        content: " ",
        embeds: [ barEmbed ]
    });
}