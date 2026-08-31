# Backend Deployment Guide - Render

## Quick Setup on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Grant permissions for repository access

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Choose branch: `main`
4. Fill in details:
   - **Name:** `brdm-api` (or your preferred name)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start --workspace=artifacts/api-server`
   - **Plan:** Free (or upgrade as needed)

### Step 3: Environment Variables
In Render Dashboard → Your Service → Environment:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `CORS_ORIGIN` | `https://your-site.vercel.app` |
| `OPENAI_API_KEY` | (your OpenAI key) |
| `RESEND_API_KEY` | (your Resend key) |
| `DATABASE_URL` | (if using database) |

**IMPORTANT:** After getting your Render URL, update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://your-site.vercel.app,https://your-api-name.onrender.com
```

### Step 4: Deploy
Click "Create Web Service" to deploy

Your API will be available at: `https://your-api-name.onrender.com`

---

## Configuration Details

### Build Command
```bash
npm install
```
This installs dependencies for the entire monorepo.

### Start Command
```bash
npm run start --workspace=artifacts/api-server
```
This runs the API server from the artifacts/api-server directory.

---

## Important: CORS Configuration

After deployment, you MUST update the CORS_ORIGIN environment variable:

1. Get your Vercel frontend URL (e.g., https://brdmpublicschool.vercel.app)
2. On Render dashboard, update `CORS_ORIGIN`:
```
https://your-site.vercel.app,https://your-api-name.onrender.com
```
3. Click "Save" or "Deploy" to apply changes

---

## API Health Check

After deployment, verify it's working:

```bash
curl https://your-api-name.onrender.com/api/health
```

---

## Monitoring & Logs

1. Go to Render Dashboard → Your Service
2. Click "Logs" to view real-time logs
3. Check for any errors or warnings
4. Monitor resource usage (CPU, Memory)

---

## Troubleshooting

### Service won't start
- Check logs in Render dashboard
- Verify `NODE_ENV=production` is set
- Ensure build command succeeds locally: `npm run build --workspace=artifacts/api-server`

### CORS errors in browser
- Verify `CORS_ORIGIN` includes your Vercel domain
- Make sure there are no trailing/leading spaces in origin URLs
- Restart the service after updating environment variables

### Database/API key errors
- Verify all environment variables are set correctly
- Check that API keys haven't expired
- Test environment variables locally first: `NODE_ENV=production PORT=3001 npm start`

### Free tier limitations
- Cold starts may take 30+ seconds
- Service spins down after 15 minutes of inactivity
- Upgrade to paid plan for consistent performance

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Tells Node.js it's production | `production` |
| `PORT` | Port the API listens on | `3001` |
| `CORS_ORIGIN` | Allowed frontend domains | `https://yoursite.vercel.app` |
| `OPENAI_API_KEY` | For AI features | `sk-...` |
| `RESEND_API_KEY` | For sending emails | `re-...` |
| `DATABASE_URL` | Database connection | `postgresql://...` |

---

## Next Steps

1. ✅ Deploy API on Render
2. ✅ Get Render API URL
3. ✅ Update Vercel with CORS_ORIGIN
4. ✅ Deploy Frontend on Vercel
5. ✅ Update Vercel with VITE_API_URL (Render URL)
6. ✅ Test API calls from frontend
7. ✅ Set up custom domain (optional)
