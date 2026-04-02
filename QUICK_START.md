# Quick Start Guide

## ✅ Issues Fixed

1. **Corrupted .env.local file** - Cleaned up invalid content
2. **MongoDB connection** - Added proper error handling and connection pooling
3. **Cookie settings** - Changed sameSite to 'lax' for better compatibility
4. **Input validation** - Added Zod schema validation for signup/login
5. **Security headers** - Added comprehensive security headers in next.config.mjs

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/next-cart
JWT_SECRET=your_secure_jwt_secret_here
```

### 3. Start MongoDB (if using local)
```bash
# Windows (if MongoDB installed)
net start MongoDB

# Or use MongoDB Atlas (recommended)
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🌐 Deploy to Vercel

### 1. Setup MongoDB Atlas
- Create account at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Whitelist all IPs: 0.0.0.0/0

### 2. Configure Vercel Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-cart
JWT_SECRET=<generate-secure-random-string>
NODE_ENV=production
```

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Deploy
```bash
git add .
git commit -m "fix: authentication and production setup"
git push origin main
```

Vercel will auto-deploy if connected.

## 🧪 Testing

### Test Signup
1. Go to `/signup`
2. Create account with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123 (must meet requirements)

### Test Login
1. Go to `/login`
2. Login with created credentials
3. Should redirect to `/account` (or `/admin` if first user)

### Test Protected Routes
- `/account` - User dashboard
- `/admin` - Admin dashboard (first user only)

## 📋 Password Requirements

New passwords must have:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&#)

## 🔧 Troubleshooting

### "Failed to connect to database"
- Check MongoDB is running (local) or accessible (Atlas)
- Verify MONGODB_URI is correct
- Check network access in MongoDB Atlas

### "Invalid credentials"
- Ensure you've signed up first
- Check email/password are correct
- Try creating a new account

### Cookies not working
- Clear browser cookies
- Check browser allows cookies
- Verify secure flag settings

## 📚 Next Steps

See `PRODUCTION_IMPROVEMENT_PLAN.md` for comprehensive production improvements.

Priority improvements:
1. Add rate limiting
2. Implement email verification
3. Add password reset
4. Set up error monitoring
5. Write tests
