# 🌿 Where in the World is Killah Cassidy?

A full-stack web application for tracking cannabis dispensaries and merchandise across the globe. Built with React frontend and Node.js backend with MongoDB integration.

## 🚀 Features

- **📍 Dispensary Tracking**: Browse and discover cannabis dispensaries worldwide
- **🛍️ Merchandise Catalog**: Explore exclusive Killah Cassidy merchandise
- **📱 QR Code System**: Scan QR codes at locations for prize codes and reviews
- **🌟 Community Reviews**: Rate and review dispensaries
- **📱 Mobile Responsive**: Beautiful design that works on all devices
- **🎨 Gothic Theme**: Unique dark aesthetic with purple accents
- **🔐 User Authentication**: Login/signup system for personalized experience

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **CSS3** - Custom styling with gothic theme
- **Font Awesome** - Icons

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
canna-prize-tracker/
├── public/                 # Static files
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── config.js          # API configuration
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── build/                  # Production build
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd canna-prize-tracker
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd server
   node index.js
   ```

6. **Start the frontend (in a new terminal)**
   ```bash
   npm start
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify + Railway
1. **Frontend**: Deploy to Netlify
2. **Backend**: Deploy to Railway
3. **Update**: `netlify.toml` with your Railway backend URL

### Environment Variables
Set these in your hosting platform:
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: `production`

## 📱 API Endpoints

### Locations
- `GET /api/locations` - Get all locations
- `GET /api/locations/:id` - Get specific location
- `POST /api/locations/submit` - Submit new location
- `POST /api/locations/:id/prize-code` - Generate prize code

### Merchandise
- `GET /api/merchandise` - Get all merchandise
- `POST /api/merchandise` - Add new merchandise

### Reviews
- `POST /api/locations/reviews` - Submit review

## 🎨 Design Features

- **Gothic Theme**: Dark background with purple accents
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Hamburger Menu**: Mobile-friendly navigation
- **Black Footer**: Professional footer with contact information
- **Custom Fonts**: UnifrakturMaguntia for gothic titles

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- ESLint configuration included
- Prettier formatting
- Consistent naming conventions

## 📊 Database Schema

### Location Model
```javascript
{
  name: String,
  type: String,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  phone: String,
  website: String,
  hours: Object,
  rating: Number,
  reviews: Number,
  tags: [String],
  image: String
}
```

### Merchandise Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  inStock: Boolean
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Killah Cassidy** - The mysterious figure behind the brand
- **Development Team** - Building the digital experience

## 🆘 Support

For support, email info@killahcassidy.com or create an issue in this repository.

---

**Where in the World is Killah Cassidy?** 🌍✨
