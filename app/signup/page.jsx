'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            alert(`Signup successful for: ${name} (${email})`);
            setIsLoading(false);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-primary font-bold text-2xl">S</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">ShopHub</h1>
                        <p className="text-white/80">Create Your Account</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Name Field */}
                            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                                <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-smooth"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.15s' }}>
                                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-smooth"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-smooth"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.25s' }}>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-smooth"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" required />
                                <span className="text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link href="#" className="text-primary hover:underline font-medium">
                                        Terms of Service
                                    </Link>
                                </span>
                            </label>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-smooth hover-lift disabled:opacity-75 flex items-center justify-center gap-2 mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth font-medium text-gray-700"
                                >
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth font-medium text-gray-700"
                                >
                                    GitHub
                                </button>
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <p className="text-center text-gray-600 mt-6">
                            Already have an account?{' '}
                            <Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    By signing up, you agree to our{' '}
                    <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                    </Link>
                </p>
            </div>
        </main>
    );
}
