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
      {
        name: "Premium Black Hoodie",
        description: "Essential streetwear piece with premium cotton blend. Crafted for ultimate comfort and durability with modern fit and reinforced stitching.",
        price: "89.99",
        category: "clothing",
        brand: "DripStore",
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Charcoal", "White", "Navy"],
        featured: true,
        badge: "NEW",
        rating: "4.8",
        reviewCount: 127
      },
      {
        name: "Vintage Denim Jacket",
        description: "Classic denim with modern streetwear fit. Authentic vintage wash with contemporary styling.",
        price: "124.99",
        category: "clothing",
        brand: "DripStore",
        images: [
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Blue", "Black", "Light Blue"],
        featured: true,
        rating: "4.6",
        reviewCount: 89
      },
      {
        name: "Limited Edition Sneakers",
        description: "Exclusive colorway, limited quantities available. Premium materials and craftsmanship.",
        price: "199.99",
        category: "footwear",
        brand: "DripStore",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["White", "Black", "Red"],
        featured: true,
        badge: "LIMITED",
        rating: "4.9",
        reviewCount: 245
      },
      {
        name: "Street Cap Collection",
        description: "Signature embroidered designs with premium construction and authentic streetwear aesthetic.",
        price: "34.99",
        category: "accessories",
        brand: "DripStore",
        images: [
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["One Size"],
        colors: ["Black", "White", "Red", "Navy"],
        featured: true,
        rating: "4.5",
        reviewCount: 67
      },
      {
        name: "Street Art Graphic Tee",
        description: "Limited edition design collaboration with authentic street art aesthetic.",
        price: "45.99",
        category: "clothing",
        brand: "DripStore",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "White", "Grey"],
        rating: "4.7",
        reviewCount: 156
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
      ...insertProduct,
      id,
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
    const item: CartItem = { ...insertItem, id };
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
