import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-drip-black text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">DRIP</span>
                <span className="text-drip-orange">STORE</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Authentic streetwear for the culture. Discover exclusive drops and limited editions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">SHOP</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clothing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shoes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">SUPPORT</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">NEWSLETTER</h3>
            <p className="text-gray-400 mb-4">Get the latest drops and exclusive access.</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-drip-orange focus:border-drip-orange"
              />
              <Button className="bg-drip-orange hover:bg-orange-600 ml-2 px-6">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DripStore. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
