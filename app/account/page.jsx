'use client';

import { useState, useEffect } from 'react';
import { User, LogOut, Package, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    window.location.href = '/login';
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
        } catch (err) {
            console.error('Failed to log out');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-center text-gray-900 mb-1">{user?.name}</h2>
                        <p className="text-gray-500 text-center text-sm mb-6 flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            {user?.email}
                        </p>
                        
                        <div className="space-y-3 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Account Type</span>
                                <span className="font-semibold text-gray-900 capitalize">{user?.role}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Member Since</span>
                                <span className="font-semibold text-gray-900">
                                    {new Date(user?.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {user?.role === 'admin' && (
                                <Link href="/admin" className="block text-center mt-4 text-primary font-medium hover:underline text-sm">
                                    Go to Admin Dashboard &rarr;
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Orders Stub */}
                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <Package className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Recent Orders</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            You haven't placed any orders yet. Once you place an order, it will appear here along with tracking details.
                        </p>
                        <Link href="/" className="mt-6 inline-block px-6 py-2 bg-primary text-white font-medium rounded-lg hover:shadow-lg transition-transform hover:scale-105">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
