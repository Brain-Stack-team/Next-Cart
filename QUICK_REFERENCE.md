# Quick Reference Card

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔑 Environment Variables

```env
# .env.local (Development)
MONGODB_URI=mongodb://127.0.0.1:27017/next-cart
JWT_SECRET=super_secret_temporary_jwt_key_for_development_12345

# Vercel (Production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-cart
JWT_SECRET=<generate-secure-random-string>
NODE_ENV=production
```

---

## 🌐 Important URLs

### Local Development
- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Signup: http://localhost:3000/signup
- User Dashboard: http://localhost:3000/account
- Admin Dashboard: http://localhost:3000/admin
- Cart: http://localhost:3000/cart
- Products: http://localhost:3000/products

### API Endpoints
- Login: POST /api/auth/login
- Signup: POST /api/auth/signup
- Logout: POST /api/auth/logout
- Get User: GET /api/user/me
- Admin Dashboard: GET /api/admin/dashboard
- Admin Users: GET /api/admin/users

---

## 👤 Test Accounts

### Create Admin (First User)
```
Name: Admin User
Email: admin@test.com
Password: Admin@123
```

### Create Regular User (Second User)
```
Name: Test User
Email: user@test.com
Password: User@123
```

---

## 📋 Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%*?&#)

---

## 🛣️ Route Protection

| Route | Access | Redirect If |
|-------|--------|-------------|
| `/login` | Public | Authenticated → `/account` |
| `/signup` | Public | Authenticated → `/account` |
| `/account` | Authenticated | Not authenticated → `/login` |
| `/admin` | Admin only | Not authenticated → `/login` |
| `/admin` | Admin only | Not admin → `/` |

---

## 🗂️ Project Structure

```
next-cart/
├── app/
│   ├── account/          # User dashboard
│   ├── admin/            # Admin dashboard
│   ├── api/              # API routes
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/           # React components
├── lib/
│   ├── auth.js          # Auth utilities
│   ├── mongodb.js       # Database
│   └── validation.js    # Input validation
├── .env.local           # Environment variables
└── middleware.js        # Route protection
```

---

## 🔐 Security Checklist

- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] HTTP-only cookies
- [x] Input validation (Zod)
- [x] Security headers
- [x] Protected routes
- [x] Role-based access
- [ ] Rate limiting (TODO)
- [ ] Email verification (TODO)
- [ ] Password reset (TODO)

---

## 🧪 Quick Test

```bash
# 1. Start server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Create admin account
Go to /signup
Create first user (becomes admin)

# 4. Test login
Login with admin credentials
Should redirect to /admin

# 5. Test dashboards
Visit /admin - Should work
Visit /account - Should work
Logout - Should redirect to /login
```

---

## 📊 Dashboard Features

### User Dashboard (`/account`)
- Profile information
- Account details
- Logout button
- Admin link (if admin)

### Admin Dashboard (`/admin`)
- Statistics cards
- Revenue chart
- Orders pie chart
- Recent orders table
- Product management
- User management
- Responsive sidebar

---

## 🚀 Deployment Steps

### 1. MongoDB Atlas
```
1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs: 0.0.0.0/0
5. Get connection string
```

### 2. Vercel Setup
```
1. Go to vercel.com
2. Import GitHub repository
3. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
4. Deploy
```

### 3. Test Production
```
1. Visit Vercel URL
2. Create test account
3. Test login/logout
4. Test dashboards
5. Verify everything works
```

---

## 🐛 Common Issues

### "Failed to connect to database"
- Check MongoDB is running
- Verify MONGODB_URI is correct
- Check network access in MongoDB Atlas

### "Invalid credentials"
- Make sure you signed up first
- Check email/password are correct
- Try creating new account

### Redirects not working
- Clear browser cookies
- Check middleware.js
- Verify JWT_SECRET is set

### Admin dashboard shows 403
- Make sure you're the first user (admin)
- Check user role in MongoDB
- Try creating new admin user

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| FINAL_SUMMARY.md | Complete overview |
| QUICK_START.md | Getting started |
| TESTING_GUIDE.md | How to test |
| DEPLOYMENT_GUIDE.md | How to deploy |
| PRODUCTION_IMPROVEMENT_PLAN.md | Future roadmap |
| DASHBOARD_VERIFICATION.md | Dashboard details |
| PROJECT_STATUS.md | Project status |
| FIXES_SUMMARY.md | What was fixed |
| PRE_PUSH_CHECKLIST.md | Pre-deployment checklist |
| QUICK_REFERENCE.md | This file |

---

## 🎯 Quick Links

### Start Here:
1. Read `FINAL_SUMMARY.md`
2. Follow `QUICK_START.md`
3. Test with `TESTING_GUIDE.md`
4. Deploy with `DEPLOYMENT_GUIDE.md`

### Need Help:
- Setup issues → `QUICK_START.md`
- Testing issues → `TESTING_GUIDE.md`
- Deployment issues → `DEPLOYMENT_GUIDE.md`
- Understanding code → `DASHBOARD_VERIFICATION.md`

### Planning:
- What's next → `PRODUCTION_IMPROVEMENT_PLAN.md`
- Project status → `PROJECT_STATUS.md`
- Before pushing → `PRE_PUSH_CHECKLIST.md`

---

## ✅ Status

- Authentication: ✅ Working
- User Dashboard: ✅ Working
- Admin Dashboard: ✅ Working
- Database: ✅ Connected
- Security: ✅ Implemented
- Documentation: ✅ Complete
- Ready to Deploy: ✅ Yes

---

**Last Updated:** April 2, 2026  
**Status:** ✅ PRODUCTION READY
