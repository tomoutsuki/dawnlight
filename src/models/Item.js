const mongoose = require('mongoose');


const Item = mongoose.model('Item',
{
    itemId: { type: String, required: true, index: true },
    image: { type: String },
    name: { type: String },
    description: { type: String },
    baseValue: { type: Number },
    effects: [
        {
            name: { type: String, required: true},
            parameter: { type: Number }
        }
    ]
},
'Item');

module.exports = Item;