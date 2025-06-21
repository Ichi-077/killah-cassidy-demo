const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    locationId: {
        type: String,
        required: true,
        ref: 'Location'
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema); 