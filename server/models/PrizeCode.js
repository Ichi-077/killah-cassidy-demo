const mongoose = require('mongoose');

const prizeCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true,
        ref: 'Location'
    },
    locationName: {
        type: String,
        required: true
    },
    isRedeemed: {
        type: Boolean,
        default: false
    },
    redeemedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PrizeCode', prizeCodeSchema); 