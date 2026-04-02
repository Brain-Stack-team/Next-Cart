# Complete Testing Guide

## 🧪 How to Test the Project Locally

### Prerequisites
```bash
# Ensure you have:
- Node.js installed (v18 or higher)
- MongoDB running locally OR MongoDB Atlas connection
- Git installed
```

---

## Step 1: Start the Development Server

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The app should be running at: http://localhost:3000

---

## Step 2: Test Authentication Flow

### A. Test Signup

1. **Navigate to Signup Page**
   ```
   http://localhost:3000/signup
   ```

2. **Test Invalid Inputs** (Should show errors)
   - Weak password: `test123`
   - Invalid email: `notanemail`
   - Short name: `A`

3. **Create First User (Will be Admin)**
   ```
   Name: Admin User
   Email: admin@test.com
   Password: Admin@123
   Confirm Password: Admin@123
   ```
   - ✅ Should show "Signup successful!"
   - ✅ Should redirect to login page

4. **Create Second User (Will be Regular User)**
   ```
   Name: Test User
   Email: user@test.com
   Password: User@123
   Confirm Password: User@123
   ```
   - ✅ Should create successfully
   - ✅ Should redirect to login

### B. Test Login

1. **Navigate to Login Page**
   ```
   http://localhost:3000/login
   ```

2. **Test Invalid Credentials**
   ```
   Email: wrong@test.com
   Password: WrongPass@123
   ```
   - ✅ Should show "Invalid credentials" error

3. **Login as Admin**
   ```
   Email: admin@test.com
   Password: Admin@123
   ```
   - ✅ Should redirect to `/admin`
   - ✅ Should see admin dashboard

4. **Logout and Login as Regular User**
   - Click "Sign Out" in admin dashboard
   - Login with:
     ```
     Email: user@test.com
     Password: User@123
     ```
   - ✅ Should redirect to `/account`
   - ✅ Should see user dashboard

---

## Step 3: Test User Dashboard

### Access User Dashboard
```
http://localhost:3000/account
```

### Tests to Perform:

1. **Profile Information**
   - ✅ Name displays correctly
   - ✅ Email displays correctly
   - ✅ Account type shows "user"
   - ✅ Member since date is correct

2. **Navigation**
   - ✅ Click "Sign Out" → Should logout and redirect to login
   - ✅ Click "Start Shopping" → Should go to home page

3. **Without Authentication**
   - Logout first
   - Try to access `/account` directly
   - ✅ Should redirect to `/login`

---

## Step 4: Test Admin Dashboard

### Access Admin Dashboard
```
http://localhost:3000/admin
```

### Tests to Perform:

#### A. Dashboard Tab (Default)

1. **Stats Cards**
   - ✅ Total Revenue displays
   - ✅ Total Orders displays
   - ✅ Total Users shows real count from database
   - ✅ Total Products displays
   - ✅ Change percentages show with up/down arrows

2. **Revenue Chart**
   - ✅ Bar chart renders
   - ✅ Shows monthly data
   - ✅ Hover shows tooltip with values

3. **Orders Pie Chart**
   - ✅ Pie chart renders
   - ✅ Shows order status breakdown
   - ✅ Legend displays correctly
   - ✅ Colors are distinct

4. **Recent Orders Table**
   - ✅ Shows 5 recent orders
   - ✅ Status badges are color-coded
   - ✅ Dates and amounts display correctly

#### B. Products Tab

1. **Click "Products" in sidebar**
   - ✅ Product table displays
   - ✅ Product images load
   - ✅ Shows: Name, Category, Price, Stock, Rating
   - ✅ Stock levels are color-coded (green/orange/red)
   - ✅ "Add Product" button visible

2. **Test Actions**
   - Click "Edit" button (placeholder)
   - Click "Delete" button (placeholder)

#### C. Users Tab

1. **Click "Users" in sidebar**
   - ✅ User table displays
   - ✅ Shows real users from database
   - ✅ Both admin and regular users visible
   - ✅ Email addresses display correctly
   - ✅ Status shows "Active"

