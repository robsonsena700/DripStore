// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  products;
  users;
  cartItems;
  currentProductId;
  currentUserId;
  currentCartId;
  constructor() {
    this.products = /* @__PURE__ */ new Map();
    this.users = /* @__PURE__ */ new Map();
    this.cartItems = /* @__PURE__ */ new Map();
    this.currentProductId = 1;
    this.currentUserId = 1;
    this.currentCartId = 1;
    this.initializeProducts();
  }
  initializeProducts() {
    const sampleProducts = [
      // TÊNIS
      {
        name: "Air Max Classic",
        description: "T\xEAnis esportivo com tecnologia de amortecimento avan\xE7ada. Ideal para corridas e uso casual com design moderno e confort\xE1vel.",
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
        description: "T\xEAnis urbano perfeito para o dia a dia. Combina estilo e conforto com sola antiderrapante e design vers\xE1til.",
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
        description: "T\xEAnis de basquete retr\xF4 com cano alto. Design cl\xE1ssico dos anos 80 com tecnologia moderna para m\xE1ximo conforto.",
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
        name: "Camiseta B\xE1sica Premium",
        description: "Camiseta 100% algod\xE3o com corte moderno. Tecido macio e respir\xE1vel, perfeita para o uso di\xE1rio.",
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
        description: "Camiseta com estampa exclusiva inspirada na cultura urbana. Design \xFAnico e moderno para quem tem personalidade.",
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
        name: "Camiseta Polo Cl\xE1ssica",
        description: "Polo elegante em piquet de algod\xE3o. Ideal para ocasi\xF5es casuais e semi-formais com acabamento refinado.",
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
        name: "Cal\xE7a Jeans Skinny",
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
        name: "Cal\xE7a Jogger Esportiva",
        description: "Cal\xE7a jogger em tecido tecnol\xF3gico com ajuste no punho. Ideal para treinos e atividades casuais.",
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
        name: "Cal\xE7a Chino Premium",
        description: "Cal\xE7a chino de algod\xE3o premium com corte slim. Versatilidade para looks casuais e sociais.",
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
        name: "Bon\xE9 Snapback Classic",
        description: "Bon\xE9 snapback com aba reta e ajuste traseiro. Design cl\xE1ssico e vers\xE1til para completar qualquer look.",
        price: "49.99",
        category: "bone",
        brand: "CapStyle",
        images: [
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["\xDAnico"],
        colors: ["Preto", "Branco", "Azul", "Vermelho", "Cinza"],
        featured: true,
        rating: "4.5",
        reviewCount: 123
      },
      {
        name: "Bon\xE9 Dad Hat Vintage",
        description: "Bon\xE9 dad hat com aba curva e ajuste de velcro. Estilo retr\xF4 com acabamento vintage e confort\xE1vel.",
        price: "39.99",
        category: "bone",
        brand: "VintageStyle",
        images: [
          "https://images.unsplash.com/photo-1575428652377-a1d7a98ebf52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["\xDAnico"],
        colors: ["Bege", "Preto", "Azul Marinho", "Verde"],
        badge: "NOVO",
        rating: "4.3",
        reviewCount: 89
      },
      {
        name: "Bon\xE9 Trucker Mesh",
        description: "Bon\xE9 trucker com tela nas laterais para maior ventila\xE7\xE3o. Ideal para atividades ao ar livre e esportes.",
        price: "44.99",
        category: "bone",
        brand: "OutdoorCap",
        images: [
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
        ],
        sizes: ["\xDAnico"],
        colors: ["Preto/Branco", "Azul/Branco", "Vermelho/Branco"],
        rating: "4.6",
        reviewCount: 76
      }
    ];
    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });
  }
  // Products
  async getProducts() {
    return Array.from(this.products.values());
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter((product) => product.featured);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  async searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm) || product.brand.toLowerCase().includes(searchTerm)
    );
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = {
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
      createdAt: /* @__PURE__ */ new Date()
    };
    this.products.set(id, product);
    return product;
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Cart
  async getCartItems(userId) {
    if (userId) {
      return Array.from(this.cartItems.values()).filter((item) => item.userId === userId);
    }
    return Array.from(this.cartItems.values());
  }
  async addToCart(insertItem) {
    const id = this.currentCartId++;
    const item = {
      id,
      userId: insertItem.userId ?? null,
      productId: insertItem.productId ?? null,
      quantity: insertItem.quantity ?? 1,
      size: insertItem.size ?? null,
      color: insertItem.color ?? null
    };
    this.cartItems.set(id, item);
    return item;
  }
  async updateCartItem(id, quantity) {
    const item = this.cartItems.get(id);
    if (item) {
      const updatedItem = { ...item, quantity };
      this.cartItems.set(id, updatedItem);
      return updatedItem;
    }
    return void 0;
  }
  async removeFromCart(id) {
    return this.cartItems.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  images: text("images").array().notNull(),
  sizes: text("sizes").array().notNull(),
  colors: text("colors").array().notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  badge: text("badge"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  size: text("size"),
  color: text("color")
});
var insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const { category, search, featured } = req.query;
      let products2;
      if (featured === "true") {
        products2 = await storage.getFeaturedProducts();
      } else if (category && typeof category === "string") {
        products2 = await storage.getProductsByCategory(category);
      } else if (search && typeof search === "string") {
        products2 = await storage.searchProducts(search);
      } else {
        products2 = await storage.getProducts();
      }
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.get("/api/cart", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId) : void 0;
      const cartItems2 = await storage.getCartItems(userId);
      res.json(cartItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });
  app2.patch("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      if (isNaN(id) || !quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid cart item ID or quantity" });
      }
      const updatedItem = await storage.updateCartItem(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      const success = await storage.removeFromCart(id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
var PORT = 5e3;
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
})();
