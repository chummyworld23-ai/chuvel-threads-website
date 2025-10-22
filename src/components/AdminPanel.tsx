import { useState, useEffect } from 'react'
import { 
  X,
  Image as ImageIcon,
  Package,
  Users,
  Star,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle } from './ui/card' 
import { Badge } from './ui/badge'
import { toast } from "sonner"

// --- Admin Panel Components ---
import { ProductsManagement } from './ProductsManagement' 
// Add this if you haven't yet, but only once:
// import { OrdersManagement } from './OrdersManagement' 

// --- Utilities (Ensure these are NOT duplicated) ---
import { ImageWithFallback } from './figma/ImageWithFallback'
import { userService } from '../lib/supabaseService'

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  // 1. RETAINED: Active tab is the only remaining state for navigation
  const [activeTab, setActiveTab] = useState('products')
  
  // 2. RETAINED: Customer/User Management States
  const [customers, setCustomers] = useState<any[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([])
  const [customerSearchQuery, setCustomerSearchQuery] = useState('')
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false)

  // 3. RETAINED: Content Management States
  const [contentSections, setContentSections] = useState({
    hero: {
      title: 'TRADITION MEETS INNOVATION',
      subtitle: 'Experience the perfect fusion of Nigerian heritage and contemporary design',
      image: 'https://images.unsplash.com/photo-1756485161657-e005fc9e4393',
      buttonText: 'Explore o'
    },
    collections: {
      title: 'EXPLORE OUR CATALOGUE',
      subtitle: 'From traditional Nigerian wear to modern streetwear',
      categories: [
        { name: 'Senators', description: 'Premium traditional wear' },
        { name: 'Agbada', description: 'Luxury flowing robes' },
        { name: 'Streetwear', description: 'Modern urban fashion' }
      ]
    }
  })

  // 4. RETAINED: Dashboard Stats States
  const [stats] = useState({
    totalProducts: 156,
    totalOrders: 1248,
    totalCustomers: 892,
    monthlyRevenue: 2850000
  })

  // 5. RETAINED: Reviews States
  const [reviews, setReviews] = useState([
    // ... your review data ...
  ])

  // 6. RETAINED: Hero Image States
  const [heroImages, setHeroImages] = useState([
    // ... your hero image data ...
  ])

  // RETAINED: useEffects and Handlers (loadCustomers, formatDate, calculateAge, handleHeroImageUpload, handleSetActiveHero, handleReviewStatusChange, handleDeleteReview)

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

  // DELETED: handleSaveProduct, handleDeleteProduct, handleEditProduct, resetForm, handleImageUpload
  // These functions are moving to ProductsManagement.tsx

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>, heroId: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to Supabase Storage
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
                  {/* ... dashboard cards ... */}
                  {/* ... (Your existing dashboard code remains here) ... */}
                  <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
                     {/* Card Content for Total Products */}
                  </Card>
                  <Card className="border-0 bg-gradient-to-br from-secondary/10 to-secondary/5">
                     {/* Card Content for Total Orders */}
                  </Card>
                  <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5">
                     {/* Card Content for Customers */}
                  </Card>
                  <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                     {/* Card Content for Revenue */}
                  </Card>
                </div>
              </div>
            )}

            {/* Products Management (NEW INTEGRATION) */}
            {activeTab === 'products' && (
              <ProductsManagement /> 
            )}

            {/* Content Management */}
            {activeTab === 'content' && (
              <div className="p-6">
                {/* ... (Your existing content management code remains here) ... */}
              </div>
            )}

            {/* Reviews Management */}
            {activeTab === 'reviews' && (
              <div className="p-6">
                {/* ... (Your existing reviews management code remains here) ... */}
                <h3 className="text-2xl mb-6">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-primary/20">
                      <CardContent className="p-6">
                         {/* ... review content ... */}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
           {/* Customers Management */}
            {activeTab === 'customers' && (
                <div className="p-6">
                    <h3 className="text-2xl mb-6">Customers</h3>
                    {/* ... (Your existing customers management code remains here) ... */}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}