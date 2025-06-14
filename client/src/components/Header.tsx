import { useState, FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Logo from "./Logo";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
  });

  const cartItemCount = Array.isArray(cartItems) ? cartItems.length : 0;

  const isActiveRoute = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-light-gray-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo />
          </Link>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className={`font-medium transition-colors ${
                isActiveRoute("/") 
                  ? "text-dark-gray" 
                  : "text-light-gray hover:text-primary-color"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className={`font-medium transition-colors ${
                isActiveRoute("/products") 
                  ? "text-dark-gray" 
                  : "text-light-gray hover:text-primary-color"
              }`}>
                Products
              </span>
            </Link>
            <Link href="/products?category=tenis">
              <span className="text-light-gray hover:text-primary-color font-medium transition-colors cursor-pointer">
                Tênis
              </span>
            </Link>
            <Link href="/products?category=camiseta">
              <span className="text-light-gray hover:text-primary-color font-medium transition-colors cursor-pointer">
                Camisetas
              </span>
            </Link>
            <Link href="/products?category=calca">
              <span className="text-light-gray hover:text-primary-color font-medium transition-colors cursor-pointer">
                Calças
              </span>
            </Link>
            <Link href="/products?category=bone">
              <span className="text-light-gray hover:text-primary-color font-medium transition-colors cursor-pointer">
                Bonés
              </span>
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <Input
                type="text"
                placeholder="Pesquisar produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-4 pr-12 py-2 border border-light-gray-2 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSearchClick}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-light-gray hover:text-primary-color transition-colors"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Button variant="ghost" size="icon" className="relative text-light-gray hover:text-primary-color transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-color text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden text-light-gray hover:text-primary-color">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