2. **Verify User Data**
   - ✅ Admin user shows correct name/email
   - ✅ Regular user shows correct name/email
   - ✅ Orders and Spent show (currently 0)

#### D. Orders & Sellers Tabs

1. **Click "Orders" in sidebar**
   - ✅ Shows placeholder message

2. **Click "Sellers" in sidebar**
   - ✅ Shows placeholder message

#### E. Responsive Design

1. **Desktop View**
   - ✅ Sidebar always visible
   - ✅ Charts display side by side
   - ✅ Tables are readable

2. **Mobile View** (Resize browser to < 768px)
   - ✅ Sidebar hidden by default
   - ✅ Hamburger menu appears
   - ✅ Click hamburger → Sidebar slides in
   - ✅ Click outside → Sidebar closes
   - ✅ Charts stack vertically
   - ✅ Tables scroll horizontally

#### F. Access Control

1. **Logout from Admin Dashboard**
   - ✅ Should redirect to login

2. **Login as Regular User**
   - Try to access `/admin`
   - ✅ Should redirect to home page (/)

3. **Without Authentication**
   - Logout completely
   - Try to access `/admin` directly
   - ✅ Should redirect to `/login`

---

## Step 5: Test Header Navigation

### While Logged Out:

1. **Header Elements**
   - ✅ Logo displays
   - ✅ Search bar visible
   - ✅ Cart icon shows (0 items)
   - ✅ "Sign In" button visible

2. **Navigation**
   - Click "Sign In" → Should go to `/login`
   - Click cart icon → Should go to `/cart`
   - Click logo → Should go to home

### While Logged In (Regular User):

1. **Header Elements**
   - ✅ User name displays in button
   - ✅ User icon visible
   - ✅ No admin dashboard icon

2. **Navigation**
   - Click user button → Should go to `/account`

### While Logged In (Admin):

1. **Header Elements**
   - ✅ User name displays
   - ✅ Admin dashboard icon visible (LayoutDashboard)

2. **Navigation**
   - Click dashboard icon → Should go to `/admin`
   - Click user button → Should go to `/account`

---

## Step 6: Test Middleware Protection

### Test Protected Routes:

1. **Logout completely**

2. **Try to access protected routes directly:**
   ```
   http://localhost:3000/account
   http://localhost:3000/admin
   ```
   - ✅ Both should redirect to `/login`

3. **Login and try to access auth pages:**
   ```
   http://localhost:3000/login
   http://localhost:3000/signup
   ```
   - ✅ Both should redirect to `/account`

---

## Step 7: Test API Endpoints

### Using Browser DevTools or Postman:

#### A. Test `/api/user/me`

**Without Token:**
```bash
curl http://localhost:3000/api/user/me
```
- ✅ Should return 401 Unauthorized

**With Valid Token:**
- Login first, then check in browser
- ✅ Should return user data without password

#### B. Test `/api/admin/dashboard`

**As Regular User:**
- Login as regular user
- Try to access in browser
- ✅ Should return 403 Forbidden

**As Admin:**
- Login as admin
- Access in browser
- ✅ Should return dashboard data with real user count

#### C. Test `/api/admin/users`

**As Regular User:**
- ✅ Should return 403 Forbidden

**As Admin:**
- ✅ Should return array of users without passwords

---

## Step 8: Test Error Handling

### A. Database Connection Error

1. **Stop MongoDB** (if using local)
   ```bash
   # Windows
   net stop MongoDB
   
   # Mac/Linux
   sudo systemctl stop mongod
   ```

2. **Try to login**
   - ✅ Should show "Internal server error"
   - ✅ Check console for connection error

3. **Restart MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

### B. Invalid Token

1. **Manually edit cookie in DevTools**
   - Open DevTools → Application → Cookies
   - Change token value to invalid string
   - Refresh page
   - ✅ Should logout and redirect to login

### C. Network Errors

1. **Disconnect internet**
2. **Try to login**
   - ✅ Should show "An error occurred" message

