# Pre-Push Checklist

Before pushing to your GitHub repository for merge, complete these steps:

## ✅ Local Testing

- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Start development server: `npm run dev`
- [ ] Test signup flow:
  - [ ] Try weak password (should fail with validation error)
  - [ ] Try invalid email (should fail)
  - [ ] Create account with valid credentials (should succeed)
- [ ] Test login flow:
  - [ ] Login with created account (should succeed)
  - [ ] Verify redirect to `/account` or `/admin`
- [ ] Test protected routes:
  - [ ] Access `/account` when logged in (should work)
  - [ ] Logout and try `/account` (should redirect to login)
- [ ] Check browser console for errors
- [ ] Verify no TypeScript/ESLint errors: `npm run lint`

## 📝 Code Review

- [ ] Review all changed files
- [ ] Ensure no sensitive data in code
- [ ] Check `.env.local` is NOT committed (should be in .gitignore)
- [ ] Verify `.env.example` has placeholder values only
- [ ] All new files are properly formatted

## 🔐 Security Check

- [ ] `.env.local` contains only development values
- [ ] No hardcoded passwords or secrets
- [ ] JWT_SECRET is not the default value in production
- [ ] MongoDB URI will be updated in Vercel (not localhost)

## 📚 Documentation

- [ ] Read `FIXES_SUMMARY.md` - understand what was fixed
- [ ] Read `QUICK_START.md` - know how to run locally
- [ ] Read `DEPLOYMENT_GUIDE.md` - know how to deploy
- [ ] Review `PRODUCTION_IMPROVEMENT_PLAN.md` - plan next steps

## 🚀 Deployment Preparation

- [ ] MongoDB Atlas account created (or planned)
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0 for Vercel)
- [ ] Connection string ready
- [ ] Strong JWT_SECRET generated for production

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📦 Git Commit

- [ ] Stage all changes: `git add .`
- [ ] Review staged files: `git status`
- [ ] Commit with clear message:
  ```bash
  git commit -m "fix: resolve authentication issues and add production setup
  
  - Fixed corrupted .env.local file
  - Enhanced MongoDB connection with error handling
  - Added input validation with Zod schemas
  - Implemented security headers
  - Created deployment and improvement documentation
  - Added password strength requirements"
  ```

## 🔄 Push & Merge

- [ ] Push to your branch: `git push origin <your-branch>`
- [ ] Create Pull Request on GitHub
- [ ] Add description of changes
- [ ] Request review from team
- [ ] Wait for approval
- [ ] Merge to main branch

## 🌐 Vercel Deployment

After merge to main:

- [ ] Go to Vercel dashboard
- [ ] Navigate to your project
- [ ] Go to Settings → Environment Variables
- [ ] Add required variables:
  ```
  MONGODB_URI=mongodb+srv://...
  JWT_SECRET=<your-generated-secret>
  NODE_ENV=production
  ```
- [ ] Trigger deployment (or wait for auto-deploy)
- [ ] Monitor deployment logs
- [ ] Test deployed application

## 🧪 Production Testing

After deployment:

- [ ] Visit your Vercel URL
- [ ] Test signup with new account
- [ ] Test login with created account
- [ ] Test protected routes
- [ ] Test logout
- [ ] Check browser console for errors
- [ ] Verify cookies are set correctly
- [ ] Test on mobile device
- [ ] Test in different browsers

## 📊 Post-Deployment

- [ ] Monitor error logs in Vercel
- [ ] Check MongoDB Atlas metrics
- [ ] Verify user data is being saved
- [ ] Test all critical user flows
- [ ] Document any issues found
- [ ] Plan next improvements from `PRODUCTION_IMPROVEMENT_PLAN.md`

## 🆘 Rollback Plan

If issues occur in production:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find previous working deployment
4. Click "..." → "Promote to Production"
5. Investigate issues locally
6. Fix and redeploy

## 📞 Team Communication

- [ ] Notify team of changes
- [ ] Share documentation links
- [ ] Explain what was fixed
- [ ] Discuss next priorities
- [ ] Schedule follow-up meeting if needed

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production (test locally)
npm run build

# Start production build locally
npm run start

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Check git status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "your message"

# Push to remote
git push origin <branch-name>
```

---

**Ready to push?** Make sure all checkboxes above are checked! ✅
