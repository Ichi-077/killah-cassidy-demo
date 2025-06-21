const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Clothing', 'Accessories', 'Consumables', 'CBD Products', 'Growing']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: String,
    inStock: {
        type: Boolean,
        default: true
    },
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Merchandise', merchandiseSchema); 