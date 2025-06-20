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
            Queima<br />
            <span className="text-primary-color">stoque Nike</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Descubra os melhores tênis, camisetas, calças e bonés. Estilo autêntico para quem tem personalidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button className="bg-primary-color hover:bg-tertiary-color text-white px-8 py-4 rounded-lg font-semibold transition-colors transform hover:scale-105">
                VER OFERTAS
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all">
              COMPRAR AGORA
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section backgroundColor="gray" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">Coleções em destaque</h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Seleção especial dos melhores tênis, camisetas, calças e bonés para o seu estilo
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
          <h2 className="text-4xl font-bold text-dark-gray mb-4">CATEGORIAS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/products?category=tenis">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Tênis"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">TÊNIS</h3>
                  <p className="text-lg">Esportivos, Casuais, Urbanos</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/products?category=camiseta">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Camisetas"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">CAMISETAS</h3>
                  <p className="text-lg">Básicas, Estampadas, Polos</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/products?category=calca">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Calças"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">CALÇAS</h3>
                  <p className="text-lg">Jeans, Joggers, Chinos</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/products?category=bone">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Bonés"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">BONÉS</h3>
                  <p className="text-lg">Snapbacks, Dad Hats, Truckers</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
}
