# Fix Google OAuth 403 Error - Setup Guide

## Problem
You're getting a **403 Forbidden** error when trying to sign in with Google. This happens because Google OAuth hasn't been configured in your Supabase project.

## Solution: Configure Google OAuth in Supabase

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Click "APIs & Services" in the left menu
   - Click "Enable APIs and Services"
   - Search for "Google+ API"
   - Click and select "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add Authorized JavaScript origins:
     - `http://localhost:3000`
   - Add Authorized redirect URIs:
     - `https://gzmpzoghfyynlqqdbuwj.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback`
   
5. Copy your **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (gzmpzoghfyynlqqdbuwj)
3. Go to **Authentication** > **Providers**
4. Find and click on **Google**
5. Enable the provider
6. Paste your **Client ID** and **Client Secret** from Step 1
7. Click **Save**

### Step 3: Test

1. Refresh your app at `http://localhost:3000/auth`
2. Click "Sign in with Google"
3. You should now be redirected to Google login
4. After successful login, you'll be redirected to your dashboard

## Common Issues

### Still getting 403 after setup?
- Clear browser cookies and cache
- Make sure redirect URI in Google Console includes `http://localhost:3000/auth/callback`
- Check that Google+ API is enabled in Google Cloud Console

### Getting "Invalid client" error?
- Verify Client ID and Client Secret are correct
- Check that the project in Google Console matches the one you're using

## Redirect URIs Needed

Make sure these are added to **both**:
- **Google Cloud Console** (Authorized redirect URIs)
- **Supabase** (if there's an option to customize)

```
For Development (localhost):
- http://localhost:3000/auth/callback

For Production:
- https://yourdomain.com/auth/callback
```

## Need More Help?

- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
