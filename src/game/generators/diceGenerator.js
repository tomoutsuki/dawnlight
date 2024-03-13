const { EmbedBuilder } = require('discord.js');

module.exports = async (message, diceSides) => {
    let diceResult = Math.floor(Math.random() * diceSides) + 1;
    // It only supports 10 now
    let diceImage = [
        " ",
        "https://i.imgur.com/DHe4Gi0.png",
        "https://i.imgur.com/P5SdK5R.png",
        "https://i.imgur.com/QGDkLqu.png",
        "https://i.imgur.com/D2uppCs.png",
        "https://i.imgur.com/SLkiWBd.png",
        "https://i.imgur.com/iVlxKil.png",
        "https://i.imgur.com/sNdkROl.png",
        "https://i.imgur.com/XfrIoq6.png",
        "https://i.imgur.com/ClCNrJM.png",
        "https://i.imgur.com/1t7pX6h.png"
    ];
    const diceEmbed = new EmbedBuilder()
        .setTitle( `You threw a d${diceSides}, and the result was ${diceResult}!`)
        .setImage(diceImage[diceResult])

    await message.channel.send({
        content: " ",
        embeds: [ diceEmbed ]
    });
}