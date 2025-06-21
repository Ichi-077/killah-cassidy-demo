const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for production
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-netlify-app.netlify.app', 'https://your-vercel-app.vercel.app']
        : 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection with better error handling
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://jtamiso:oNXkNemVDdCH6eCd@cluster0.lgtqpdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database:', mongoose.connection.name);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('🔧 Please check your MONGODB_URI environment variable');
        process.exit(1);
    });

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// API test route
app.get('/api', (req, res) => {
    res.json({
        message: '🚀 Killah Cassidy API is running!',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            locations: '/api/locations',
            merchandise: '/api/merchandise',
            seedLocations: '/api/locations/seed',
            seedMerchandise: '/api/merchandise/seed'
        }
    });
});

// Routes
const locationsRouter = require('./routes/locations');
const merchandiseRouter = require('./routes/merchandise');

app.use('/api/locations', locationsRouter);
app.use('/api/merchandise', merchandiseRouter);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('📊 MongoDB connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('📊 MongoDB connection closed');
        process.exit(0);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Database: ${mongoose.connection.readyState === 1 ? 'connected' : 'connecting...'}`);
});

module.exports = app; 