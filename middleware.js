import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error('The environment variable JWT_SECRET is not set.');
    }
    return new TextEncoder().encode(secret);
};

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
    const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/account');

    let verifiedToken = null;

    if (token) {
        try {
            const { payload } = await jwtVerify(token, getJwtSecretKey());
            verifiedToken = payload;
        } catch (error) {
            console.log('Middleware: Invalid/Expired token');
        }
    }

    if (!verifiedToken && isProtectedRoute) {
        console.log(`Middleware: Redirecting unauthenticated user from ${pathname} to /login`);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (verifiedToken && isAuthRoute) {
        console.log(`Middleware: Redirecting authenticated user from ${pathname} to /account`);
        return NextResponse.redirect(new URL('/account', request.url));
    }

    if (verifiedToken && pathname.startsWith('/admin') && verifiedToken.role !== 'admin') {
        console.log(`Middleware: Forbidden access for role ${verifiedToken.role} at ${pathname}`);
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/account/:path*', '/login', '/signup'],
};
