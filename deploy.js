const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Please run this script from the project root.');
    process.exit(1);
}

try {
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Install server dependencies
    console.log('📦 Installing server dependencies...');
    execSync('cd server && npm install', { stdio: 'inherit' });

    // Build the React app
    console.log('🔨 Building React app...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('\n✅ Build completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Install Vercel CLI: npm install -g vercel');
    console.log('2. Deploy: vercel');
    console.log('3. Follow the prompts');
    console.log('4. Set MONGODB_URI environment variable in Vercel dashboard');
    console.log('\n🌐 Your site will be live at: https://your-project-name.vercel.app');

} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
} 