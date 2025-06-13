import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProductListing from "@/components/ProductListing";
import Section from "@/components/Section";
import type { Product } from "@shared/schema";

export default function HomePage() {
  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products?featured=true"],
  });

  return (
    <div>
      {/* Hero Section */}
      <Section backgroundColor="dark" padding="large" className="relative text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&h=1080')",
          }}
        />
        <div className="relative max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            STREET<br />
            <span className="text-drip-orange">CULTURE</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Discover the latest drops in streetwear fashion. Authentic styles that define your unique aesthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button className="bg-drip-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105">
                SHOP NOW
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all">
              VIEW LOOKBOOK
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section backgroundColor="gray" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-drip-black mb-4">FEATURED DROPS</h2>
          <p className="text-drip-gray text-lg max-w-2xl mx-auto">
            Curated selection of the most sought-after pieces from top streetwear brands
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
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
          <ProductListing products={featuredProducts} />
        )}
      </Section>

      {/* Categories Section */}
      <Section backgroundColor="white" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-drip-black mb-4">SHOP BY CATEGORY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/products?category=clothing">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Clothing Category"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">CLOTHING</h3>
                  <p className="text-lg">Hoodies, Tees, Jackets</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/products?category=footwear">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Footwear Category"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">FOOTWEAR</h3>
                  <p className="text-lg">Sneakers, Boots, Slides</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/products?category=accessories">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Accessories Category"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">ACCESSORIES</h3>
                  <p className="text-lg">Caps, Bags, Jewelry</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
}
