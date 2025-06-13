import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

interface ProductListingProps {
  products: Product[];
  className?: string;
}

export default function ProductListing({ products, className = "" }: ProductListingProps) {
  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-xl font-semibold text-drip-gray mb-2">No products found</h3>
        <p className="text-drip-gray">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
