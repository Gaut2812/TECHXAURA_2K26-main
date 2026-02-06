# Share Your TECHXAURA App with Others

Your app is currently running on **http://localhost:3000**, which only works on your computer. Here are options to share it with others:

## Option 1: Using ngrok (Recommended)

### Step 1: Install ngrok
Already installed via npm! 

### Step 2: Create Public URL
```powershell
ngrok http 3000
```

This will show you a public URL like:
```
Forwarding                    https://xxxx-xx-xxx-xxxx-xx.ngrok.io -> http://localhost:3000
```

### Step 3: Share the URL
Send the full URL to anyone and they can access your app from anywhere!

**Example:** `https://xxxx-xx-xxx-xxxx-xx.ngrok.io`

---

## Option 2: Using LocalTunnel

### Already Installed!
LocalTunnel is ready to use.

### Create Tunnel
```powershell
lt --port 3000
```

This generates a URL like:
```
your-unique-url.loca.lt
```

Share this URL with others!

---

## Option 3: Update Supabase for External URLs

If you're using ngrok or LocalTunnel, you need to update your Supabase OAuth callback URL:

### Add to Supabase:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** > **Providers** > **Google**
4. Add this redirect URI:
   ```
   https://your-tunnel-url.com/auth/callback
   ```
   (Replace `your-tunnel-url.com` with your actual ngrok/localtunnel URL)

5. Also add to **Google Cloud Console**:
   - APIs & Services > Credentials
   - Edit OAuth client
   - Add authorized redirect URI:
     ```
     https://your-tunnel-url.com/auth/callback
     ```

---

## Option 4: Deploy to Production (Permanent)

For a permanent solution, deploy your app to:

### Free Options:
- **Vercel** (recommended for Next.js)
  - Just connect your GitHub and it auto-deploys
  - URL: `https://your-app.vercel.app`
  
- **Netlify**
  - Easy deployment for Next.js apps
  - URL: `https://your-app.netlify.app`

- **Railway**
  - Full-featured hosting
  - URL: `https://your-app-xxxxx.railway.app`

### Steps for Vercel:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" and select your repo
4. It automatically detects Next.js
5. Click Deploy
6. Share the generated URL with anyone!

---

## Current Setup

Your app is running at:
- **Local Development:** http://localhost:3000
- **With ngrok:** https://xxxx-xxxx-xxxx.ngrok.io
- **With LocalTunnel:** https://your-name.loca.lt

---

## Quick Commands

```bash
# Start dev server (already running)
npm run dev

# Create ngrok tunnel
ngrok http 3000

# Create localtunnel
lt --port 3000

# Open in browser
start http://localhost:3000
```

---

## Important Notes

⚠️ **Localhost links don't work for others**
- `http://localhost:3000` - Only you can access
- `http://192.168.1.x:3000` - Only your local network can access
- `https://ngrok.io/...` - Anyone with the link can access

✅ **Use tunneling for sharing during development**
✅ **Deploy to production for permanent access**

---

## Troubleshooting

### Gallery/Storage 403 Errors After Tunneling
- Update Supabase CORS settings in Authentication > URL Configuration
- Add your tunnel URL to allowed redirect URLs

### OAuth still not working
- Update your redirect URI in both Supabase AND Google Cloud Console
- Clear browser cookies and try again
