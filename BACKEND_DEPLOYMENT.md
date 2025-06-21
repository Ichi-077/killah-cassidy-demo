# 🔧 Backend Deployment Options

Since we're deploying the frontend to Vercel, we need to deploy the backend separately.

## Option 1: Railway (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. **Create new project**
3. **Deploy from GitHub** (select your repo, set root directory to `server`)
4. **Set environment variables:**
   - `MONGODB_URI` = your MongoDB connection string
   - `NODE_ENV` = production
5. **Get your Railway URL** (e.g., `https://your-app.railway.app`)

## Option 2: Render

1. **Go to [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect your GitHub repo**
4. **Set root directory to `server`**
5. **Set environment variables**
6. **Deploy**

## Option 3: Heroku

1. **Install Heroku CLI**
2. **Create new app**
3. **Deploy the `server` folder**
4. **Set environment variables**

## Update Frontend Configuration

Once you have your backend URL, update `src/config.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.com';
```

Then redeploy your frontend to Vercel. 