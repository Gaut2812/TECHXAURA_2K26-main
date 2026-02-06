# Deploy to Netlify - Complete Guide

## Your Netlify Deployment Steps

### Step 1: Create a GitHub Repository (If Not Already Done)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: TECHXAURA 2K26"

# Add your GitHub remote and push
git remote add origin https://github.com/YOUR_USERNAME/techxaura-2k26.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Netlify

#### Option A: Via Netlify UI (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** or **"Log in"** (use GitHub for easy setup)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **GitHub** and authenticate
5. Find and select your **techxaura-2k26** repository
6. Select branch: **main**
7. Build settings (auto-filled):
   - **Base directory:** (leave empty)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
8. Click **"Deploy site"**

#### Option B: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

### Step 3: Configure Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://gzmpzoghfyynlqqdbuwj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bXB6b2doZnl5bmxxcWRidXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDA0MTEsImV4cCI6MjA4NTg3NjQxMX0.EGEjtq7GjFMs53GtviBA93Y2ZahmeZC4HpqRDEmvHww
   ```
3. Click **"Save"** and **redeploy** the site

---

### Step 4: Update Supabase OAuth URLs

Since your Netlify URL will be different from `localhost`, update OAuth callbacks:

#### In Supabase Dashboard:

1. Go to **Authentication** > **Providers** > **Google**
2. Update redirect URI to:
   ```
   https://your-site-name.netlify.app/auth/callback
   ```
3. Save changes

#### In Google Cloud Console:

1. Go to **APIs & Services** > **Credentials**
2. Edit your OAuth client ID
3. Add authorized redirect URI:
   ```
   https://your-site-name.netlify.app/auth/callback
   ```
4. Save

---

### Step 5: Verify Deployment

1. Your site will be live at: `https://your-site-name.netlify.app`
2. Check the **Deploys** tab in Netlify for status
3. Test all features:
   - ✅ Landing page loads
   - ✅ Auth page works
   - ✅ Sign in/Sign up
   - ✅ Google OAuth (after URL update)
   - ✅ Dashboard loads after login

---

## What's Included

- ✅ **netlify.toml** - Automatic build configuration
- ✅ **Security headers** - X-Frame-Options, CORS headers
- ✅ **Cache optimization** - Static assets cached for performance
- ✅ **Redirects** - All routes redirect to your Next.js app
- ✅ **Environment variables** - Configured for Supabase

---

## Your Deployment URLs

After deployment, you'll have:
- **Production URL:** `https://your-site-name.netlify.app`
- **Admin Dashboard:** `https://your-site-name.netlify.app/dashboard`
- **Auth Page:** `https://your-site-name.netlify.app/auth`

---

## Common Issues & Fixes

### 1. Build Fails - "Module not found"
```
Solution: Run npm install locally first, then push to GitHub
```

### 2. White Screen on Load
```
Solution: Check browser console for errors
Clear cache and hard refresh (Ctrl+Shift+R)
```

### 3. OAuth Still Returns 403
```
Solution: Make sure redirect URI in Google & Supabase matches your Netlify domain
Clear cookies and try again
```

### 4. Environment Variables Not Loaded
```
Solution: Redeploy site after adding env variables
Go to Deploys > Trigger deploy
```

---

## Monitoring & Logs

- **Build Logs:** Deploys tab → Click deploy → View logs
- **Function Logs:** Functions tab
- **Analytics:** Analytics tab (view after some traffic)

---

## Next Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify** (see Step 2 above)

3. **Configure Environment Variables** (see Step 3)

4. **Update Supabase OAuth URLs** (see Step 4)

5. **Test Your Deployment** (see Step 5)

---

## Custom Domain (Optional)

To use your own domain:

1. In Netlify Dashboard → Site settings → Domain management
2. Click "Add domain" and follow instructions
3. Update DNS records at your domain provider
4. Wait for DNS to propagate (24-48 hours)

---

## Support

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js
- Supabase Docs: https://supabase.com/docs
