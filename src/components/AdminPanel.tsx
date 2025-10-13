import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Save, 
  X, 
  Image as ImageIcon,
  Package,
  Users,
  User,
  ShoppingCart,
  TrendingUp,
  Star,
  Check,
  Clock,
  Eye,
  Search
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { toast } from "sonner@2.0.3"
import { ImageWithFallback } from './figma/ImageWithFallback'
import { userService } from '../lib/supabaseService'

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('products')
  const [customers, setCustomers] = useState<any[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([])
  const [customerSearchQuery, setCustomerSearchQuery] = useState('')
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Royal Senator Classic',
      price: 45000,
      originalPrice: 55000,
      category: 'senators',
      description: 'Premium quality senator made with finest materials',
      image: 'https://images.unsplash.com/photo-1579710754366-bb9665344096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHNlbmF0b3IlMjBzaGlydCUyMGFnYmFkYSUyMGZhc2hpb258ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: 'Premium Agbada Deluxe',
      price: 85000,
      originalPrice: 95000,
      category: 'agbada',
      description: 'Luxury flowing agbada with intricate embroidery',
      image: 'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzU5NjA0Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      inStock: true,
      featured: true
    }
  ])

  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [showProductForm, setShowProductForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    image: '',
    inStock: true,
    featured: false
  })

  const [contentSections, setContentSections] = useState({
    hero: {
      title: 'TRADITION MEETS INNOVATION',
      subtitle: 'Experience the perfect fusion of Nigerian heritage and contemporary design',
      image: 'https://images.unsplash.com/photo-1756485161657-e005fc9e4393',
      buttonText: 'Explore Collection'
    },
    collections: {
      title: 'EXPLORE OUR COLLECTIONS',
      subtitle: 'From traditional Nigerian wear to modern streetwear',
      categories: [
        { name: 'Senators', description: 'Premium traditional wear' },
        { name: 'Agbada', description: 'Luxury flowing robes' },
        { name: 'Streetwear', description: 'Modern urban fashion' }
      ]
    }
  })

  const [stats] = useState({
    totalProducts: 156,
    totalOrders: 1248,
    totalCustomers: 892,
    monthlyRevenue: 2850000
  })

  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      customerName: 'Adebayo Johnson',
      email: 'adebayo@example.com',
      rating: 5,
      comment: 'Excellent quality senator! Perfect fit and beautiful embroidery.',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: 2,
      productId: 2,
      customerName: 'Fatima Ibrahim',
      email: 'fatima@example.com',
      rating: 4,
      comment: 'Beautiful agbada, delivery was fast. Highly recommend!',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      productId: 1,
      customerName: 'Chinedu Okafor',
      email: 'chinedu@example.com',
      rating: 3,
      comment: 'Good quality but sizing runs a bit large.',
      date: '2024-01-13',
      status: 'approved'
    }
  ])

  const [heroImages, setHeroImages] = useState([
    {
      id: 1,
      title: 'Main Hero',
      url: 'https://images.unsplash.com/photo-1756485161657-e005fc9e4393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGZhc2hpb24lMjBtb2RlbCUyMGFnYmFkYSUyMHNlbmF0b3J8ZW58MXx8fHwxNzU5NjA0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      active: true
    },
    {
      id: 2,
      title: 'Secondary Hero',
      url: 'https://images.unsplash.com/photo-1679501442892-d95a6e4c8f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc1OTYwNDI4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      active: false
    }
  ])

  // Load customers when customers tab is active
  useEffect(() => {
    if (activeTab === 'customers') {
      loadCustomers()
    }
  }, [activeTab])

  // Filter customers based on search query
  useEffect(() => {
    if (customerSearchQuery.trim() === '') {
      setFilteredCustomers(customers)
    } else {
      const query = customerSearchQuery.toLowerCase()
      const filtered = customers.filter(customer => 
        customer.full_name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.date_of_birth.includes(query)
      )
      setFilteredCustomers(filtered)
    }
  }, [customerSearchQuery, customers])

  const loadCustomers = async () => {
    setIsLoadingCustomers(true)
    try {
      const users = await userService.getAllUsers()
      // Sort by date of birth (ascending - oldest first)
      const sortedUsers = users.sort((a, b) => {
        return new Date(a.date_of_birth).getTime() - new Date(b.date_of_birth).getTime()
      })
      setCustomers(sortedUsers)
      setFilteredCustomers(sortedUsers)
    } catch (error: any) {
      console.error('Error loading customers:', error)
      toast.error('Failed to load customers')
    } finally {
      setIsLoadingCustomers(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              ...formData, 
              price: Number(formData.price),
              originalPrice: Number(formData.originalPrice)
            }
          : p
      ))
      toast.success('Product updated successfully!')
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice)
      }
      setProducts([...products, newProduct])
      toast.success('Product added successfully!')
    }
    
    resetForm()
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success('Product deleted successfully!')
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      featured: product.featured
    })
    setShowProductForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      image: '',
      inStock: true,
      featured: false
    })
    setEditingProduct(null)
    setShowProductForm(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to Supabase Storage
      const mockUrl = URL.createObjectURL(file)
      setFormData({ ...formData, image: mockUrl })
      toast.success('Image uploaded successfully!')
    }
  }

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>, heroId: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const mockUrl = URL.createObjectURL(file)
      setHeroImages(heroImages.map(img => 
        img.id === heroId ? { ...img, url: mockUrl } : img
      ))
      toast.success('Hero image updated successfully!')
    }
  }

  const handleSetActiveHero = (heroId: number) => {
    setHeroImages(heroImages.map(img => 
      ({ ...img, active: img.id === heroId })
    ))
    toast.success('Active hero image updated!')
  }

  const handleReviewStatusChange = (reviewId: number, status: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status } : review
    ))
    toast.success(`Review ${status}!`)
  }

  const handleDeleteReview = (reviewId: number) => {
    setReviews(reviews.filter(review => review.id !== reviewId))
    toast.success('Review deleted!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-card rounded-2xl border border-primary/20 overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-card/50 border-r border-primary/20 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl text-primary">Admin Panel</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="space-y-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'products' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('products')}
              >
                <Package className="h-4 w-4 mr-2" />
                Products
              </Button>
              <Button
                variant={activeTab === 'content' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('content')}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Content
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders
              </Button>
              <Button
                variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('reviews')}
              >
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </Button>
              <Button
                variant={activeTab === 'customers' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('customers')}
              >
                <Users className="h-4 w-4 mr-2" />
                Customers
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="p-6">
                <h3 className="text-2xl mb-6">Dashboard Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">Total Products</p>
                          <p className="text-2xl text-primary">{stats.totalProducts}</p>
                        </div>
                        <Package className="h-8 w-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">Total Orders</p>
                          <p className="text-2xl text-secondary">{stats.totalOrders}</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-secondary/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">Customers</p>
                          <p className="text-2xl text-green-500">{stats.totalCustomers}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-500/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">Revenue</p>
                          <p className="text-2xl text-blue-500">₦{stats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-500/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === 'products' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Products Management</h3>
                  <Button 
                    onClick={() => setShowProductForm(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                {showProductForm && (
                  <Card className="mb-6 border-primary/20">
                    <CardHeader>
                      <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-background border-primary/20"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                            <SelectTrigger className="bg-background border-primary/20">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="senators">Senators</SelectItem>
                              <SelectItem value="agbada">Agbada</SelectItem>
                              <SelectItem value="shirts">Shirts</SelectItem>
                              <SelectItem value="streetwear">Streetwear</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="price">Price (₦)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="bg-background border-primary/20"
                          />
                        </div>

                        <div>
                          <Label htmlFor="originalPrice">Original Price (₦)</Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            value={formData.originalPrice}
                            onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                            className="bg-background border-primary/20"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="bg-background border-primary/20"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="image">Product Image</Label>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="bg-background border-primary/20"
                          />
                          {formData.image && (
                            <ImageWithFallback
                              src={formData.image}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                          />
                          <span className="text-sm">In Stock</span>
                        </label>
                        
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                          />
                          <span className="text-sm">Featured</span>
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSaveProduct} className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Save className="h-4 w-4 mr-2" />
                          {editingProduct ? 'Update' : 'Save'} Product
                        </Button>
                        <Button variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="border-primary/20">
                      <div className="relative">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {product.featured && (
                          <Badge className="absolute top-2 right-2 bg-secondary">Featured</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h4 className="text-lg mb-2">{product.name}</h4>
                        <p className="text-sm text-foreground/60 mb-2">{product.description}</p>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg text-primary">₦{product.price.toLocaleString()}</span>
                          <span className="text-sm text-foreground/60 line-through">₦{product.originalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Content Management */}
            {activeTab === 'content' && (
              <div className="p-6">
                <h3 className="text-2xl mb-6">Content Management</h3>
                
                <div className="space-y-6">
                  {/* Hero Images Management */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Hero Section Images</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {heroImages.map((heroImg) => (
                          <div key={heroImg.id} className="relative">
                            <div className="relative h-48 rounded-lg overflow-hidden border border-primary/20">
                              <ImageWithFallback
                                src={heroImg.url}
                                alt={heroImg.title}
                                className="w-full h-full object-cover"
                              />
                              {heroImg.active && (
                                <Badge className="absolute top-2 right-2 bg-green-500">
                                  Active
                                </Badge>
                              )}
                            </div>
                            
                            <div className="mt-3 space-y-2">
                              <h4 className="text-sm">{heroImg.title}</h4>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => document.getElementById(`hero-upload-${heroImg.id}`)?.click()}
                                  className="flex-1"
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  Change
                                </Button>
                                <Button
                                  size="sm"
                                  variant={heroImg.active ? "default" : "outline"}
                                  onClick={() => handleSetActiveHero(heroImg.id)}
                                  disabled={heroImg.active}
                                >
                                  {heroImg.active ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                              <input
                                id={`hero-upload-${heroImg.id}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleHeroImageUpload(e, heroImg.id)}
                                className="hidden"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hero Text Content */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Hero Section Text</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Hero Title</Label>
                        <Input
                          value={contentSections.hero.title}
                          onChange={(e) => setContentSections({
                            ...contentSections,
                            hero: { ...contentSections.hero, title: e.target.value }
                          })}
                          className="bg-background border-primary/20"
                        />
                      </div>
                      <div>
                        <Label>Hero Subtitle</Label>
                        <Textarea
                          value={contentSections.hero.subtitle}
                          onChange={(e) => setContentSections({
                            ...contentSections,
                            hero: { ...contentSections.hero, subtitle: e.target.value }
                          })}
                          className="bg-background border-primary/20"
                        />
                      </div>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>Collections Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Section Title</Label>
                        <Input
                          value={contentSections.collections.title}
                          onChange={(e) => setContentSections({
                            ...contentSections,
                            collections: { ...contentSections.collections, title: e.target.value }
                          })}
                          className="bg-background border-primary/20"
                        />
                      </div>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Reviews Management */}
            {activeTab === 'reviews' && (
              <div className="p-6">
                <h3 className="text-2xl mb-6">Customer Reviews</h3>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg">{review.customerName}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < review.rating 
                                        ? 'fill-primary text-primary' 
                                        : 'text-foreground/30'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <Badge 
                                variant={review.status === 'approved' ? 'default' : 'secondary'}
                                className={
                                  review.status === 'approved' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : review.status === 'pending'
                                    ? 'bg-yellow-500/20 text-yellow-500'
                                    : 'bg-red-500/20 text-red-500'
                                }
                              >
                                {review.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                {review.status === 'approved' && <Check className="h-3 w-3 mr-1" />}
                                {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground/60 mb-2">{review.email}</p>
                            <p className="text-foreground/80 mb-3">"{review.comment}"</p>
                            <p className="text-xs text-foreground/50">{review.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {review.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleReviewStatusChange(review.id, 'approved')}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          {review.status === 'approved' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReviewStatusChange(review.id, 'pending')}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Set Pending
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Customers Management */}
            {activeTab === 'customers' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Customers Management</h3>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Users className="h-4 w-4" />
                    <span>{filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Search Bar */}
                <Card className="mb-6 border-primary/20">
                  <CardContent className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
                      <Input
                        placeholder="Search by name, email, phone, or date of birth..."
                        value={customerSearchQuery}
                        onChange={(e) => setCustomerSearchQuery(e.target.value)}
                        className="pl-10 bg-background border-primary/20"
                      />
                    </div>
                    {customerSearchQuery && (
                      <div className="mt-2 text-sm text-foreground/60">
                        Found {filteredCustomers.length} result{filteredCustomers.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Customers List */}
                {isLoadingCustomers ? (
                  <Card className="border-primary/20">
                    <CardContent className="p-8 text-center">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-foreground/60">Loading customers...</p>
                    </CardContent>
                  </Card>
                ) : filteredCustomers.length === 0 ? (
                  <Card className="border-primary/20">
                    <CardContent className="p-8 text-center">
                      <Users className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                      <p className="text-foreground/60">
                        {customerSearchQuery ? 'No customers found matching your search.' : 'No customers yet.'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredCustomers.map((customer) => (
                      <Card key={customer.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                              {/* Name */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <User className="h-4 w-4 text-primary" />
                                  <span className="text-xs text-foreground/60">Name</span>
                                </div>
                                <p className="text-foreground">{customer.full_name}</p>
                              </div>

                              {/* Email */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-foreground/60">Email</span>
                                </div>
                                <p className="text-sm text-foreground/80 break-all">{customer.email}</p>
                              </div>

                              {/* Phone */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-foreground/60">Phone</span>
                                </div>
                                <p className="text-sm text-foreground/80">{customer.phone || 'N/A'}</p>
                              </div>

                              {/* Date of Birth & Age */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-foreground/60">Date of Birth</span>
                                </div>
                                <p className="text-sm text-foreground/80">{formatDate(customer.date_of_birth)}</p>
                                <p className="text-xs text-foreground/60 mt-1">Age: {calculateAge(customer.date_of_birth)} years</p>
                              </div>
                            </div>

                            {/* Additional Info Badge */}
                            <Badge className="bg-primary/10 text-primary ml-4">
                              Customer
                            </Badge>
                          </div>

                          {/* Joined Date */}
                          <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between text-xs text-foreground/50">
                            <span>Joined: {formatDate(customer.created_at)}</span>
                            <span>ID: {customer.id.substring(0, 8)}...</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Management - Placeholder */}
            {activeTab === 'orders' && (
              <div className="p-6">
                <h3 className="text-2xl mb-6">Orders Management</h3>
                <Card className="border-primary/20">
                  <CardContent className="p-8 text-center">
                    <p className="text-foreground/60">
                      Orders management coming soon...
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}