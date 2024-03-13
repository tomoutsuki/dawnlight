const { EmbedBuilder } = require('discord.js');

module.exports = async (message, barmin, barmax) => {

    const member = message.author;
    const globalName = member.globalName;
    
    let user_id = member.id;
    let avatar_id = member.avatar;
    let avatar = `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png`;
    

    const barEmbed = new EmbedBuilder()
        .setTitle(globalName)
        .setDescription("a"/* barRender(8, hp, maxhp) */)
        .setThumbnail(avatar);

    
    message.channel.send({
        content: barRender(8, barmin, barmax),
        embeds: [ barEmbed ]
    });

}

// max: 100, now: 10, proportion: 10, length: 8, weight: 12.5
function barRender(length, now, max) {
    const barEmoji = {
        red: {
            single:        "<:red_single:1211511704983183410>",
            begin:         "<:red_begin:1211519900590415952>",
            middle:        "<:red_middle:1211519255020048394>",
            middleEnd:     "<:red_middleend:1211519257532436630>",
            middleNearEnd: "<:red_middleend:1211536788917723137>"
        },
        green: {
            begin:          "<:green_begin:1211511710754676746>",
            middle:         "<:green_middle:1211511712197509190>",
            middleEnd:      "<:green_middleend:1211511713783095358>",
            middleNearEnd:  "<:green_middleend:1211536790796771438>",
            nearEnd:        "<:green_nearend:1211513563844321330>",
            end:            "<:green_end:1211511715146104882>"
        },
        gray: {
            begin:       "<:gray_begin:1211541552611196949>",
            middle:      "<:gray_middle:1211511717691920396>",
            end:         "<:gray_end:1211511719969423451>"
        }
    }

    let bar = ""; //The bar to be rendered
    // Calculate Proportion (%) - 0 to 100
    let proportion = Math.ceil( (now / max) * 100 );

    // Proportion which each Emoji contains
    let weightPerEmoji = 100 / length;

    //Bar's default color
    let barColor = "green";

    // Render Red Bar if less than proportion < 25%
    if (proportion < 25) { barColor = "red" }

    console.log("proportion: "+ proportion+", weight: "+weightPerEmoji);
    // If the bar is all gray (0%)
    if (proportion == 0) {
        bar+=barEmoji["gray"].begin;
        length--;
        for (length; length > 1; length--) {
            bar+=barEmoji["gray"].middle;
        }
        bar+=barEmoji["gray"].end;
        return bar;
    }

    // If the bar has only one emoji filled
    if (proportion < weightPerEmoji) {
        bar+=barEmoji["red"].single;
        length--;
        for (length; length > 1; length--) {
            bar+=barEmoji["gray"].middle;
        }
        bar+=barEmoji["gray"].end;
        return bar;
    }

    // If the bar is all green (100%)
    if (proportion == 100) {
        bar+=barEmoji["green"].begin;
        length--;
        for (length; length > 1; length--) {
            bar+=barEmoji["green"].middle;
        }
        bar+=barEmoji["green"].end;
        return bar;
    }

    // proportion: 50, length: 8, weight: 12.5
    let filledEmojiAmount = Math.round(proportion / weightPerEmoji);
    // the value of gray bar emojis
    let grayEmojiAmount = length - filledEmojiAmount;

    // If the reminder is bigger than 50% of weight, use Near End Emoji
    let lastEmojiRemainder = proportion % weightPerEmoji;
    
    // Generate Begin Emoji
    bar+=barEmoji[barColor].begin;
    length--;

    // Generate Middle Emoji
    for (length; length > grayEmojiAmount + 1; length--) {
        bar += barEmoji[barColor].middle;
    }
    length--;

    if (length == 0) {
        bar += barEmoji[barColor].nearEnd;
        return bar;
    }
    // Generate MiddleEnd or NearEnd Emoji
    if (lastEmojiRemainder > weightPerEmoji * 0.5) {
        bar += barEmoji[barColor].middleNearEnd;
    } else {
        bar += barEmoji[barColor].middleEnd;
    }
    length--;
    
    // Generate Gray Middle and End Emoji
    for (length; length > 0; length--) {
        bar += barEmoji["gray"].middle;
    }
    bar += barEmoji["gray"].end;
    return bar;
}