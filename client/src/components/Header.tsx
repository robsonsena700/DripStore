import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Logo from "./Logo";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
  });

  const cartItemCount = cartItems.length;

  const isActiveRoute = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                  ? "text-drip-black" 
                  : "text-drip-gray hover:text-drip-orange"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className={`font-medium transition-colors ${
                isActiveRoute("/products") 
                  ? "text-drip-black" 
                  : "text-drip-gray hover:text-drip-orange"
              }`}>
                Products
              </span>
            </Link>
            <span className="text-drip-gray hover:text-drip-orange font-medium transition-colors cursor-pointer">
              Categories
            </span>
            <span className="text-drip-gray hover:text-drip-orange font-medium transition-colors cursor-pointer">
              About
            </span>
            <span className="text-drip-gray hover:text-drip-orange font-medium transition-colors cursor-pointer">
              Contact
            </span>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-drip-orange focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-drip-gray" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative text-drip-gray hover:text-drip-orange transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-drip-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden text-drip-gray hover:text-drip-orange">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
