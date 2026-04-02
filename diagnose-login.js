// Diagnostic Script - Check Login Issues
const https = require('https');
const http = require('http');

console.log('='.repeat(60));
console.log('LOGIN DIAGNOSTIC TOOL');
console.log('='.repeat(60));
console.log();

// Check if server is running
console.log('1. Checking if Next.js server is running...');
http.get('http://localhost:3000', (res) => {
  console.log('   ✅ Server is running at http://localhost:3000');
  console.log(`   Status: ${res.statusCode}`);
  console.log();
  
  // Check login API endpoint
  console.log('2. Testing login API endpoint...');
  const postData = JSON.stringify({
    email: 'test@test.com',
    password: 'Test@123'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`   Status Code: ${res.statusCode}`);
      console.log(`   Response: ${data}`);
      console.log();
      
      try {
        const response = JSON.parse(data);
        
        if (res.statusCode === 500) {
          console.log('   ❌ SERVER ERROR DETECTED!');
          console.log('   Error:', response.error);
          console.log();
          console.log('   Most likely cause: MongoDB is not connected');
          console.log();
          console.log('   SOLUTION:');
          console.log('   1. Set up MongoDB Atlas (see IMMEDIATE_FIX.md)');
          console.log('   2. Update .env.local with Atlas connection string');
          console.log('   3. Restart server: npm run dev');
          console.log();
        } else if (res.statusCode === 401) {
          console.log('   ℹ️  User not found (this is expected for test)');
          console.log('   This means the API is working!');
          console.log('   You need to sign up first at: http://localhost:3000/signup');
          console.log();
        } else if (res.statusCode === 400) {
          console.log('   ℹ️  Validation error (this is expected for test)');
          console.log('   This means the API is working!');
          console.log();
        }
      } catch (e) {
        console.log('   ❌ Could not parse response');
        console.log('   Raw response:', data);
      }
      
      console.log('='.repeat(60));
      console.log('DIAGNOSTIC COMPLETE');
      console.log('='.repeat(60));
    });
  });

  req.on('error', (e) => {
    console.log('   ❌ Error testing login API:', e.message);
    console.log();
    console.log('   This usually means:');
    console.log('   - Server is not running');
    console.log('   - Wrong port');
    console.log();
    console.log('   SOLUTION:');
    console.log('   1. Make sure server is running: npm run dev');
    console.log('   2. Check it\'s on port 3000');
    console.log();
  });

  req.write(postData);
  req.end();
  
}).on('error', (e) => {
  console.log('   ❌ Server is NOT running!');
  console.log('   Error:', e.message);
  console.log();
  console.log('   SOLUTION:');
  console.log('   1. Open terminal');
  console.log('   2. Run: npm run dev');
  console.log('   3. Wait for "Ready" message');
  console.log('   4. Run this diagnostic again');
  console.log();
  console.log('='.repeat(60));
});
