const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Dispensary', 'Head Shop']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    phone: String,
    email: String,
    website: String,
    hours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: Number,
    image: String,
    description: String,
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema); 