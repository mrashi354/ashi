# Complete Deployment Setup Guide

This guide walks you through deploying both your frontend on Vercel and backend on Render.

## Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Your Website                           │
│  Frontend (Vercel)     ←→     Backend (Render)          │
│  brdm.vercel.app             brdm-api.onrender.com      │
└─────────────────────────────────────────────────────────┘
```

---

## What Has Been Configured

✅ **Frontend (React/Vite)**
- Environment variable `VITE_API_URL` for dynamic API calls
- Vercel configuration file (`vercel.json`)
- Build process optimized for Vercel
- Routes configured for SPA (Single Page Application)

✅ **Backend (Express/Node.js)**
- CORS configured via `CORS_ORIGIN` environment variable
- Proper middleware setup (logging, JSON parsing, CORS)
- Environment files with examples
- Ready for Render deployment

✅ **Configuration Files Created**
- `.env.example` - Frontend local development
- `.env.production` - Frontend production template
- `artifacts/api-server/.env.example` - Backend local development
- `artifacts/api-server/.env.production` - Backend production template
- `vercel.json` - Vercel build & deployment config
- `DEPLOYMENT_VERCEL.md` - Detailed Vercel guide
- `DEPLOYMENT_RENDER.md` - Detailed Render guide

---

## Deployment Flow (Step-by-Step)

### Phase 1: Local Testing ✅ (Already Done)

Your servers are running locally:
- Frontend: http://localhost:3000
- API: http://localhost:3001

Everything works with environment variables set in `.env.example`

### Phase 2: Deploy Backend First (Render)

**Why first?** Frontend needs the API URL to be deployed second.

1. **Prepare code:**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Create Render Service:**
   - Go to https://render.com
   - Create new Web Service
   - Select your GitHub repository
   - Set **Start Command:** `npm run start --workspace=artifacts/api-server`
   - Add environment variables (see DEPLOYMENT_RENDER.md)
   - Deploy

3. **Note your API URL:**
   - After deployment, copy the URL: `https://your-api-name.onrender.com`

### Phase 3: Deploy Frontend (Vercel)

1. **Update Vercel with API URL:**
   - Go to https://vercel.com
   - Create new project from your GitHub repo
   - In Environment Variables, set:
     - `VITE_API_URL` = `https://your-api-name.onrender.com`
     - `VITE_BASE_URL` = `/`
   - Deploy

2. **Note your frontend URL:**
   - After deployment, copy: `https://your-site.vercel.app`

### Phase 4: Final CORS Configuration

1. **Update Render Backend CORS:**
   - Go to Render Dashboard → Your API Service
   - Update environment variable `CORS_ORIGIN`:
   ```
   https://your-site.vercel.app,https://your-api-name.onrender.com
   ```
   - Deploy/Restart

2. **Verify it works:**
   - Open your Vercel frontend
   - Try contact form or admissions form
   - Should submit to Render API successfully

---

## Quick Reference: Commands & URLs

### Local Development
```bash
# Install all dependencies
npm install

# Start both servers
npm run dev

# Or start separately:
npm run dev:api    # API on :3001
npm run dev:web    # Frontend on :3000
```

### Frontend Build (Vercel)
```bash
npm run build --workspace=artifacts/brdm-school
# Output: artifacts/brdm-school/dist/public/
```

### Backend Build (Render)
```bash
npm run build --workspace=artifacts/api-server
# Output: artifacts/api-server/dist/
```

### Environment Variables

**Frontend (Vercel Environment Variables):**
```
VITE_API_URL = https://your-api-name.onrender.com
VITE_BASE_URL = /
```

**Backend (Render Environment Variables):**
```
NODE_ENV = production
PORT = 3001
CORS_ORIGIN = https://your-site.vercel.app,https://your-api-name.onrender.com
OPENAI_API_KEY = sk-...
RESEND_API_KEY = re-...
```

---

## API Endpoints

### Contact Form
- **Endpoint:** `POST /api/contact`
- **Body:** `{ name, contact, subject, message }`
- **Component:** `artifacts/brdm-school/src/components/sections/Contact.tsx`

### Admissions Form
- **Endpoint:** `POST /api/admissions`
- **Body:** `{ parentName, childName, phone, grade }`
- **Component:** `artifacts/brdm-school/src/components/sections/Admissions.tsx`

---

## File Structure for Reference

```
Root Project
├── artifacts/
│   ├── brdm-school/          # Frontend (React/Vite)
│   │   ├── .env.example      # Local dev vars
│   │   ├── .env.production   # Production template
│   │   ├── package.json
│   │   ├── vite.config.ts    # Vite configuration
│   │   ├── src/
│   │   │   ├── main.tsx       # Sets up API base URL
│   │   │   └── components/
│   │   │       └── sections/
│   │   │           ├── Contact.tsx    # API call: /api/contact
│   │   │           └── Admissions.tsx # API call: /api/admissions
│   │   └── dist/public/      # Build output → Deploy to Vercel
│   │
│   └── api-server/           # Backend (Express/Node)
│       ├── .env.example      # Local dev vars
│       ├── .env.production   # Production template
│       ├── package.json
│       ├── src/
│       │   ├── app.ts        # Express setup with CORS
│       │   ├── index.ts      # Server entry
│       │   └── routes/
│       │       ├── contact.ts    # POST /api/contact
│       │       └── admissions.ts # POST /api/admissions
│       └── dist/             # Build output → Deploy to Render
│
├── vercel.json               # Vercel deployment config
├── DEPLOYMENT_VERCEL.md      # Detailed Vercel guide
├── DEPLOYMENT_RENDER.md      # Detailed Render guide
└── package.json              # Monorepo configuration
```

---

## Troubleshooting Checklist

- [ ] Are environment variables set correctly on Vercel/Render?
- [ ] Is the API URL correct in Vercel (VITE_API_URL)?
- [ ] Is the CORS_ORIGIN correct on Render?
- [ ] Have services been deployed/restarted after env var changes?
- [ ] Does the build succeed locally before deployment?
- [ ] Can you access /api/health on your Render API?
- [ ] Are form submissions showing in Render logs?

---

## Need Help?

Check these files:
1. `DEPLOYMENT_VERCEL.md` - Frontend specific issues
2. `DEPLOYMENT_RENDER.md` - Backend specific issues
3. Your browser's Network tab - Check API call details
4. Render/Vercel logs - Check for errors

---

## After Deployment

### Optional: Custom Domain
1. Buy a domain (GoDaddy, Namecheap, etc.)
2. On Vercel: Project Settings → Domains → Add domain
3. Follow DNS setup instructions
4. Update Render CORS_ORIGIN if using custom domain

### Optional: Email Setup
1. Get Resend API key from https://resend.com
2. Add to Render environment variables
3. Update backend to send actual emails

### Optional: Database
1. Create PostgreSQL database (Render, Railway, Supabase, etc.)
2. Add DATABASE_URL to Render environment
3. Run migrations if needed

---

**Ready to deploy? Start with DEPLOYMENT_RENDER.md for backend!**
