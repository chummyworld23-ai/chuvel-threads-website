// src/components/Header.tsx

import { useState } from 'react';
import { Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { authService } from '../lib/supabaseService';
import { toast } from 'sonner';
import yourLogo from '../assets/Logo.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  currentUser: any;
}

export function Header({ currentPage, onNavigate, cartCount, currentUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast.success('Logged out successfully');
      onNavigate('home');
    } catch (error) {
      toast.error((error as any)?.message || 'Logout failed');
    }
  };

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Senators', id: 'senators' },
    { name: 'Agbada', id: 'agbada' },
    { name: 'Shirts', id: 'shirts' },
    { name: 'Streetwear', id: 'streetwear' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const isAdmin = currentUser?.email === 'emmanuelchukwuemeka275@gmail.com';

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <button onClick={() => onNavigate('home')}>
            <img src={yourLogo} alt="Chuvel Threads Logo" className="h-12 w-auto md:h-16" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
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
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
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
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-secondary" />
                )}
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => onNavigate('cart')} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-primary/20 py-4">
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60" />
              <Input
                placeholder="Search products..."
                className="border-primary/20 bg-card pl-10 focus:border-primary"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          {/* Drawer Content */}
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2 text-left transition-colors ${
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
                     onNavigate('admin');
                     setIsMenuOpen(false);
                   }}
                   className={`rounded-lg px-4 py-2 text-left transition-colors ${
                    currentPage === 'admin'
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-foreground/80 hover:bg-secondary/5 hover:text-secondary'
                  }`}
                 >
                   Admin Panel
                 </button>
              )}
               <div className="mt-6 border-t border-white/10 pt-6">
                {currentUser ? (
                 <Button onClick={handleLogout} className="w-full">Logout</Button>
                ) : (
                <div className="flex w-full gap-4">
                  <Button onClick={() => onNavigate('login')} className="flex-1">Login</Button>
                  <Button onClick={() => onNavigate('signup')} variant="outline" className="flex-1">Sign Up</Button></div>
                 )}
                 </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}