import { useState } from 'react'
import { Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { authService } from '../lib/supabaseService'
import { toast } from "sonner"
import yourLogo from '../assets/Logo.png';
interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
  cartCount: number
  currentUser: any
}

export function Header({ currentPage, onNavigate, cartCount, currentUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.signOut()
      toast.success('Logged out successfully')
      onNavigate('home')
    } catch (error) {
      toast.error((error as any)?.message || 'Logout failed')
    }
  }

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Senators', id: 'senators' },
    { name: 'Agbada', id: 'agbada' },
    { name: 'Shirts', id: 'shirts' },
    { name: 'Streetwear', id: 'streetwear' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  // Check if current user is admin
  const isAdmin = currentUser?.email === 'emmanuelchukwuemeka275@gmail.com'

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            <img 
    src={yourLogo} 
    alt="Chuvel Threads Logo" 
    className="h-12" /* You can adjust this size */
  />
</button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-sm transition-colors hover:text-primary ${
                  currentPage === item.id ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {item.name}
                {currentPage === item.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`relative text-sm transition-colors hover:text-secondary ${
                  currentPage === 'admin' ? 'text-secondary' : 'text-foreground/80'
                }`}
              >
                Admin
                {currentPage === 'admin' && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('cart')}
              className="relative hover:bg-primary/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-xs flex items-center justify-center text-white">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Auth Section */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                {/* User Info - Desktop */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-foreground">
                      {currentUser.displayName || currentUser.email}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="hover:bg-primary/10"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>

                {/* User - Mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="sm:hidden hover:bg-primary/10"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                {/* Auth Buttons - Desktop */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('login')}
                    className="hover:bg-primary/10"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onNavigate('signup')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Sign Up
                  </Button>
                </div>

                {/* User - Mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate('login')}
                  className="sm:hidden hover:bg-primary/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-primary/20">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-card border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary/20">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/80 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    onNavigate('admin')
                    setIsMenuOpen(false)
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'admin' 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'text-foreground/80 hover:bg-secondary/5 hover:text-secondary'
                  }`}
                >
                  Admin Panel
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}