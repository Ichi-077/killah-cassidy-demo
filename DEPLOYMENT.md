# Deployment Guide - Killah Cassidy Demo Site

## Quick Deploy Options

### Option 1: Vercel (Recommended - 5 minutes)
**Best for: Quick client demos, free hosting**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project: No
   - Project name: killah-cassidy-demo
   - Directory: ./ (current directory)

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add environment variable: `MONGODB_URI` with your MongoDB connection string

5. **Your site will be live at:** `https://your-project-name.vercel.app`

### Option 2: Netlify (Frontend) + Railway (Backend)
**Best for: Separate frontend/backend control**

#### Frontend (Netlify):
1. Build the React app:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Drag the `build` folder to [netlify.com](https://netlify.com)
   - Or use Netlify CLI: `netlify deploy --prod --dir=build`

#### Backend (Railway):
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Set environment variable: `MONGODB_URI`
4. Deploy the `server` folder

### Option 3: Heroku
**Best for: Traditional hosting**

1. **Install Heroku CLI**
2. **Create Procfile:**
   ```
   web: node server/index.js
   ```
3. **Deploy:**
   ```bash
   heroku create killah-cassidy-demo
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## Environment Variables

Set these in your hosting platform:

```
MONGODB_URI=mongodb+srv://jtamiso:oNXkNemVDdCH6eCd@cluster0.lgtqpdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
```

## Local Testing Before Deploy

1. **Start backend:**
   ```bash
   cd server
   npm install
   node index.js
   ```

2. **Start frontend (in new terminal):**
   ```bash
   npm install
   npm start
   ```

3. **Test all features:**
   - Home page loads
   - Locations page shows data
   - Merchandise page shows data
   - QR codes work
   - Forms submit properly

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All pages are accessible
- [ ] Database connection works
- [ ] Forms submit successfully
- [ ] QR codes redirect properly
- [ ] Mobile responsive design works
- [ ] Footer displays correctly

## Troubleshooting

### Common Issues:
1. **CORS errors:** Backend needs proper CORS configuration
2. **MongoDB connection:** Check environment variables
3. **Build errors:** Ensure all dependencies are installed
4. **404 errors:** Check routing configuration

### Support:
- Check browser console for errors
- Verify API endpoints are working
- Test database connectivity

## Client Demo Tips

1. **Prepare demo data:** Ensure sample locations and merchandise are seeded
2. **Test QR codes:** Have physical QR codes ready for demo
3. **Mobile testing:** Test on actual mobile devices
4. **Backup plan:** Have screenshots ready in case of technical issues

## Cost Estimates

- **Vercel:** Free tier (perfect for demos)
- **Netlify:** Free tier
- **Railway:** $5/month after free tier
- **Heroku:** $7/month (basic dyno)

## Recommended for Client Demo: Vercel

Vercel is the best choice because:
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Fast global CDN
- ✅ Easy setup
- ✅ Professional URLs
- ✅ Built-in analytics 