const mongoose = require('mongoose');


const Material = mongoose.model('Material',
{
    materialId: { type: String, required: true, index: true },
    image: { type: String },
    name: { type: String },
    description: { type: String },
    baseValue: { type: Number },
},
'Material');

module.exports = Material;