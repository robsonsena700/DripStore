import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductListing from "@/components/ProductListing";
import FilterGroup, { type FilterState } from "@/components/FilterGroup";
import Section from "@/components/Section";
import type { Product } from "@shared/schema";

export default function ProductListingPage() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: "",
    sizes: [],
  });
  const [sortBy, setSortBy] = useState("featured");

  // Extract category and search from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category],
      }));
    }
    
    if (search) {
      // If there's a search term, we'll use it to filter products
      // The search will be handled by the API call
    }
  }, [location]);

  // Build query string for API call
  const buildQueryString = () => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const apiParams = new URLSearchParams();
    
    const search = urlParams.get('search');
    const category = urlParams.get('category');
    
    if (search) apiParams.set('search', search);
    if (category) apiParams.set('category', category);
    
    return apiParams.toString() ? `?${apiParams.toString()}` : '';
  };

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: [`/api/products${buildQueryString()}`],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        switch (filters.priceRange) {
          case "0-50":
            return price <= 50;
          case "50-150":
            return price > 50 && price <= 150;
          case "150-300":
            return price > 150 && price <= 300;
          case "300+":
            return price > 300;
          default:
            return true;
        }
      });
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        filters.sizes.some(size => product.sizes.includes(size))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  if (error) {
    return (
      <Section>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-drip-gray">Failed to load products. Please try again later.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <FilterGroup onFiltersChange={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-drip-black">
              All Products
              {filteredAndSortedProducts.length > 0 && (
                <span className="text-drip-gray text-lg font-normal ml-2">
                  ({filteredAndSortedProducts.length} items)
                </span>
              )}
            </h1>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort by: Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductListing products={filteredAndSortedProducts} />
          )}
        </div>
      </div>
    </Section>
  );
}
