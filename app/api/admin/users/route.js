import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await getDb();
    const users = await db.collection('users')
      .find({})
      .project({ password: 0 })
      .sort({ createdAt: -1 })
      .toArray();

    const mappedUsers = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      status: 'Active',
      orders: 0,
      spent: 0,
      createdAt: u.createdAt
    }));

    return NextResponse.json({ success: true, users: mappedUsers });
  } catch (error) {
    console.error('Admin users fetching error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
