'use client';

import Link from 'next/link';
import { ShoppingBag, Smartphone, Shirt, Heart, Home, Dumbbell } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Fashion',
    icon: Shirt,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 3,
    name: 'Beauty',
    icon: Heart,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 4,
    name: 'Home',
    icon: Home,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 5,
    name: 'Sports',
    icon: Dumbbell,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 6,
    name: 'All Products',
    icon: ShoppingBag,
    color: 'from-purple-500 to-primary'
  }
];

export default function Categories() {
  return (
    <div>
      
    </div>
  );
}
