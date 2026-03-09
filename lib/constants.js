// Color Constants
export const colors = {
  primary: '#4f47e5',
  secondary: '#17b8a7',
  background: '#ffffff',
  foreground: '#1a1a1a',
  muted: '#f5f5f5',
  mutedForeground: '#666666',
  border: '#e5e5e5',
};

// Navigation Links
export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/#products' },
  { name: 'Categories', href: '/#categories' },
];

// Categories
export const categories = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Home',
  'Sports',
  'All Products',
];

// Sample product data structure
export const productExample = {
  id: 1,
  name: 'Product Name',
  category: 'Electronics',
  price: 149.99,
  originalPrice: 199.99,
  rating: 4.5,
  reviews: 324,
  image: 'https://images.unsplash.com/...',
  description: 'Product description here',
  featured: true,
};

// API Endpoints (for future implementation)
export const apiEndpoints = {
  products: '/api/products',
  search: '/api/search',
  cart: '/api/cart',
  orders: '/api/orders',
  auth: '/api/auth',
};

// Animation Durations
export const animationDurations = {
  short: 300,
  medium: 500,
  long: 800,
  slider: 5000, // Banner auto-play
};

// Discount Levels
export const discountLevels = {
  low: { min: 1, max: 10 },
  medium: { min: 11, max: 30 },
  high: { min: 31, max: 100 },
};

// Rating Stars
export const ratingStars = {
  excellent: 5,
  good: 4,
  average: 3,
  poor: 2,
  terrible: 1,
};
