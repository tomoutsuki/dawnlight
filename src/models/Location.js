const mongoose = require('mongoose');

const Location = mongoose.model('Location', {
    locationId: { type: String, required: true, index: true },
    name: { type: String },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    shop: {
        shopId: { type: String, required: true },
        multiplier: { type: Number },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    refPath: 'shop.products.type'
                },
                type: {
                    type: String,
                    enum: ['Item', 'Equipment', 'Material']
                }
            }
        ]
    }
}, 'Location');

module.exports = Location;