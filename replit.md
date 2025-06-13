# DRIP Store - Modern E-commerce Application

## Overview

DRIP Store is a modern e-commerce web application built for streetwear fashion. It features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database with Drizzle ORM. The application is designed with a focus on user experience, performance, and scalability.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API endpoints with structured error handling

### Database Design
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL

## Key Components

### Database Schema
The application uses three main tables:
- **Products**: Stores product information including name, description, price, images, sizes, colors, and inventory status
- **Users**: Manages user authentication with username/password
- **Cart Items**: Handles shopping cart functionality with product relationships

### API Endpoints
- `GET /api/products` - Retrieve products with filtering options (category, search, featured)
- `GET /api/products/:id` - Get single product details
- `GET /api/cart` - Retrieve cart items
- `POST /api/cart` - Add items to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Frontend Pages
- **HomePage**: Hero section with featured products
- **ProductListingPage**: Product catalog with filtering and sorting
- **ProductViewPage**: Detailed product view with options selection
- **Layout**: Consistent header/footer wrapper for all pages

### UI Components
- **ProductCard**: Reusable product display component
- **ProductListing**: Grid layout for multiple products
- **FilterGroup**: Advanced filtering interface
- **BuyBox**: Product purchase interface with quantity selection
- **Header**: Navigation with search and cart functionality

## Data Flow

1. **Product Discovery**: Users browse products through the homepage or product listing page
2. **Product Search**: Real-time search functionality filters products by name/description
3. **Product Filtering**: Category-based filtering and price range selection
4. **Product Selection**: Users can select product variants (color, size) and add to cart
5. **Cart Management**: Items are stored in the database and synchronized across sessions
6. **State Management**: TanStack Query handles caching, background updates, and optimistic updates

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **UI Library**: Radix UI components for accessible, unstyled primitives
- **Styling**: Tailwind CSS with PostCSS processing
- **Database**: Drizzle ORM with Neon Database serverless PostgreSQL
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Development Tools
- **Build Tool**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full type coverage across frontend and backend
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: ESBuild for production bundling

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit environment
- **Database**: PostgreSQL 16 module in Replit
- **Development Server**: Vite dev server with HMR on port 5000
- **API Server**: Express server with TypeScript compilation via tsx

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Production PostgreSQL with environment-based connection string
- **Deployment**: Autoscale deployment target with build/run commands

### Environment Configuration
- **Database URL**: Environment variable for database connection
- **Session Management**: PostgreSQL-backed sessions for scalability
- **Static Assets**: Vite handles asset optimization and bundling
- **CORS**: Configured for production domain requirements

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 13, 2025. Initial setup