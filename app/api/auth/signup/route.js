import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const userCount = await db.collection('users').countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role,
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    return NextResponse.json({ success: true, userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
