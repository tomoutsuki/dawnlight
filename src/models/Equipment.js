const mongoose = require('mongoose');


const Equipment = mongoose.model('Equipment',
{
    equipmentId: { type: String, required: true, index: true },
    image:       { type: String },
    name:        { type: String },
    description: { type: String },
    baseValue:   { type: Number },
    effects: [
        {
            name: { type: String, required: true },
            parameter: { type: Number }
        }
    ]
},
'Equipment');

module.exports = Equipment;