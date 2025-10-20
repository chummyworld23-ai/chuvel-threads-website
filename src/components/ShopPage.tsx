import { useState } from 'react'
import { Filter, Grid, List, Star, Heart, ShoppingCart, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ShopPageProps {
  category: string
  onNavigate: (page: string, productId?: number) => void
  onAddToCart: (product: any) => void
  currentUser: any
}

export function ShopPage({ category, onNavigate, onAddToCart, currentUser }: ShopPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')

  const products = [
    {
      id: 1,
      name: 'Royal Senator Classic',
      price: 45000,
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1579710754366-bb9665344096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHNlbmF0b3IlMjBzaGlydCUyMGFnYmFkYSUyMGZhc2hpb258ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      reviews: 124,
      category: 'senators',
      colors: ['navy', 'black', 'white'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Premium Agbada Deluxe',
      price: 85000,
      originalPrice: 95000,
      image: 'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzU5NjA0Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      reviews: 89,
      category: 'agbada',
      colors: ['gold', 'cream', 'burgundy'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      badge: 'New'
    },
    {
      id: 3,
      name: 'Urban Street Collection',
      price: 25000,
      originalPrice: 30000,
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk1NjQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      reviews: 156,
      category: 'streetwear',
      colors: ['black', 'white', 'grey'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      badge: 'Trending'
    },
    {
      id: 4,
      name: 'Executive Senator Pro',
      price: 52000,
      originalPrice: 65000,
      image: 'https://images.unsplash.com/photo-1579710754366-bb9665344096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHNlbmF0b3IlMjBzaGlydCUyMGFnYmFkYSUyMGZhc2hpb258ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.6,
      reviews: 98,
      category: 'senators',
      colors: ['navy', 'charcoal', 'burgundy'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      badge: null
    },
    {
      id: 5,
      name: 'Traditional Agbada Royal',
      price: 95000,
      originalPrice: 110000,
      image: 'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzU5NjA0Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5.0,
      reviews: 67,
      category: 'agbada',
      colors: ['white', 'cream', 'gold'],
      sizes: ['L', 'XL', 'XXL'],
      badge: 'Premium'
    },
    {
      id: 6,
      name: 'Modern Casual Shirt',
      price: 18000,
      originalPrice: 22000,
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk1NjQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.4,
      reviews: 203,
      category: 'shirts',
      colors: ['white', 'blue', 'grey'],
      sizes: ['S', 'M', 'L', 'XL'],
      badge: null
    }
  ]

  const filteredProducts = products.filter(product => {
    if (category !== 'shop' && product.category !== category) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) return false
    if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'black', class: 'bg-black' },
    { name: 'white', class: 'bg-white border' },
    { name: 'navy', class: 'bg-blue-900' },
    { name: 'grey', class: 'bg-gray-500' },
    { name: 'gold', class: 'bg-yellow-500' },
    { name: 'cream', class: 'bg-amber-100 border' },
    { name: 'burgundy', class: 'bg-red-900' },
    { name: 'charcoal', class: 'bg-gray-700' },
    { name: 'blue', class: 'bg-blue-500' }
  ]

  const categoryTitles = {
    shop: 'All Products',
    senators: 'Senator Collection',
    agbada: 'Agbada Collection',
    shirts: 'Shirt Collection',
    streetwear: 'Streetwear Collection'
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl mb-2">{categoryTitles[category as keyof typeof categoryTitles]}</h1>
            <p className="text-foreground/70">{sortedProducts.length} products found</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center border border-primary/20 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <Card className="border-0 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={120000}
                    min={0}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>₦{priceRange[0].toLocaleString()}</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <Label className="text-sm mb-3 block">Sizes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSizes([...selectedSizes, size])
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size))
                            }
                          }}
                        />
                        <Label htmlFor={`size-${size}`} className="text-sm">{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <Label className="text-sm mb-3 block">Colors</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          if (selectedColors.includes(color.name)) {
                            setSelectedColors(selectedColors.filter(c => c !== color.name))
                          } else {
                            setSelectedColors([...selectedColors, color.name])
                          }
                        }}
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          selectedColors.includes(color.name) 
                            ? 'ring-2 ring-primary ring-offset-2' 
                            : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-2'
                        } transition-all`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 100000])
                    setSelectedSizes([])
                    setSelectedColors([])
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`group cursor-pointer overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    onClick={() => onNavigate('product', product.id)}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-48 h-48' : 'w-full h-[450px]'
                        }`}
                      />
                      {product.badge && (
                        <Badge className="absolute top-4 left-4 bg-secondary text-white">
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Add to wishlist functionality
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <h3 className="text-lg mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="text-sm text-foreground/60">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg text-primary">₦{product.price.toLocaleString()}</span>
                          <span className="text-sm text-foreground/60 line-through">₦{product.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons - Always shown now */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!currentUser) {
                              toast.error('Please sign up or login to add items to cart')
                              return
                            }
                            onAddToCart(product)
                          }}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!currentUser) {
                              toast.error('Please sign up or login to make a purchase')
                              return
                            }
                            // Handle buy now - could open payment modal
                            toast.success('Redirecting to payment...')
                          }}
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                          size="sm"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-foreground/60 mb-4">No products found with current filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 100000])
                    setSelectedSizes([])
                    setSelectedColors([])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}