import { useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartMutation.mutate();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card 
        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge 
                className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${
                  product.badge === "LIMITED" ? "bg-red-500" : "bg-drip-orange"
                }`}
              >
                {product.badge}
              </Badge>
            </div>
          )}
          <div className={`absolute top-4 right-4 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-drip-orange hover:text-white transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2 text-drip-black">{product.name}</h3>
          <p className="text-drip-gray mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-drip-black">${product.price}</span>
            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="bg-drip-black text-white px-4 py-2 rounded-lg hover:bg-drip-orange transition-colors"
            >
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
