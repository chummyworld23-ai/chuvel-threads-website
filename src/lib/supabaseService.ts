import { supabase } from './supabase'
import type { Database } from './supabase'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']
type User = Database['public']['Tables']['users']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type OrderInsert = Database['public']['Tables']['orders']['Insert']
type Content = Database['public']['Tables']['content']['Row']
type ContentInsert = Database['public']['Tables']['content']['Insert']

// Authentication
export const authService = {
  async signUp(email: string, password: string, fullName: string, dateOfBirth: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth
        }
      }
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          date_of_birth: dateOfBirth,
          role: 'user'
        })

      if (profileError) throw profileError
    }

    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async getUserProfile(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async updateUserProfile(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  onAuthStateChange(callback: (user: any) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      let user = null
      if (session?.user) {
        // Get user profile data
        try {
          const profile = await this.getUserProfile(session.user.id)
          user = {
            ...session.user,
            profile
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          user = session.user
        }
      }
      callback(user)
    })

    return () => subscription.unsubscribe()
  }
}

// Products
export const productService = {
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createProduct(product: ProductInsert) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateProduct(id: string, updates: ProductUpdate) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Orders
export const orderService = {
  async createOrder(order: OrderInsert, items: Array<{ product_id: string; quantity: number; price: number }>) {
    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map(item => ({
      order_id: orderData.id,
      ...item
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return orderData
  },

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (email, full_name),
        order_items (
          *,
          products (name, image_url)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async updateOrderStatus(id: string, status: Order['status'], paymentStatus?: Order['payment_status']) {
    const updates: any = { 
      status, 
      updated_at: new Date().toISOString() 
    }
    
    if (paymentStatus) {
      updates.payment_status = paymentStatus
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Content Management
export const contentService = {
  async getContent(type: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createContent(content: ContentInsert) {
    const { data, error } = await supabase
      .from('content')
      .insert(content)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateContent(id: string, updates: Partial<Content>) {
    const { data, error } = await supabase
      .from('content')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteContent(id: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Storage
export const storageService = {
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('products')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  },

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('products')
      .remove([path])

    if (error) throw error
  }
}

// Analytics and Stats
export const analyticsService = {
  async getDashboardStats() {
    const [productsResult, ordersResult, usersResult] = await Promise.allSettled([
      supabase.from('products').select('id').eq('in_stock', true),
      supabase.from('orders').select('id, total_amount, status'),
      supabase.from('users').select('id').eq('role', 'user')
    ])

    const totalProducts = productsResult.status === 'fulfilled' ? productsResult.value.data?.length || 0 : 0
    const totalUsers = usersResult.status === 'fulfilled' ? usersResult.value.data?.length || 0 : 0

    let totalOrders = 0
    let totalRevenue = 0
    if (ordersResult.status === 'fulfilled' && ordersResult.value.data) {
      totalOrders = ordersResult.value.data.length
      totalRevenue = ordersResult.value.data
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + order.total_amount, 0)
    }

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue
    }
  }
}