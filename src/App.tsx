import "./App.css";
import './styles/index.css';
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ShopPage } from "./components/ShopPage";
import { CartPage } from "./components/CartPage";
import { AuthModals } from "./components/AuthModals";
import { AdminPanel } from "./components/AdminPanel";
import { ChatIntegrations } from "./components/ChatIntegrations";
import { authService } from "./lib/supabaseService";
import { toast } from "sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // ✅ FIXED useEffect HOOK (Solves the session persistence and 'subscription' TypeError)
  useEffect(() => {
    // Capture the entire result object, which should contain { data: { subscription } }
    const listenerResult = authService.onAuthStateChange((event, session) => {
      
      // Session Handling Logic
      if (session) {
        setCurrentUser(session.user);
        setIsLoginOpen(false);
        setIsSignupOpen(false);
        
        // CRITICAL: Clear URL fragments after OAuth login to prevent session loss on refresh
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      } else {
        // User signed out or no session found
        setCurrentUser(null);
      }
    });

    // The cleanup function
    return () => {
      // Safely access the subscription property before calling unsubscribe
      if (listenerResult?.data?.subscription) {
        listenerResult.data.subscription.unsubscribe();
      }
    };
  }, []);

  const handleNavigate = (page: string) => {
    if (page === "login") {
      setIsLoginOpen(true);
      return;
    }
    if (page === "signup") {
      setIsSignupOpen(true);
      return;
    }
    if (page === "admin") {
      setIsAdminOpen(true);
      return;
    }
    setCurrentPage(page);
  };
  
  // ⬅️ ERROR WAS HERE! This is where the App function definition was prematurely closed.

  const handleAddToCart = (product: any) => {
    if (!currentUser) {
      toast.error("Please sign up or login to add items to cart");
      setIsSignupOpen(true);
      return;
    }

    const cartItem = {
      ...product,
      quantity: 1,
      selectedSize: "M",
      selectedColor: product.colors?.[0] || "Default",
    };

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === cartItem.selectedSize &&
        item.selectedColor === cartItem.selectedColor
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === existingItem.id &&
          item.selectedSize === existingItem.selectedSize &&
          item.selectedColor === existingItem.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, cartItem]);
    }

    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
          />
        );
      case "shop":
      case "senators":
      case "agbada":
      case "shirts":
      case "streetwear":
        return (
          <ShopPage
            category={currentPage}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
          />
        );
      case "cart":
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        );
      case "about":
        return (
          <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
              {/* About Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl mb-6">About Chuvel Threads</h1>
                <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                  Where Nigerian heritage meets contemporary design, creating
                  fashion that honors tradition while embracing the future.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-2xl mb-4 text-primary">Our Story</h2>
                  <p className="text-foreground/80 mb-4">
                    Founded in 2020, Chuvel Threads emerged from a passion to
                    celebrate Nigerian fashion heritage while creating
                    contemporary pieces for the modern African man and woman.
                  </p>
                  <p className="text-foreground/80 mb-4">
                    Our name "Chuvel" represents the fusion of tradition and
                    innovation - taking the timeless elegance of garments like
                    the Senator and Agbada and reimagining them for today's
                    fashion-forward individuals.
                  </p>
                </div>
                <div className="h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-foreground/60">
                    <p>Our Craftsmanship</p>
                    <p className="text-sm">Image Placeholder</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded"></div>
                  </div>
                  <h3 className="text-lg mb-2">Premium Quality</h3>
                  <p className="text-sm text-foreground/70">
                    Hand-selected fabrics and meticulous attention to detail in
                    every piece.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded"></div>
                  </div>
                  <h3 className="text-lg mb-2">Cultural Heritage</h3>
                  <p className="text-sm text-foreground/70">
                    Honoring Nigerian traditions while creating modern
                    masterpieces.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded"></div>
                  </div>
                  <h3 className="text-lg mb-2">Innovation</h3>
                  <p className="text-sm text-foreground/70">
                    Cutting-edge design meets traditional craftsmanship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
              {/* Contact Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl mb-6">Get In Touch</h1>
                <p className="text-xl text-foreground/70">
                  We'd love to hear from you. Send us a message and we'll respond
                  as soon as possible.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg text-primary mb-1">WhatsApp</h3>
                      <p className="text-foreground/70">+234 (0) 703 260 3312</p>
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Email</h3>
                      <p className="text-foreground/70">hello@chuvelthreads.com</p>
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Store Location</h3>
                      <p className="text-foreground/70">
                        Victoria Island, Lagos
                        <br />
                        Nigeria
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg text-primary mb-1">Business Hours</h3>
                      <p className="text-foreground/70">
                        Monday - Saturday: 9:00 AM - 7:00 PM
                        <br />
                        Sunday: 12:00 PM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-lg">
                  <h2 className="text-2xl mb-6">Send us a Message</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:outline-none focus:border-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:outline-none focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:outline-none focus:border-primary"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-primary/20 focus:outline-none focus:border-primary resize-none"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        currentUser={currentUser}
      />
      {renderPage()}

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseSignup={() => setIsSignupOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoginOpen(false);
          setIsSignupOpen(false);
        }}
      />

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}

      <ChatIntegrations />
    </div>
  );
}