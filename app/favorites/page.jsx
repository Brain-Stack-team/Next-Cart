'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

export default function FavoritesPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-4xl mx-auto space-y-6 w-full text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    You haven't saved any items to your favorites yet. Start exploring and click the heart icon to save products!
                </p>
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors shadow-sm">
                    <ShoppingBag className="w-5 h-5" />
                    Browse Products
                </Link>
            </div>
        </main>
    );
}
