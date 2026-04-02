import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017/next-cart";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('next-cart');
    const result = await db.collection('users').updateMany({}, { $set: { role: 'admin' } });
    console.log(`Updated ${result.modifiedCount} users to be admins.`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
