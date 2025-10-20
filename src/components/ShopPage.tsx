// src/pages/ShopPage.tsx

import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// 🧵 Example product data (replace this with your real Supabase or JSON data)
const sampleProducts = [
  {
    id: 1,
    name: 'Blue Senator Wear',
    category: 'senators',
    price: 30000,
    colors: ['blue', 'navy'],
    sizes: ['M', 'L', 'XL'],
    image: '/images/senator1.jpg',
    tags: ['traditional', 'nigerian', 'agbada'],
  },
  {
    id: 2,
    name: 'White Agbada with Gold Embroidery',
    category: 'agbada',
    price: 55000,
    colors: ['white', 'gold'],
    sizes: ['L', 'XL'],
    image: '/images/agbada1.jpg',
    tags: ['royal', 'yoruba', 'classic'],
  },
  {
    id: 3,
    name: 'Streetwear Hoodie',
    category: 'streetwear',
    price: 18000,
    colors: ['black', 'red'],
    sizes: ['S', 'M', 'L'],
    image: '/images/streetwear1.jpg',
    tags: ['urban', 'casual', 'modern'],
  },
  // Add more items here...
];

export default function ShopPage({ category = 'shop', onAddToCart }: { category?: string; onAddToCart?: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const products = sampleProducts;

  // 🧠 Fuzzy search setup
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ['name', 'category', 'tags'],
        threshold: 0.4, // lower = stricter, higher = more lenient matches
      }),
    [products]
  );

  // 🔍 Run fuzzy search
  const fuzzyResults = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse]);

  // 🧮 Apply all filters (category, price, size, color)
  const filteredProducts = useMemo(() => {
    return fuzzyResults.filter((product) => {
      if (category !== 'shop' && category !== 'all' && product.category !== category) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedSizes.length > 0 && !product.sizes.some((size) => selectedSizes.includes(size))) return false;
      if (selectedColors.length > 0 && !product.colors.some((color) => selectedColors.includes(color))) return false;
      return true;
    });
  }, [fuzzyResults, category, priceRange, selectedSizes, selectedColors]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔍 Search + Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search for any outfit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 rounded-full border-primary/20 focus:border-primary"
        />

        {/* Example: Price Range (replace with real sliders if you have) */}
        <div className="flex items-center gap-2 text-sm">
          <span>₦{priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span>₦{priceRange[1]}</span>
        </div>
      </div>

      {/* 🛍 Product Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                  <p className="mt-2 font-bold text-primary">₦{product.price.toLocaleString()}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => onAddToCart && onAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-6">
            No exact match found for "{searchQuery}".  
            Here are some related outfits you might like 👇
          </p>

          {/* 🔄 Fallback: show some random products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-3">
                  <h3 className="font-semibold text-base">{product.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
