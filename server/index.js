const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection - use environment variable for production
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://jtamiso:oNXkNemVDdCH6eCd@cluster0.lgtqpdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const locationsRouter = require('./routes/locations');
const merchandiseRouter = require('./routes/merchandise');

app.use('/api/locations', locationsRouter);
app.use('/api/merchandise', merchandiseRouter);

// Test route
app.get('/api', (req, res) => {
    res.json({
        message: 'API is running and connected to MongoDB!',
        endpoints: {
            locations: '/api/locations',
            merchandise: '/api/merchandise',
            seedLocations: '/api/locations/seed',
            seedMerchandise: '/api/merchandise/seed'
        }
    });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; 