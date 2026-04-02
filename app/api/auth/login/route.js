import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { comparePassword, signToken } from '@/lib/auth';
import { loginSchema, validateData } from '@/lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input data
    const validation = validateData(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.errors[0].message,
        errors: validation.errors 
      }, { status: 400 });
    }

    const { email, password } = validation.data;

    const db = await getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role || 'user'
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
