# Deploying Your Bunny Breeding Simulator to Vercel

Follow these steps to get your website deployed on Vercel:

## Prerequisites

1. A Vercel account (free) - Sign up at [vercel.com](https://vercel.com) if you don't have one
2. Your website files (which you already have)

## Deployment Steps

### Option 1: Deploy using Vercel CLI (Command Line)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   This will open a browser window to authenticate your account.

3. **Deploy your project**
   Navigate to your project directory and run:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - What's your project name? bunny-breeding-simulator (or any name you prefer)
   - In which directory is your code located? ./ (current directory)
   - Want to override settings? No

4. **Your website will be deployed!** 
   Vercel will provide you with deployment URLs:
   - Production: https://your-project-name.vercel.app
   - Preview: A unique URL for this deployment

### Option 2: Deploy via Vercel Web Interface (Easier)

1. **Create a GitHub repository** (if you don't have one)
   - Go to [github.com](https://github.com) and create a new repository
   - Push your project files to this repository

2. **Connect Vercel to GitHub**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Select "Import Git Repository" and connect your GitHub account
   - Select your repository

3. **Configure your project**
   - Project Name: Choose a name for your project
   - Framework Preset: Select "Other" (or "Static Site")
   - Root Directory: Leave as is (usually /)
   - Build Command: Leave empty for static site
   - Output Directory: Leave as is

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your website

5. **Your website is live!**
   - Vercel will provide you with a URL like: https://your-project-name.vercel.app

## Adding Your Images

After deployment, you'll still need to add your rabbit breeding images to make the site fully functional:

1. **Option 1: Add via Vercel Dashboard**
   - Go to your project in the Vercel dashboard
   - Navigate to "Settings" > "Git" > "Deploy Hooks"
   - Redeploy after adding images to your repository

2. **Option 2: Use local images**
   - The simulator is designed to work with local images
   - Users can follow the instructions in image-instructions.txt to add their own images

## Updating Your Deployment

Any time you push changes to your connected GitHub repository, Vercel will automatically redeploy your site.

## Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain and follow the verification steps

---

Your Bunny Breeding Simulator should now be available online! The site is designed to work even without the actual breeding images, using fallback strategies for the missing photos. 