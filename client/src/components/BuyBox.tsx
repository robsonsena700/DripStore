import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Truck, RefreshCw, Shield, Minus, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface BuyBoxProps {
  product: Product;
  selectedOptions: {
    color: string;
    size: string;
  };
}

export default function BuyBox({ product, selectedOptions }: BuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity,
        size: selectedOptions.size,
        color: selectedOptions.color,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const handleBuyNow = () => {
    toast({
      title: "Buy Now",
      description: "This feature will be available soon!",
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold text-drip-black">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={decreaseQuantity}
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[3rem] text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={increaseQuantity}
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
          className="w-full bg-drip-orange hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors transform hover:scale-105"
        >
          {addToCartMutation.isPending ? "ADDING..." : "ADD TO CART"}
        </Button>
        
        <Button
          onClick={handleBuyNow}
          className="w-full bg-drip-black hover:bg-gray-800 text-white py-4 rounded-lg font-bold text-lg transition-colors"
        >
          BUY NOW
        </Button>
        
        <Button
          onClick={handleWishlist}
          variant="outline"
          className="w-full border-2 border-drip-black text-drip-black hover:bg-drip-black hover:text-white py-4 rounded-lg font-bold text-lg transition-all"
        >
          <Heart className="h-5 w-5 mr-2" />
          ADD TO WISHLIST
        </Button>
      </div>
      
      {/* Product Benefits */}
      <div className="pt-6 border-t border-gray-200">
        <div className="space-y-3 text-sm text-drip-gray">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Free shipping on orders over $75</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>30-day return policy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Authentic products guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
