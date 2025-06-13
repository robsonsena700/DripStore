import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductDetails from "@/components/ProductDetails";
import ProductOptions from "@/components/ProductOptions";
import BuyBox from "@/components/BuyBox";
import Section from "@/components/Section";
import type { Product } from "@shared/schema";

export default function ProductViewPage() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const [selectedOptions, setSelectedOptions] = useState({
    color: "",
    size: "",
  });

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  // Initialize selected options when product loads
  useState(() => {
    if (product) {
      setSelectedOptions({
        color: product.colors[0] || "",
        size: product.sizes[0] || "",
      });
    }
  });

  if (isLoading) {
    return (
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (error || !product) {
    return (
      <Section>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-drip-gray">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductDetails product={product} />

        {/* Product Information & Buy Box */}
        <div className="space-y-8">
          {/* Product Options */}
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            onOptionsChange={setSelectedOptions}
          />

          {/* Buy Box */}
          <BuyBox product={product} selectedOptions={selectedOptions} />
        </div>
      </div>
    </Section>
  );
}
