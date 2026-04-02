// Test MongoDB Connection
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/next-cart';

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log('URI:', uri);
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('✅ MongoDB connection successful!');
    
    const db = client.db('next-cart');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const usersCount = await db.collection('users').countDocuments();
    console.log('Users count:', usersCount);
    
    await client.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('\nPossible solutions:');
    console.error('1. Start MongoDB: net start MongoDB');
    console.error('2. Or use MongoDB Atlas (cloud database)');
    console.error('3. Check if MongoDB is installed');
  }
}

testConnection();
