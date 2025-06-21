const express = require('express');
const router = express.Router();
const Merchandise = require('../models/Merchandise');
const fs = require('fs');
const path = require('path');

// Get all merchandise
router.get('/', async (req, res) => {
    try {
        const merchandise = await Merchandise.find().sort({ createdAt: -1 });
        res.json(merchandise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get merchandise by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Merchandise.findOne({ id: req.params.id });
        if (!item) {
            return res.status(404).json({ message: 'Merchandise not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new merchandise
router.post('/', async (req, res) => {
    const merchandise = new Merchandise(req.body);
    try {
        const newItem = await merchandise.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update merchandise
router.put('/:id', async (req, res) => {
    try {
        const item = await Merchandise.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!item) {
            return res.status(404).json({ message: 'Merchandise not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete merchandise
router.delete('/:id', async (req, res) => {
    try {
        const item = await Merchandise.findOneAndDelete({ id: req.params.id });
        if (!item) {
            return res.status(404).json({ message: 'Merchandise not found' });
        }
        res.json({ message: 'Merchandise deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get merchandise by category
router.get('/category/:category', async (req, res) => {
    try {
        const items = await Merchandise.find({ category: req.params.category });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get in-stock merchandise
router.get('/stock/available', async (req, res) => {
    try {
        const items = await Merchandise.find({ inStock: true });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed sample data
router.post('/seed', async (req, res) => {
    try {
        // Clear existing data
        await Merchandise.deleteMany({});

        // Read sample data
        const sampleData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../sample-merchandise.json'), 'utf8')
        );

        // Insert sample data
        const items = await Merchandise.insertMany(sampleData);
        res.json({ message: `${items.length} merchandise items seeded successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 