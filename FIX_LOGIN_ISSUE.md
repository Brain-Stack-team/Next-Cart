# Fix Login & Dashboard Access Issue

## 🔴 Problem Identified

**MongoDB is not running!**

The error: `connect ECONNREFUSED 127.0.0.1:27017`

This means:
- MongoDB service is not started
- The application cannot connect to the database
- Login/Signup will fail
- Dashboards cannot load user data

---

## ✅ Solution Options

### Option 1: Start Local MongoDB (Recommended for Development)

#### If MongoDB is Installed:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Or manually start MongoDB:**
```bash
# Navigate to MongoDB bin folder (adjust path if needed)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
mongod --dbpath "C:\data\db"
```

#### If MongoDB is NOT Installed:

**Download and Install:**
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install with default settings
4. MongoDB should start automatically

**Or use MongoDB Compass (GUI):**
1. Download from https://www.mongodb.com/try/download/compass
2. Install and connect to `mongodb://localhost:27017`

---

### Option 2: Use MongoDB Atlas (Cloud Database - Recommended for Production)

This is the **BEST** solution for deployment and doesn't require local installation.

#### Steps:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free (no credit card required)
   - Create a free cluster (M0 tier)

2. **Configure Database**
   - Create a database user (username + password)
   - Whitelist all IPs: `0.0.0.0/0`
   - Get connection string

3. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-cart?retryWrites=true&w=majority
   JWT_SECRET=super_secret_temporary_jwt_key_for_development_12345
   ```

4. **Restart your app**
   ```bash
   npm run dev
   ```

---

## 🧪 Test the Fix

### After Starting MongoDB:

1. **Test Connection:**
   ```bash
   node test-connection.js
   ```
   
   Should show:
   ```
   ✅ MongoDB connection successful!
   Collections: []
   Users count: 0
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Test Signup:**
   - Go to http://localhost:3000/signup
   - Create account:
     ```
     Name: Admin User
     Email: admin@test.com
     Password: Admin@123
     ```
   - Should succeed and redirect to login

4. **Test Login:**
   - Go to http://localhost:3000/login
   - Login with credentials above
   - Should redirect to `/admin` (first user is admin)

5. **Test Dashboards:**
   - Admin Dashboard: http://localhost:3000/admin
   - User Dashboard: http://localhost:3000/account
   - Both should load without errors

---

## 🔍 Verify MongoDB is Running

### Check if MongoDB is listening:

**Windows:**
```bash
netstat -an | findstr "27017"
```

Should show:
```
TCP    127.0.0.1:27017        0.0.0.0:0              LISTENING
```

### Check MongoDB service status:

**Windows:**
```bash
sc query MongoDB
```

Should show:
```
STATE              : 4  RUNNING
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoDB service not found"
**Solution:** MongoDB is not installed. Use Option 2 (MongoDB Atlas) or install MongoDB.

### Issue 2: "Access denied" when starting service
**Solution:** Run Command Prompt as Administrator:
```bash
# Right-click Command Prompt → Run as Administrator
net start MongoDB
```

### Issue 3: "Data directory not found"
**Solution:** Create data directory:
```bash
mkdir C:\data\db
```

### Issue 4: Port 27017 already in use
**Solution:** Another process is using the port. Find and stop it:
```bash
netstat -ano | findstr "27017"
taskkill /PID <PID_NUMBER> /F
```

### Issue 5: Connection timeout
**Solution:** 
- Check firewall settings
- Verify MongoDB is running
- Check .env.local has correct URI

---

## 📝 Quick Fix Commands

### For Windows (Run as Administrator):

```bash
# Check if MongoDB is installed
where mongod

# Start MongoDB service
net start MongoDB

# If service doesn't exist, start manually
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod --dbpath "C:\data\db"

# In another terminal, test connection
node test-connection.js

# Start your app
npm run dev
```

---

## 🎯 Recommended Approach

### For Development (Local):
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use `mongodb://127.0.0.1:27017/next-cart`

### For Production (Vercel):
1. Use MongoDB Atlas (free tier)
2. Update environment variables in Vercel
3. Use connection string from Atlas

### For Quick Testing:
1. Use MongoDB Atlas (no installation needed)
2. Update .env.local with Atlas connection string
3. Start developing immediately

---

## 🚀 After MongoDB is Running

### Create Your First User:

1. **Go to Signup:**
   ```
   http://localhost:3000/signup
   ```

2. **Create Admin Account (First User):**
   ```
   Name: Admin User
   Email: admin@test.com
   Password: Admin@123
   Confirm: Admin@123
   ```

3. **Login:**
   ```
   http://localhost:3000/login
   Email: admin@test.com
   Password: Admin@123
   ```

4. **Access Admin Dashboard:**
   ```
   http://localhost:3000/admin
   ```
   - Should show dashboard with stats
   - Should show your user in Users tab

5. **Create Regular User:**
   - Logout
   - Signup with different email
   - Login
   - Should redirect to `/account` (not `/admin`)

---

## 📊 Expected Results

### After Fix:

✅ MongoDB connection successful  
✅ Signup creates user in database  
✅ Login generates JWT token  
✅ First user has admin role  
✅ Admin dashboard loads with data  
✅ User dashboard shows profile  
✅ Logout works properly  

---

## 🔧 Alternative: Use Docker (Optional)

If you have Docker installed:

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Check if running
docker ps

# Stop MongoDB
docker stop mongodb

# Start MongoDB
docker start mongodb
```

---

## 📞 Still Having Issues?

### Check These:

1. **MongoDB Installation:**
   ```bash
   mongod --version
   ```

2. **Node.js Version:**
   ```bash
   node --version
   # Should be v18 or higher
   ```

3. **Dependencies Installed:**
   ```bash
   npm install
   ```

4. **Environment Variables:**
   - Check `.env.local` exists
   - Check `MONGODB_URI` is correct
   - Check `JWT_SECRET` is set

5. **Port Conflicts:**
   - Check nothing else is using port 27017
   - Check nothing else is using port 3000

---

## 💡 Pro Tip

**Use MongoDB Atlas for hassle-free development:**

Advantages:
- ✅ No local installation needed
- ✅ Works on any computer
- ✅ Same setup for development and production
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Better security
- ✅ Accessible from anywhere

Just update `.env.local` with Atlas connection string and you're done!

---

## ✅ Checklist

Before testing login/signup:

- [ ] MongoDB is running (local or Atlas)
- [ ] Connection test passes (`node test-connection.js`)
- [ ] `.env.local` has correct `MONGODB_URI`
- [ ] `.env.local` has `JWT_SECRET`
- [ ] Dependencies installed (`npm install`)
- [ ] Development server starts (`npm run dev`)
- [ ] No errors in terminal
- [ ] Port 3000 is accessible

---

**Status:** 🔴 MongoDB Not Running → 🟢 Fix Applied  
**Next Step:** Start MongoDB and test login/signup  
**Estimated Fix Time:** 5-10 minutes
