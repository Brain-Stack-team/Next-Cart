# MongoDB Setup - Visual Guide

## 🎯 Current Issue

```
❌ Login/Signup Error
❌ Cannot access dashboards
❌ MongoDB connection refused
```

**Root Cause:** MongoDB is not running!

---

## 🔧 Solution Path

```
┌─────────────────────────────────────┐
│  Choose Your Setup Method:          │
├─────────────────────────────────────┤
│                                     │
│  Option A: Local MongoDB            │
│  ├─ Install MongoDB                 │
│  ├─ Start service                   │
│  └─ Use: mongodb://localhost:27017  │
│                                     │
│  Option B: MongoDB Atlas (★)        │
│  ├─ Create free account             │
│  ├─ Get connection string           │
│  └─ Update .env.local               │
│                                     │
└─────────────────────────────────────┘
```

---

## 📋 Step-by-Step: MongoDB Atlas (Recommended)

### Step 1: Create Account
```
🌐 https://www.mongodb.com/cloud/atlas/register
📧 Enter your email
🔐 Create password
✅ Sign up
```

### Step 2: Create Cluster
```
1. Click "Build a Database"
2. Choose "M0 Free"
3. Select region (closest to you)
4. Click "Create Cluster"
⏱️ Wait 3-5 minutes
```

### Step 3: Create Database User
```
Username: nextcart
Password: YourSecurePassword123
✅ Create User
```

### Step 4: Whitelist IP
```
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Enter: 0.0.0.0/0
5. Click "Confirm"
```

### Step 5: Get Connection String
```
1. Go to "Database"
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace <password> with your password
```

Example:
```
mongodb+srv://nextcart:YourSecurePassword123@cluster0.xxxxx.mongodb.net/next-cart?retryWrites=true&w=majority
```

### Step 6: Update .env.local
```env
MONGODB_URI=mongodb+srv://nextcart:YourSecurePassword123@cluster0.xxxxx.mongodb.net/next-cart?retryWrites=true&w=majority
JWT_SECRET=super_secret_temporary_jwt_key_for_development_12345
```

### Step 7: Test Connection
```bash
node test-connection.js
```

Expected output:
```
✅ MongoDB connection successful!
Collections: []
Users count: 0
```

### Step 8: Start App
```bash
npm run dev
```

---

## 📋 Step-by-Step: Local MongoDB

### Step 1: Install MongoDB

**Windows:**
```
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. Click "Install"
```

### Step 2: Verify Installation
```bash
mongod --version
```

Should show version number.

### Step 3: Start MongoDB
```bash
# As Administrator
net start MongoDB
```

### Step 4: Test Connection
```bash
node test-connection.js
```

### Step 5: Start App
```bash
npm run dev
```

---

## 🧪 Testing After Setup

### 1. Test Connection
```bash
node test-connection.js
```

✅ Should show: "MongoDB connection successful!"

### 2. Start Development Server
```bash
npm run dev
```

✅ Should start without errors

### 3. Test Signup
```
URL: http://localhost:3000/signup

Form:
Name: Admin User
Email: admin@test.com
Password: Admin@123
Confirm: Admin@123
```

✅ Should show: "Signup successful!"  
✅ Should redirect to login

### 4. Test Login
```
URL: http://localhost:3000/login

Form:
Email: admin@test.com
Password: Admin@123
```

✅ Should redirect to: /admin  
✅ Should show admin dashboard

### 5. Test Admin Dashboard
```
URL: http://localhost:3000/admin
```

✅ Should show:
- Statistics cards
- Revenue chart
- Orders chart
- User list (with your account)

### 6. Test User Dashboard
```
URL: http://localhost:3000/account
```

✅ Should show:
- Your profile
- Account details
- Logout button

---

## 🎯 Success Checklist

After setup, verify:

- [ ] `node test-connection.js` shows success
- [ ] `npm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Signup creates account
- [ ] Login works
- [ ] Admin dashboard loads
- [ ] User dashboard loads
- [ ] No errors in browser console
- [ ] No errors in terminal

---

## 🐛 Troubleshooting

### Error: "Connection refused"
**Fix:** MongoDB is not running
```bash
# Start MongoDB
net start MongoDB

# Or use MongoDB Atlas
```

### Error: "Authentication failed"
**Fix:** Wrong password in connection string
```
Check .env.local
Verify password matches MongoDB Atlas user
```

### Error: "Network timeout"
**Fix:** IP not whitelisted
```
MongoDB Atlas → Network Access
Add IP: 0.0.0.0/0
```

### Error: "Database not found"
**Fix:** Database will be created automatically
```
Just continue - it's normal for first run
```

---

## 📊 Comparison

| Feature | Local MongoDB | MongoDB Atlas |
|---------|--------------|---------------|
| Installation | Required | Not required |
| Setup Time | 15-30 min | 5-10 min |
| Cost | Free | Free (M0) |
| Maintenance | Manual | Automatic |
| Backups | Manual | Automatic |
| Accessibility | Local only | Anywhere |
| Production Ready | No | Yes |
| **Recommended** | Development | Both Dev & Prod |

---

## 💡 Pro Tips

### For Development:
- Use MongoDB Atlas (easier setup)
- No installation needed
- Works on any computer

### For Production:
- Must use MongoDB Atlas
- Vercel doesn't support local MongoDB
- Same connection string works everywhere

### For Team:
- Everyone uses MongoDB Atlas
- Share cluster (different users)
- Consistent environment

---

## 🚀 Quick Commands

```bash
# Test MongoDB connection
node test-connection.js

# Start development server
npm run dev

# Check MongoDB service (Windows)
sc query MongoDB

# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service (Windows)
net stop MongoDB
```

---

## 📞 Need Help?

### Documentation:
- `QUICK_FIX_GUIDE.md` - Quick fix steps
- `FIX_LOGIN_ISSUE.md` - Detailed troubleshooting
- `DEPLOYMENT_GUIDE.md` - Production setup

### Resources:
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Docs: https://docs.mongodb.com
- Next.js Docs: https://nextjs.org/docs

---

## ✅ Summary

**Problem:** MongoDB not running → Login/Signup fails

**Solution:** 
1. Use MongoDB Atlas (recommended)
2. Or start local MongoDB

**Time:** 5-10 minutes

**Result:** 
- ✅ Login works
- ✅ Signup works
- ✅ Dashboards accessible
- ✅ Ready to develop

---

**Status:** 🔴 Issue Identified → 🟡 Fix Available → 🟢 Ready to Apply  
**Next Step:** Choose setup method and follow guide  
**Estimated Time:** 5-10 minutes