---

## Step 9: Test Browser Compatibility

### Test in Multiple Browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

### Check:
- ✅ All pages render correctly
- ✅ Forms work properly
- ✅ Charts display correctly
- ✅ Cookies are set properly
- ✅ Redirects work

---

## Step 10: Test Performance

### A. Check Loading States

1. **Slow down network in DevTools**
   - DevTools → Network → Throttling → Slow 3G

2. **Navigate to dashboards**
   - ✅ Loading spinner should appear
   - ✅ Content should load after delay

### B. Check Console for Errors

1. **Open DevTools Console**
2. **Navigate through all pages**
   - ✅ No console errors
   - ✅ No console warnings (except expected ones)

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to connect to database"
**Solution:**
- Check MongoDB is running
- Verify MONGODB_URI in .env.local
- Check MongoDB connection string is correct

### Issue: "Invalid credentials" on correct password
**Solution:**
- Make sure you signed up first
- Check email is correct (case-sensitive)
- Try creating a new account

### Issue: Redirects not working
**Solution:**
- Clear browser cookies
- Check middleware.js is configured correctly
- Verify JWT_SECRET is set in .env.local

### Issue: Admin dashboard shows 403 Forbidden
**Solution:**
- Make sure you're logged in as the first user (admin)
- Check user role in MongoDB
- Try creating a new admin user

### Issue: Charts not rendering
**Solution:**
- Check browser console for errors
- Verify recharts is installed: `npm install recharts`
- Try refreshing the page

---

## ✅ Testing Checklist

### Authentication:
- [ ] Signup with valid data works
- [ ] Signup with invalid data shows errors
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials shows error
- [ ] Logout works and redirects to login
- [ ] First user becomes admin
- [ ] Second user becomes regular user

### User Dashboard:
- [ ] Shows user profile correctly
- [ ] Displays correct role
- [ ] Logout button works
- [ ] Redirects to login when not authenticated
- [ ] Shows admin link for admin users

### Admin Dashboard:
- [ ] Stats cards display correctly
- [ ] Revenue chart renders
- [ ] Pie chart renders
- [ ] Recent orders table shows data
- [ ] Products tab shows product list
- [ ] Users tab shows real users from database
- [ ] Sidebar navigation works
- [ ] Mobile responsive sidebar works
- [ ] Regular users cannot access
- [ ] Redirects to login when not authenticated

### Header:
- [ ] Shows user name when logged in
- [ ] Shows "Sign In" when logged out
- [ ] Admin dashboard icon for admins
- [ ] Cart count updates correctly
- [ ] All navigation links work

### Middleware:
- [ ] Protects /account route
- [ ] Protects /admin route
- [ ] Redirects authenticated users from /login
- [ ] Redirects authenticated users from /signup
- [ ] Prevents non-admins from accessing /admin

### API Endpoints:
- [ ] /api/user/me returns user data
- [ ] /api/admin/dashboard returns dashboard data
- [ ] /api/admin/users returns user list
- [ ] All endpoints check authentication
- [ ] Admin endpoints check role

---

## 📊 Expected Results Summary

After completing all tests, you should have:

1. ✅ 2 users in database (1 admin, 1 regular)
2. ✅ Working authentication flow
3. ✅ Functional user dashboard
4. ✅ Functional admin dashboard with real data
5. ✅ Protected routes working correctly
6. ✅ Role-based access control working
7. ✅ Responsive design on mobile and desktop
8. ✅ No console errors
9. ✅ All redirects working properly
10. ✅ Proper error handling

---

## 🚀 Ready for Production?

If all tests pass:
- ✅ Core functionality is working
- ✅ Authentication is secure
- ✅ Dashboards are functional
- ✅ Ready to deploy to Vercel

Follow `DEPLOYMENT_GUIDE.md` for production deployment steps.

---

**Testing Completed:** _____________
**All Tests Passed:** [ ] Yes [ ] No
**Issues Found:** _____________
**Notes:** _____________
