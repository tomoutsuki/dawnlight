const mongoose = require('mongoose');


const BattleSession = mongoose.model('BattleSession',
{
    turn:        { type: Number, required: true},
    turnCounter: { type: Number, default: 1 },
    startTime:   { type: Date },
    endTime:     { type: Date },
    characters: [
        {
            position: { type: Number, required: true},
            team: { type: Number, required: true },
            type: { type: String, enum: ['Player', 'Monster'], required: true },
            character: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'characters.type'
            }
        }
    ],
},
'BattleSession');

module.exports = BattleSession;