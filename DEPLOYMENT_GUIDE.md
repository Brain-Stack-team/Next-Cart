# Deployment Guide - Next Cart

## Fixed Issues ✅

1. **Cleaned `.env.local`** - Removed corrupted content
2. **Improved MongoDB connection** - Added connection pooling and error handling
3. **Fixed cookie settings** - Changed `sameSite` from 'strict' to 'lax' for better compatibility
4. **Created `.env.example`** - Template for environment variables

## Vercel Deployment Steps

### 1. Setup MongoDB Atlas (Required for Production)

Your current `.env.local` uses `localhost` which won't work on Vercel. You need MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username + password)
4. Whitelist all IPs: `0.0.0.0/0` (for Vercel)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### 2. Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

```bash
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/next-cart?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-random-string-here-at-least-32-characters
NODE_ENV=production
```

**Important:** Generate a strong JWT_SECRET using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Deploy to Vercel

```bash
# Commit your changes
git add .
git commit -m "fix: authentication issues and production setup"

# Push to your repository
git push origin main

# Vercel will auto-deploy if connected, or run:
vercel --prod
```

### 4. Test After Deployment

1. Visit your Vercel URL
2. Test signup: Create a new account
3. Test login: Login with created account
4. Test protected routes: Try accessing `/account` and `/admin`

## Local Development

```bash
# Install dependencies
npm install

# Start MongoDB locally (if using local DB)
# Or update .env.local with MongoDB Atlas URI

# Run development server
npm run dev
```

## Common Issues & Solutions

### Issue: "Failed to connect to database"
- **Solution:** Check MongoDB URI is correct and database is accessible
- Verify network access in MongoDB Atlas (whitelist 0.0.0.0/0)

### Issue: "Invalid credentials" on login
- **Solution:** Make sure you signed up first
- Check MongoDB has the users collection with data

### Issue: Cookies not working
- **Solution:** Ensure `secure` flag is true in production
- Check browser allows cookies

### Issue: Redirects not working
- **Solution:** Clear browser cache and cookies
- Check middleware.js is properly configured
