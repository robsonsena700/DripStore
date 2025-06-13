import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductOptionsProps {
  product: Product;
  selectedOptions: {
    color: string;
    size: string;
  };
  onOptionsChange: (options: { color: string; size: string }) => void;
}

export default function ProductOptions({ product, selectedOptions, onOptionsChange }: ProductOptionsProps) {
  const handleColorChange = (color: string) => {
    onOptionsChange({ ...selectedOptions, color });
  };

  const handleSizeChange = (size: string) => {
    onOptionsChange({ ...selectedOptions, size });
  };

  const getColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      "Black": "bg-black",
      "White": "bg-white border-2",
      "Charcoal": "bg-gray-600",
      "Navy": "bg-blue-900",
      "Blue": "bg-blue-500",
      "Light Blue": "bg-blue-300",
      "Red": "bg-red-500",
      "Grey": "bg-gray-400",
    };
    return colorMap[color] || "bg-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-drip-black">Color</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedOptions.color === color
                    ? "border-drip-orange ring-2 ring-drip-orange ring-offset-2"
                    : "border-gray-300 hover:border-drip-orange"
                } ${getColorStyle(color)}`}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-drip-black">Size</h3>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-3 font-semibold transition-colors ${
                  selectedOptions.size === size
                    ? "border-drip-orange bg-drip-orange text-white"
                    : "border-gray-300 hover:border-drip-orange"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
