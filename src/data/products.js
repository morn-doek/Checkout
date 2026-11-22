export const initialCategories = [
  { id: 1, name: "Laptops", fullName: "Laptops & Computers" },
  { id: 2, name: "Accessories", fullName: "Accessories & Peripherals" }
];

export const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    category: "Laptops",
    categoryFullName: "Laptops & Computers",
    categoryId: 1,
    price: 650,
    rating: 4.8,
    reviews: 124,
    description: "High-performance laptop featuring a high-resolution display, fast processor, and all-day battery life.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    fallbackIcon: "laptop",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Mouse",
    category: "Accessories",
    categoryFullName: "Accessories & Peripherals",
    categoryId: 2,
    price: 15,
    rating: 4.6,
    reviews: 89,
    description: "Ergonomic wireless optical mouse with precision sensor and quiet click switches.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    fallbackIcon: "mouse",
    badge: "Popular"
  },
  {
    id: 3,
    name: "Keyboard",
    category: "Accessories",
    categoryFullName: "Accessories & Peripherals",
    categoryId: 2,
    price: 25,
    rating: 4.7,
    reviews: 142,
    description: "Tactile mechanical-feel keyboard with customizable LED backlighting and durable keycaps.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    fallbackIcon: "keyboard",
    badge: "Trending"
  },
  {
    id: 4,
    name: "Monitor",
    category: "Accessories",
    categoryFullName: "Accessories & Peripherals",
    categoryId: 2,
    price: 120,
    rating: 4.9,
    reviews: 95,
    description: "24-inch Full HD borderless display with 100Hz refresh rate and eye-care blue light filter.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    fallbackIcon: "monitor",
    badge: "Top Rated"
  }
];
