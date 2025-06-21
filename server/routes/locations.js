const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Review = require('../models/Review');
const PrizeCode = require('../models/PrizeCode');
const fs = require('fs');
const path = require('path');

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get location by ID
router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findOne({ id: req.params.id });
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new location
router.post('/', async (req, res) => {
    const location = new Location(req.body);
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update location
router.put('/:id', async (req, res) => {
    try {
        const location = await Location.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete location
router.delete('/:id', async (req, res) => {
    try {
        const location = await Location.findOneAndDelete({ id: req.params.id });
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get reviews for a location
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ locationId: req.params.id })
            .sort({ timestamp: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a review for a location
router.post('/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        const newReview = await review.save();

        // Update location rating and review count
        const location = await Location.findOne({ id: req.body.locationId });
        if (location) {
            const allReviews = await Review.find({ locationId: req.body.locationId });
            const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

            await Location.findOneAndUpdate(
                { id: req.body.locationId },
                {
                    rating: Math.round(avgRating * 10) / 10,
                    reviews: allReviews.length
                }
            );
        }

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Generate prize code for a location
router.post('/:id/prize-code', async (req, res) => {
    try {
        const location = await Location.findOne({ id: req.params.id });
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Generate unique code
        const code = 'KC' + Math.random().toString(36).substr(2, 8).toUpperCase();

        const prizeCode = new PrizeCode({
            code: code,
            userId: req.body.userId,
            userName: req.body.userName,
            locationId: req.params.id,
            locationName: location.name
        });

        const newPrizeCode = await prizeCode.save();
        res.status(201).json(newPrizeCode);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Redeem prize code
router.put('/prize-code/:code/redeem', async (req, res) => {
    try {
        const prizeCode = await PrizeCode.findOne({ code: req.params.code });
        if (!prizeCode) {
            return res.status(404).json({ message: 'Prize code not found' });
        }

        if (prizeCode.isRedeemed) {
            return res.status(400).json({ message: 'Prize code already redeemed' });
        }

        prizeCode.isRedeemed = true;
        prizeCode.redeemedAt = new Date();
        await prizeCode.save();

        res.json({ message: 'Prize code redeemed successfully', prizeCode });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit new location for consideration
router.post('/submit', async (req, res) => {
    try {
        // Generate a unique ID for the location
        const locationId = 'loc' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

        const locationData = {
            ...req.body,
            id: locationId,
            status: 'pending', // For admin approval
            createdAt: new Date()
        };

        const location = new Location(locationData);
        const newLocation = await location.save();

        res.status(201).json({
            message: 'Location submitted successfully for review',
            location: newLocation
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get pending locations (for admin)
router.get('/admin/pending', async (req, res) => {
    try {
        const pendingLocations = await Location.find({ status: 'pending' })
            .sort({ createdAt: -1 });
        res.json(pendingLocations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve/reject location (for admin)
router.put('/admin/:id/status', async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const location = await Location.findOneAndUpdate(
            { id: req.params.id },
            { status: status },
            { new: true }
        );

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.json({
            message: `Location ${status} successfully`,
            location: location
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Seed sample data
router.post('/seed', async (req, res) => {
    try {
        // Clear existing data
        await Location.deleteMany({});

        // Read sample data
        const sampleData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../sample-locations.json'), 'utf8')
        );

        // Insert sample data
        const locations = await Location.insertMany(sampleData);
        res.json({ message: `${locations.length} locations seeded successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 