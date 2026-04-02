import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/lib/data';

// Add images back over the mocked lib database items
const enrichedCategories = categories.map((cat, idx) => ({
  ...cat,
  image: [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&h=150&fit=crop', // Electronics
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&h=150&fit=crop', // Fashion
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=150&h=150&fit=crop', // Home & Living
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop', // Beauty
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150&h=150&fit=crop', // Sports
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=150&fit=crop', // Books
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=150&h=150&fit=crop', // Toys & Games
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=150&h=150&fit=crop', // Automotive
  ][idx % 8]
}))

export default function Categories() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1f2937]">Shop by Category</h2>
        <Link href="/products" className="flex items-center text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors">
          View All <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-4">
        {enrichedCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[20px] hover:shadow-md hover:border-gray-200 transition-all min-w-[150px] flex-shrink-0 group"
          >
            <div className="w-16 h-16 mb-4 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 text-center mb-1.5 line-clamp-1 break-all">
              {category.name}
            </h3>
            <p className="text-[11px] text-gray-500 text-center uppercase tracking-wider font-medium">
              {category.count} items
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
