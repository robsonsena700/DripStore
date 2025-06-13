import { products, cartItems, users, type Product, type InsertProduct, type User, type InsertUser, type CartItem, type InsertCartItem } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cart
  getCartItems(userId?: number): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private users: Map<number, User>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentUserId: number;
  private currentCartId: number;

  constructor() {
    this.products = new Map();
    this.users = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentUserId = 1;
    this.currentCartId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      // TÊNIS
      {
        name: "Air Max Classic",
        description: "Tênis esportivo com tecnologia de amortecimento avançada. Ideal para corridas e uso casual com design moderno e confortável.",
        price: "299.99",
        category: "tenis",
        brand: "SportMax",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"],
        colors: ["Branco", "Preto", "Azul", "Vermelho"],
        featured: true,
        badge: "NOVO",
        rating: "4.8",
        reviewCount: 156
      },
      {
        name: "Urban Runner",
        description: "Tênis urbano perfeito para o dia a dia. Combina estilo e conforto com sola antiderrapante e design versátil.",
        price: "189.99",
        category: "tenis",
        brand: "UrbanFeet",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
        colors: ["Preto", "Branco", "Cinza"],
        featured: true,
        rating: "4.6",
        reviewCount: 92
      },
      {
        name: "Retro Basketball",
        description: "Tênis de basquete retrô com cano alto. Design clássico dos anos 80 com tecnologia moderna para máximo conforto.",
        price: "349.99",
        category: "tenis",
        brand: "RetroSport",
        images: [
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
        colors: ["Branco/Vermelho", "Preto/Branco", "Azul/Branco"],
        badge: "LIMITADO",
        rating: "4.9",
        reviewCount: 78
      },

      // CAMISETAS
      {
        name: "Camiseta Básica Premium",
        description: "Camiseta 100% algodão com corte moderno. Tecido macio e respirável, perfeita para o uso diário.",
        price: "39.99",
        category: "camiseta",
        brand: "BasicWear",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["P", "M", "G", "GG", "XGG"],
        colors: ["Branco", "Preto", "Cinza", "Azul", "Verde"],
        featured: true,
        rating: "4.7",
        reviewCount: 234
      },
      {
        name: "Camiseta Estampada Urbana",
        description: "Camiseta com estampa exclusiva inspirada na cultura urbana. Design único e moderno para quem tem personalidade.",
        price: "59.99",
        category: "camiseta",
        brand: "UrbanStyle",
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Preto", "Branco", "Azul Marinho"],
        badge: "NOVO",
        rating: "4.5",
        reviewCount: 89
      },
      {
        name: "Camiseta Polo Clássica",
        description: "Polo elegante em piquet de algodão. Ideal para ocasiões casuais e semi-formais com acabamento refinado.",
        price: "79.99",
        category: "camiseta",
        brand: "ClassicPolo",
        images: [
          "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["P", "M", "G", "GG", "XGG"],
        colors: ["Azul Marinho", "Branco", "Preto", "Verde"],
        rating: "4.6",
        reviewCount: 145
      },

      // CALÇAS
      {
        name: "Calça Jeans Skinny",
        description: "Jeans com modelagem skinny e lavagem moderna. Tecido com elastano para maior conforto e mobilidade.",
        price: "119.99",
        category: "calca",
        brand: "DenimPro",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["36", "38", "40", "42", "44", "46", "48"],
        colors: ["Azul Escuro", "Azul Claro", "Preto", "Cinza"],
        featured: true,
        rating: "4.4",
        reviewCount: 178
      },
      {
        name: "Calça Jogger Esportiva",
        description: "Calça jogger em tecido tecnológico com ajuste no punho. Ideal para treinos e atividades casuais.",
        price: "89.99",
        category: "calca",
        brand: "SportFlex",
        images: [
          "https://images.unsplash.com/photo-1506629905963-b3b4d2d8547d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["P", "M", "G", "GG", "XGG"],
        colors: ["Preto", "Cinza", "Azul Marinho", "Verde"],
        badge: "NOVO",
        rating: "4.7",
        reviewCount: 96
      },
      {
        name: "Calça Chino Premium",
        description: "Calça chino de algodão premium com corte slim. Versatilidade para looks casuais e sociais.",
        price: "149.99",
        category: "calca",
        brand: "PremiumFit",
        images: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["36", "38", "40", "42", "44", "46"],
        colors: ["Bege", "Azul Marinho", "Preto", "Verde Oliva"],
        rating: "4.8",
        reviewCount: 67
      },

      // BONÉS
      {
        name: "Boné Snapback Classic",
        description: "Boné snapback com aba reta e ajuste traseiro. Design clássico e versátil para completar qualquer look.",
        price: "49.99",
        category: "bone",
        brand: "CapStyle",
        images: [
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["Único"],
        colors: ["Preto", "Branco", "Azul", "Vermelho", "Cinza"],
        featured: true,
        rating: "4.5",
        reviewCount: 123
      },
      {
        name: "Boné Dad Hat Vintage",
        description: "Boné dad hat com aba curva e ajuste de velcro. Estilo retrô com acabamento vintage e confortável.",
        price: "39.99",
        category: "bone",
        brand: "VintageStyle",
        images: [
          "https://images.unsplash.com/photo-1575428652377-a1d7a98ebf52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["Único"],
        colors: ["Bege", "Preto", "Azul Marinho", "Verde"],
        badge: "NOVO",
        rating: "4.3",
        reviewCount: 89
      },
      {
        name: "Boné Trucker Mesh",
        description: "Boné trucker com tela nas laterais para maior ventilação. Ideal para atividades ao ar livre e esportes.",
        price: "44.99",
        category: "bone",
        brand: "OutdoorCap",
        images: [
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["Único"],
        colors: ["Preto/Branco", "Azul/Branco", "Vermelho/Branco"],
        rating: "4.6",
        reviewCount: 76
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      id,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      category: insertProduct.category,
      brand: insertProduct.brand,
      images: insertProduct.images,
      sizes: insertProduct.sizes,
      colors: insertProduct.colors,
      featured: insertProduct.featured ?? false,
      inStock: insertProduct.inStock ?? true,
      badge: insertProduct.badge ?? null,
      rating: insertProduct.rating ?? null,
      reviewCount: insertProduct.reviewCount ?? null,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Cart
  async getCartItems(userId?: number): Promise<CartItem[]> {
    if (userId) {
      return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    }
    return Array.from(this.cartItems.values());
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartId++;
    const item: CartItem = { 
      id,
      userId: insertItem.userId ?? null,
      productId: insertItem.productId ?? null,
      quantity: insertItem.quantity ?? 1,
      size: insertItem.size ?? null,
      color: insertItem.color ?? null,
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      const updatedItem = { ...item, quantity };
      this.cartItems.set(id, updatedItem);
      return updatedItem;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();
