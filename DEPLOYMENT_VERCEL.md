# Frontend Deployment Guide - Vercel

## Quick Setup (Automatic)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub account
3. Click "Add New Project"
4. Select your repository
5. Click "Import"

### Step 3: Configure Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables, add:

**Name:** `VITE_API_URL`
**Value:** `https://your-api-name.onrender.com` (replace with your Render API URL)
**Environments:** Production, Preview

**Name:** `VITE_BASE_URL`
**Value:** `/`
**Environments:** Production, Preview

### Step 4: Set Build Settings
- **Framework:** Vite
- **Build Command:** `npm run build --workspace=artifacts/brdm-school`
- **Output Directory:** `artifacts/brdm-school/dist/public`
- **Install Command:** `npm install`
- **Root Directory:** `.`

### Step 5: Deploy
Click "Deploy" button

---

## Manual Steps (if automatic fails)

1. Build locally:
```bash
npm run build --workspace=artifacts/brdm-school
```

2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
vercel
```

4. When prompted, set environment variables

---

## Troubleshooting

### "Cannot find module" errors
- Make sure all workspace dependencies are installed: `npm install`
- Check tsconfig extends are correct

### Build output not found
- Verify build output in `artifacts/brdm-school/dist/public`
- Check vite.config.ts outDir setting

### API calls failing
- Verify `VITE_API_URL` environment variable is set correctly
- Check that your Render API server is running and publicly accessible
- Check CORS configuration on Render backend

---

## Domain Setup

After deployment:
1. Go to Vercel Project Settings → Domains
2. Add your custom domain (e.g., brdmpublicschool.com)
3. Follow DNS instructions
4. Update `VITE_API_URL` CORS settings on Render backend with your Vercel domain
