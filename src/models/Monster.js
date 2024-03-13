const mongoose = require('mongoose');

const Monster = mongoose.model('Monster', {
    image: { type: String },
    monsterId: { type: String, required: true, index: true},
    name: { type: String, required: true},
    vital: {
        max: { type: Number, required: true },
        now: { type: Number, required: true },
        regen: { type: Number, default: 0 },
    },
    power:   { type: Number, required: true },
    defense: { type: Number, required: true },
    speed:   { type: Number, required: true },
    behaviors: [
        {
            name: { type: String, required: true },
            chance: { type: Number, required: true },
            skill: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Skill',
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }
        }
    ],
    elements: [
        { name: { type: String}, parameter: {type: Number} }
    ],
    drops: [
        {
            drop: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'drops.type'
            },
            type: {
                type: String,
                enum: ['Item', 'Equipment', 'Material']
            },
            chance: { type: Number }
        }
    ],
}, 'Monster');

module.exports = Monster;