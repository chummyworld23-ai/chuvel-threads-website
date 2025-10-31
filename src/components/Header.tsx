// src/components/Header.tsx
import { useState } from "react";
import { Menu, ShoppingCart, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import yourLogo from "../assets/Logo.png";
import { supabase } from "../lib/supabase";
import Fuse from "fuse.js"; // 👈 NEW fuzzy search library

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  currentUser: any;
}

export function Header({
  currentPage,
  onNavigate,
  cartCount,
  currentUser,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error((error as any)?.message || "Logout failed");
    }
  };

  // ✅ List of searchable product keywords
  const searchableItems = [
    { id: "senators", name: "Senators", tags: ["native", "men wear", "kaftan"] },
    { id: "agbada", name: "Agbada", tags: ["yoruba", "attire", "ceremonial"] },
    { id: "shirts", name: "Shirts", tags: ["tops", "button-up", "formal"] },
    { id: "streetwear", name: "Streetwear", tags: ["urban", "casual", "modern"] },
    { id: "home", name: "Home", tags: ["welcome", "main page"] },
    { id: "about", name: "About", tags: ["brand info", "chuvel threads"] },
    { id: "contact", name: "Contact", tags: ["support", "help", "customer care"] },
  ];

  // ✅ Fuse.js configuration
  const fuse = new Fuse(searchableItems, {
    keys: ["name", "tags"],
    threshold: 0.4, // adjust for fuzziness (lower = stricter)
  });

  const isAdmin =
    currentUser?.email === "chuvelthreads@gmail.com";

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    // Run fuzzy search
    const results = fuse.search(query);
    if (results.length > 0) {
      // ✅ Navigate to the closest matching category
      const bestMatch = results[0].item.id;
      onNavigate(bestMatch);
      toast.success(`Showing results for "${results[0].item.name}"`);
    } else {
      // ✅ If no match, go to search results page
      onNavigate(`search:${query}`);
      toast.info(`No exact match, showing related results for "${query}"`);
    }

    setSearchQuery("");
  };

  const navigation = [
    { name: "Home", id: "home" },
    { name: "Senators", id: "senators" },
    { name: "Agbada", id: "agbada" },
    { name: "Shirts", id: "shirts" },
    { name: "Streetwear", id: "streetwear" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          {/* Logo */}
          <button onClick={() => onNavigate("home")}>
            <img
              src={yourLogo}
              alt="Chuvel Threads Logo"
              className="h-12 w-auto md:h-16"
            />
          </button>

          {/* 🔍 Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for outfits..."
              className="border-primary/20 bg-card pl-10 focus:border-primary rounded-full"
            />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-sm transition-colors hover:text-primary ${
                  currentPage === item.id
                    ? "text-primary"
                    : "text-foreground/80"
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
                onClick={() => onNavigate("admin")}
                className={`relative text-sm transition-colors hover:text-secondary ${
                  currentPage === "admin"
                    ? "text-secondary"
                    : "text-foreground/80"
                }`}
              >
                Admin
                {currentPage === "admin" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-secondary" />
                )}
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
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
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {isAdmin && (
                <button
                  onClick={() => {
                    onNavigate("admin");
                    setIsMenuOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2 text-left transition-colors ${
                    currentPage === "admin"
                      ? "bg-secondary/10 text-secondary"
                      : "text-foreground/80 hover:bg-secondary/5 hover:text-secondary"
                  }`}
                >
                  Admin Panel
                </button>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                {currentUser ? (
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <div className="flex w-full gap-4">
                    <Button
                      onClick={() => onNavigate("login")}
                      className="flex-1"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => onNavigate("signup")}
                      variant="outline"
                      className="flex-1"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
