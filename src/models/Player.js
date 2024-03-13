const mongoose = require('mongoose');

const Player = mongoose.model('Player',
{
    // Player Schema

    // Id to identify discord user ID
    userId:     { type: String, required: true, index: true } ,
    
    image:      String, // Player's Avatar
    joinDate:   Date,   // Join date to Dawnlight Server

    // Name of the Player
    name:   { type: String, required: true, index: true },

    // Selected Language
    language:   { type: String, required: true, index: true },
    
    // Selected Faction
    faction:    { type: String, required: true, index: true },
    coin:       Number, // Amount of Money that Player possesses

    level:      Number, // Level of the Player
    xp:         Number, // XP of the Player

    // Location of the Player
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },

    // Vital of the Player
    vital: {
        max:    Number, // Maximun amount
        now:    Number, // Absolute amount now
        regen:  Number, // Regeneration
    },
    mana: {
        max:    Number, // Maximun amount
        now:    Number, // Absolute amount now
        regen:  Number, // Regeneration
    },
    stamina: {
        max:    Number, // Maximun amount
        now:    Number, // Absolute amount now
        regen:  Number, // Regeneration
    },
    truePower:    Number, // Player's Base Power
    trueDefense:  Number, // Player's Base Defense
    power:        Number, // Player's Power with Weapons
    defense:      Number, // Player's total Defense with Equipments
    speed:        Number, // Player's Speed
    afinity:      Number, // Player's Magic Afinity
    dexterity:    Number, // Player's Weapon Dexterity

    // Player's equipped Armors / Weapons
    equipments: [
        {
            equipment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Equipment'
            },
            amount: { type: Number, required: true },
            equipped: { type: Boolean, required: true }
        }
    ],

    // Player's owned Items
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            amount: { type: Number }
        }
    ],

    // Player's mastered Skills
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    ],

},
'Player');

module.exports = Player;