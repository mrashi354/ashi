# DEPLOYMENT CHECKLIST & EXACT COMMANDS

Copy-paste ready commands for deployment. Use this as your step-by-step guide.

---

## STEP 1: Push to GitHub (from your local machine)

```bash
cd "c:\Users\ZED KING\Documents\Default Project\ashi"

git add .
git commit -m "Setup deployment configuration for Vercel and Render"
git push origin main
```

---

## STEP 2: Deploy Backend on Render (DO THIS FIRST!)

### On https://render.com

1. **Sign in with GitHub**
   - Click "New +" button
   - Select "Web Service"
   - Authorize Render to access your GitHub account
   - Select your repository

2. **Configure Service**
   - **Name:** `brdm-api` (or `your-school-api`)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Root Directory:** `.` (leave empty/default)
   - **Build Command:** 
     ```
     npm install
     ```
   - **Start Command:** 
     ```
     npm run start --workspace=artifacts/api-server
     ```

3. **Environment Variables** (Add these in the Environment section)
   ```
   NODE_ENV = production
   PORT = 3001
   CORS_ORIGIN = http://localhost:3000,http://localhost:3001
   OPENAI_API_KEY = (leave empty for now or add if you have one)
   RESEND_API_KEY = (leave empty for now or add if you have one)
   ```

4. **Plan:** Select Free (or upgrade to Starter)

5. **Click "Create Web Service"**

6. **Wait for deployment** (2-3 minutes)
   - Watch the logs scroll by
   - Look for "Server listening on port 3001"

7. **Copy your API URL** 
   - Format: `https://brdm-api-xxxxx.onrender.com`
   - Save it somewhere - you'll need it next

---

## STEP 3: Deploy Frontend on Vercel (DO THIS SECOND!)

### On https://vercel.com

1. **Sign in with GitHub**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**
   
   **Root Directory:** `.` (leave as default)
   
   **Framework Preset:** It should auto-detect "Vite"
   
   **Build Command:**
   ```
   npm run build --workspace=artifacts/brdm-school
   ```
   
   **Output Directory:**
   ```
   artifacts/brdm-school/dist/public
   ```
   
   **Install Command:**
   ```
   npm install
   ```

3. **Environment Variables** (CRITICAL!)
   Add these two variables:
   
   ```
   Variable Name: VITE_API_URL
   Value: https://brdm-api-xxxxx.onrender.com
   (Replace xxxxx with YOUR Render API URL)
   Environments: ☑ Production, ☑ Preview, ☑ Development
   
   Variable Name: VITE_BASE_URL
   Value: /
   Environments: ☑ Production, ☑ Preview, ☑ Development
   ```

4. **Click "Deploy"**

5. **Wait for deployment** (2-3 minutes)
   - Watch the build progress
   - Look for "✓ Production build"

6. **Copy your Frontend URL**
   - Format: `https://your-project.vercel.app`
   - Save it - you'll need it for CORS

---

## STEP 4: Update Render CORS (DO THIS AFTER BOTH ARE DEPLOYED!)

### Back on https://render.com

1. Go to your API Service (brdm-api)

2. Click "Environment" in the left sidebar

3. Find `CORS_ORIGIN` variable

4. **Update the value to:**
   ```
   https://your-project.vercel.app,https://brdm-api-xxxxx.onrender.com,http://localhost:3000,http://localhost:3001
   ```
   (Replace with your actual URLs)

5. Click "Save Changes"

6. Service will auto-deploy with new CORS settings

---

## STEP 5: Test Your Deployment

### Test the Frontend
1. Open: `https://your-project.vercel.app`
2. Navigate to Contact page
3. Fill out contact form and submit
4. Should see: "Thank you! Your enquiry has been sent."

### Test the API Directly
1. Open in browser: `https://brdm-api-xxxxx.onrender.com/api/health`
2. Should see a response (or error message - that's OK)

### Check Render Logs
1. Go to Render Dashboard → Your API Service
2. Click "Logs"
3. You should see your API request logged

---

## Troubleshooting

### "Cannot GET /api/health"
- This is normal! The health endpoint might not exist
- Real test: Submit a form and check logs

### CORS Error in Browser Console
Error: `Cross-Origin Request Blocked`
- **Solution:** Update CORS_ORIGIN on Render
- Make sure your Vercel URL is in the CORS_ORIGIN list
- Restart the Render service

### Build Fails on Vercel
Error: `Cannot find module`
- Check build logs carefully
- Make sure Build Command is exactly: `npm run build --workspace=artifacts/brdm-school`
- Make sure Output Directory is exactly: `artifacts/brdm-school/dist/public`

### "Port 3001 is in use" (Local Testing)
- You may see this locally when running npm run dev
- It just means it's trying port 3002 instead
- This is fine for local testing

---

## Exact URLs After Deployment

Replace these with your actual deployed URLs:

**Frontend:** `https://your-project.vercel.app`
**API:** `https://brdm-api-xxxxx.onrender.com`

---

## Environment Variables Summary

### Vercel (Frontend)
| Variable | Value |
|----------|-------|
| VITE_API_URL | https://brdm-api-xxxxx.onrender.com |
| VITE_BASE_URL | / |

### Render (Backend)
| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| PORT | 3001 |
| CORS_ORIGIN | https://your-project.vercel.app,https://brdm-api-xxxxx.onrender.com,http://localhost:3000,http://localhost:3001 |
| OPENAI_API_KEY | (optional) |
| RESEND_API_KEY | (optional) |

---

## Common Issues & Solutions

### Issue: Form submits but nothing happens
**Check:**
1. Vercel build logs - look for build errors
2. Render logs - look for API errors
3. Browser Network tab (F12) - check API response

### Issue: "Service unavailable" on Render
**Cause:** Free tier service spinning down
**Solution:** 
- Wait 30 seconds and retry
- Upgrade to Starter plan for always-on service

### Issue: Form works locally but not deployed
**Check:**
1. Is VITE_API_URL set correctly on Vercel?
2. Is CORS_ORIGIN set correctly on Render?
3. Are both services actually deployed?
4. Check browser console for exact error

### Issue: Build succeeds but site shows blank page
**Cause:** Output directory wrong or pages not being served
**Check:**
1. Verify `artifacts/brdm-school/dist/public` has `index.html`
2. Check Vercel "Output Directory" setting
3. Check `vercel.json` routes configuration

---

## Next Steps After Deployment

- [ ] Test all forms (Contact, Admissions, etc.)
- [ ] Test on mobile devices
- [ ] Monitor Render logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure email sending (optional)
- [ ] Set up database (optional)

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Your Logs:** Always check Vercel/Render dashboard logs first

---

**You're all set! Deploy backend first, then frontend, then update CORS!**
