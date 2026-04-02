import { Star, Heart } from 'lucide-react';

const products = [
  { id: 3, brand: 'LuxeStyle', name: 'Designer Leather Handbag', rating: 4.8, reviews: '432', price: '189.99', oldPrice: null, discount: null, stock: 'Only 12 left in stock', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&h=400&fit=crop' },
  { id: 4, brand: 'PhotoPro', name: 'Ultra HD 4K Camera', rating: 4.9, reviews: '567', price: '799.99', oldPrice: '999.99', discount: '-20%', stock: 'Only 8 left in stock', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=400&fit=crop' },
  { id: 5, brand: 'BrewMaster', name: 'Modern Coffee Maker', rating: 4.4, reviews: '678', price: '79.99', oldPrice: '99.99', discount: '-20%', stock: null, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=400&fit=crop' },
  { id: 6, brand: 'FitLife', name: 'Yoga Mat Pro', rating: 4.6, reviews: '923', price: '39.99', oldPrice: '59.99', discount: '-33%', stock: null, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cfecb7?w=500&h=400&fit=crop' },
  { id: 7, brand: 'GameGear', name: 'Wireless Gaming Mouse', rating: 4.5, reviews: '445', price: '59.99', oldPrice: null, discount: null, stock: null, image: 'https://images.unsplash.com/photo-1527814050087-379381547996?w=500&h=400&fit=crop' },
  { id: 8, brand: 'GlowEssence', name: 'Luxury Skincare Set', rating: 4.7, reviews: '734', price: '129.99', oldPrice: '179.99', discount: '-28%', stock: null, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop' }
];

const ProductCardItem = ({ product }) => (
  <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden group hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">
    <div className="relative aspect-square bg-gray-50 overflow-hidden">
      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
      {product.discount && (
        <span className="absolute top-2.5 left-2.5 bg-[#ff4757] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          {product.discount}
        </span>
      )}
      <button className="absolute top-2.5 right-2.5 bg-white p-1.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10 hover:scale-110 active:scale-95">
        <Heart className="w-3.5 h-3.5" />
      </button>
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-1">{product.brand}</p>
      <h3 className="text-xs sm:text-[13px] font-bold text-[#1f2937] mb-1.5 leading-snug line-clamp-2 min-h-[34px] sm:min-h-[38px]">{product.name}</h3>
      <div className="flex items-center gap-1 mb-2">
        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
        <span className="text-[11px] sm:text-[12px] font-bold text-gray-700">{product.rating}</span>
        <span className="text-[10px] sm:text-[11px] text-gray-400">({product.reviews})</span>
      </div>
      <div className="mt-auto flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[14px] sm:text-[15px] font-extrabold text-[#4f46e5]">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>
        <div className="h-4 sm:h-5 mt-0.5">
          {product.stock && (
            <span className="text-[10px] sm:text-[11px] font-medium text-[#ff7675]">{product.stock}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function RecommendedProducts() {
  return (
    <section className="w-full mt-4 sm:mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[12px] bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
          <Star className="w-5 h-5 text-indigo-500 fill-indigo-500" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1f2937]">Recommended for You</h2>
          <p className="text-xs sm:text-sm text-gray-500">Picked just for you</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {products.map((p) => (
          <ProductCardItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
