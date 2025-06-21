const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
const mongoURI = 'mongodb+srv://jtamiso:oNXkNemVDdCH6eCd@cluster0.lgtqpdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Import models
const Location = require('./models/Location');
const Merchandise = require('./models/Merchandise');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Location.deleteMany({});
        await Merchandise.deleteMany({});
        console.log('Cleared existing data');

        // Read sample data
        const locationsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'sample-locations.json'), 'utf8')
        );
        const merchandiseData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'sample-merchandise.json'), 'utf8')
        );

        // Insert sample data
        const locations = await Location.insertMany(locationsData);
        const merchandise = await Merchandise.insertMany(merchandiseData);

        console.log(`✅ Seeded ${locations.length} locations`);
        console.log(`✅ Seeded ${merchandise.length} merchandise items`);
        console.log('Database seeding completed successfully!');

        // Close connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase(); 