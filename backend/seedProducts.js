import dotenv from 'dotenv';
import Product from './models/Product.model.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
  // Men's Collection
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton white t-shirt with a comfortable fit. Perfect for casual wear.",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    featured: true
  },
  {
    name: "Black Denim Jeans",
    description: "Slim fit black denim jeans with stretch fabric for comfort.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 40,
    featured: false
  },
  {
    name: "Navy Blue Hoodie",
    description: "Warm and cozy hoodie with kangaroo pocket. Perfect for winter.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    featured: true
  },
  {
    name: "Leather Jacket",
    description: "Premium leather jacket with zipper closure. Classic biker style.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
    featured: true
  },
  {
    name: "Striped Polo Shirt",
    description: "Casual striped polo shirt with collar. Great for semi-formal occasions.",
    price: 899,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    featured: false
  },
  {
    name: "Cargo Pants",
    description: "Comfortable cargo pants with multiple pockets. Durable fabric.",
    price: 1699,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 30,
    featured: false
  },

  // Women's Collection
  {
    name: "Floral Summer Dress",
    description: "Beautiful floral print summer dress. Light and breezy fabric.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 25,
    featured: true
  },
  {
    name: "Black Skinny Jeans",
    description: "High-waisted black skinny jeans with stretch. Flattering fit.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    category: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 40,
    featured: false
  },
  {
    name: "Silk Blouse",
    description: "Elegant silk blouse perfect for office wear. Available in multiple colors.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    featured: true
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with button closure. Versatile and stylish.",
    price: 2299,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 28,
    featured: false
  },
  {
    name: "Yoga Pants",
    description: "Comfortable yoga pants with high waist. Perfect for workouts.",
    price: 999,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    category: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 50,
    featured: false
  },
  {
    name: "Evening Gown",
    description: "Elegant evening gown for special occasions. Stunning design.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
    featured: true
  },
  {
    name: "Casual T-Shirt Dress",
    description: "Comfortable t-shirt dress for everyday wear. Soft cotton fabric.",
    price: 799,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    featured: false
  },

  // Kids Collection
  {
    name: "Kids Graphic T-Shirt",
    description: "Fun graphic t-shirt for kids. Comfortable and colorful.",
    price: 399,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 60,
    featured: false
  },
  {
    name: "Kids Denim Shorts",
    description: "Comfortable denim shorts for active kids. Durable material.",
    price: 699,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 45,
    featured: false
  },
  {
    name: "Kids Hoodie",
    description: "Warm and cozy hoodie for kids. Perfect for school.",
    price: 899,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 40,
    featured: true
  },
  {
    name: "Kids Party Dress",
    description: "Beautiful party dress for special occasions. Adorable design.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    category: "Kids",
    sizes: ["XS", "S", "M"],
    stock: 25,
    featured: false
  },

  // Unisex Collection
  {
    name: "Unisex Windbreaker",
    description: "Lightweight windbreaker jacket. Water-resistant and breathable.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 35,
    featured: true
  },
  {
    name: "Unisex Sweatpants",
    description: "Comfortable sweatpants for lounging. Soft fleece interior.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    featured: false
  },
  {
    name: "Unisex Baseball Cap",
    description: "Classic baseball cap with adjustable strap. One size fits all.",
    price: 499,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    category: "Unisex",
    sizes: ["M", "L"],
    stock: 100,
    featured: false
  },
  {
    name: "Unisex Backpack",
    description: "Durable backpack with multiple compartments. Perfect for daily use.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Unisex",
    sizes: ["M", "L"],
    stock: 40,
    featured: true
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Products deleted');

    // Insert new products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();