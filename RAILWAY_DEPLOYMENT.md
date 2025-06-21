# 🚂 Railway Backend Deployment Guide

## Prerequisites
- Railway account (free tier available)
- MongoDB Atlas database
- Git repository with your code

## Step-by-Step Deployment

### 1. Prepare Your Repository
Make sure your backend code is in a Git repository:
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push
```

### 2. Deploy to Railway

#### Option A: Deploy from GitHub (Recommended)
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Set the **Root Directory** to `server` (important!)
6. Click "Deploy"

#### Option B: Deploy from Local Files
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Start from Scratch"
4. Choose "Deploy Node.js"
5. Upload your `server` folder
6. Click "Deploy"

### 3. Configure Environment Variables

In your Railway project dashboard:

1. Go to **Variables** tab
2. Add these environment variables:

```
MONGODB_URI=mongodb+srv://jtamiso:oNXkNemVDdCH6eCd@cluster0.lgtqpdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
PORT=5000
```

### 4. Test Your Deployment

Once deployed, test these endpoints:

- **Health Check**: `https://your-railway-app.railway.app/health`
- **API Status**: `https://your-railway-app.railway.app/api`
- **Locations**: `https://your-railway-app.railway.app/api/locations`

### 5. Update Frontend Configuration

Update your `src/config.js` with your Railway URL:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-railway-app.railway.app';
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
- **Error**: "Cannot find module"
- **Solution**: Make sure `package.json` is in the `server` directory

#### 2. MongoDB Connection Issues
- **Error**: "MongoDB connection error"
- **Solution**: Check your `MONGODB_URI` environment variable

#### 3. Port Issues
- **Error**: "Port already in use"
- **Solution**: Railway automatically sets the PORT environment variable

#### 4. CORS Errors
- **Error**: "CORS policy blocked"
- **Solution**: Update CORS origins in `server/index.js`

### Debugging Steps

1. **Check Railway Logs**:
   - Go to your Railway project
   - Click on the deployment
   - View the logs for error messages

2. **Test Health Endpoint**:
   ```bash
   curl https://your-railway-app.railway.app/health
   ```

3. **Check Environment Variables**:
   - Verify all required variables are set
   - Check for typos in variable names

4. **Test Database Connection**:
   - Check if MongoDB Atlas allows connections from Railway IPs
   - Verify your connection string is correct

## Railway Configuration

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### package.json Requirements
```json
{
  "name": "killah-cassidy-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

## Cost Information

- **Free Tier**: $5 credit/month
- **Usage**: ~$1-3/month for small apps
- **Scaling**: Automatic based on usage

## Next Steps

After successful deployment:

1. **Update Frontend**: Point your frontend to the Railway backend
2. **Test All Endpoints**: Verify all API calls work
3. **Monitor Logs**: Keep an eye on Railway logs for issues
4. **Set Up Monitoring**: Consider adding error tracking

## Support

If you encounter issues:
1. Check Railway documentation
2. Review deployment logs
3. Test endpoints individually
4. Contact Railway support if needed 