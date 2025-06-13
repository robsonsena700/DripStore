import { useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={product.images[selectedImageIndex]}
            alt={`${product.name} - View ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                className={`aspect-square rounded-lg object-cover cursor-pointer transition-all ${
                  selectedImageIndex === index
                    ? "ring-2 ring-drip-orange"
                    : "hover:ring-2 hover:ring-drip-orange"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.badge && (
            <Badge 
              className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${
                product.badge === "LIMITED" ? "bg-red-500" : "bg-drip-orange"
              }`}
            >
              {product.badge}
            </Badge>
          )}
          
          {product.rating && parseFloat(product.rating) > 0 && (
            <div className="flex items-center">
              <div className="flex">
                {renderStars(parseFloat(product.rating))}
              </div>
              <span className="text-drip-gray text-sm ml-2">
                ({product.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-drip-black mb-4">{product.name}</h1>
        <div className="text-3xl font-bold text-drip-black mb-6">${product.price}</div>
        <p className="text-drip-gray text-lg leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
