# Build & Start Commands Reference

Use these exact commands on Vercel and Render dashboards.

---

## For Vercel (Frontend)

### Build Command
```
npm run build --workspace=artifacts/brdm-school
```

### Output Directory  
```
artifacts/brdm-school/dist/public
```

### Environment Variables
```
VITE_API_URL=https://your-api-name.onrender.com
VITE_BASE_URL=/
```

### Install Command (optional, usually defaults to `npm install`)
```
npm install
```

---

## For Render (Backend)

### Build Command
```
npm install
```

### Start Command
```
npm run start --workspace=artifacts/api-server
```

### Environment Variables
```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-site.vercel.app,https://your-api-name.onrender.com
OPENAI_API_KEY=sk-your-key-here
RESEND_API_KEY=your-resend-key
```

---

## Local Testing (For Reference)

### Start Everything
```bash
npm run dev
```

### Start Just Backend
```bash
npm run dev:api
```

### Start Just Frontend
```bash
npm run dev:web
```

### Build Backend
```bash
npm run build --workspace=artifacts/api-server
```

### Build Frontend
```bash
npm run build --workspace=artifacts/brdm-school
```

---

## Directory References

### Frontend Build Output
```
artifacts/brdm-school/dist/public/
```

### Backend Build Output
```
artifacts/api-server/dist/
```

### Root Directory (where you run commands)
```
. (current directory)
```

---

## Environment Variable Locations

### Vercel
Dashboard → Project Settings → Environment Variables

### Render
Dashboard → Your Service → Environment

### Local (create these files)
```
artifacts/brdm-school/.env.local
artifacts/api-server/.env
```

---

## Ports

- **Frontend Local:** 3000 (or 3001, 3002 if busy)
- **API Local:** 3001
- **Both in Production:** URLs managed by Vercel/Render

---

## Common Variables

Replace these in all commands:

```
your-site-name → your actual Vercel project name
your-api-name → your actual Render service name
your-vercel-url → https://your-site.vercel.app
your-render-url → https://your-api-name.onrender.com
```

---

## Testing After Deployment

### Test Frontend
```
https://your-site.vercel.app
```

### Test API Health
```
https://your-api-name.onrender.com/
```

### Test Form Submission
1. Open frontend URL
2. Go to Contact page
3. Submit form
4. Check Render logs for request

---

## Troubleshooting Commands

### Check if build works locally
```bash
npm run build --workspace=artifacts/brdm-school
npm run build --workspace=artifacts/api-server
```

### Check if start works locally
```bash
NODE_ENV=production PORT=3001 npm run start --workspace=artifacts/api-server
```

### Check dependency issues
```bash
npm install --legacy-peer-deps
```

### Update all dependencies
```bash
npm update
```

### Clear cache and reinstall
```bash
rm -r node_modules package-lock.json
npm install
```

---

## Quick Checklist

Before deploying:
- [ ] Build succeeds locally: `npm run build --workspace=artifacts/brdm-school`
- [ ] Backend builds: `npm run build --workspace=artifacts/api-server`
- [ ] Forms work locally: `npm run dev`
- [ ] Code committed: `git push origin main`

After deploying:
- [ ] Render backend deployed and has API URL
- [ ] Vercel frontend deployed with VITE_API_URL set
- [ ] Render CORS_ORIGIN updated with Vercel URL
- [ ] Forms submit successfully
- [ ] No errors in Vercel/Render logs

---

## Remember

- **Vercel** = Frontend (React)
- **Render** = Backend (API)
- **CORS** = Must be configured on Render
- **VITE_API_URL** = Must be set on Vercel
- **Order** = Deploy backend first, then frontend

---

That's all you need! Copy these commands to your Vercel/Render dashboards.
