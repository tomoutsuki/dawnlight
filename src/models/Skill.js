const mongoose = require('mongoose');


const Skill = mongoose.model('Skill',
{
    skillId: { type: String, required: true, index: true },
    name: { type: String},
    description: { type: String},
    chance: { type: Number },
    targetType: { type: String },
    cost: {
        mana:    { type: Number, required: true, default: 0 },
        stamina: { type: Number, required: true, default: 0 }
    },
    effects: [
        {
            name: { type: String, required: true},
            parameter: { type: Number }
        }
    ]
},
'Skill');

module.exports = Skill;