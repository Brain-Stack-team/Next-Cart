'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShoppingCart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-[#111827] w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-white">Next-Cart</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your trusted marketplace for quality products at the best prices. Shop smarter, live better.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Customer Service</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Become a Seller</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm font-medium mb-6">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>123 Commerce Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>support@next-cart.com</span>
              </li>
            </ul>
            
            <div>
              <p className="text-white text-sm font-bold mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-sm text-gray-300 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-teal-500 w-full"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white text-sm font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium mb-4">We Accept</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL', 'STRIPE'].map((gateway) => (
                <div key={gateway} className="bg-white text-gray-800 text-[10px] font-black tracking-wider px-3 py-1.5 rounded-[4px] shadow-sm">
                  {gateway}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              © 2026 Next-Cart. All rights reserved. Built with <span className="text-red-500">❤️</span> for modern e-commerce.
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-10 h-10 bg-gradient-to-t from-indigo-500 to-teal-400 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hidden sm:flex"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
