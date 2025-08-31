# Overview

This is a modern dental clinic website built with React, TypeScript, and Express.js. The application features a customer-facing website showcasing dental services, team members, testimonials, and appointment booking functionality, along with an administrative dashboard for managing site content, team members, and appointments. The project uses a modern tech stack with shadcn/ui components, Tailwind CSS for styling, and PostgreSQL with Drizzle ORM for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for development and building
- **Styling**: Tailwind CSS with custom design tokens for dental clinic branding
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: React Router for client-side navigation
- **Authentication**: Custom React context-based auth system with role-based access control

## Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Development Setup**: Hot reload with Vite integration in development mode
- **API Design**: RESTful API with `/api` prefix for all backend routes
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request/response logging

## Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations

## Storage Architecture
- **Interface Design**: Abstracted storage interface (IStorage) for CRUD operations
- **Implementation**: Memory storage for development with database-ready interface
- **Data Models**: User management with username/password authentication

## Authentication & Authorization
- **Authentication Method**: Username/password based authentication
- **Authorization**: Role-based access control with admin privileges
- **Session Management**: Custom auth context with persistent state
- **Protected Routes**: Route guards for admin dashboard access

## UI/UX Design System
- **Design Tokens**: Custom CSS variables for consistent theming
- **Color Scheme**: HSL-based color system with primary blue and accent green
- **Typography**: Responsive typography with clear visual hierarchy
- **Layout**: Mobile-first responsive design with container-based layouts
- **Animations**: CSS transitions and transforms for smooth interactions

## External Dependencies

### Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Router for core functionality
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Forms**: React Hook Form with Zod resolvers for form validation
- **Date Handling**: date-fns for date formatting and manipulation
- **Icons**: Lucide React for consistent iconography

### Backend Libraries
- **Server Framework**: Express.js for HTTP server functionality
- **Database**: Drizzle ORM, @neondatabase/serverless for database connectivity
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite for development server and production builds
- **TypeScript**: Full TypeScript support with strict type checking
- **Code Quality**: ESLint configuration for code consistency
- **Replit Integration**: Custom Replit plugins for development environment integration

### Database Services
- **PostgreSQL**: Neon Database for serverless PostgreSQL hosting
- **Connection Pooling**: Built-in connection pooling via Neon serverless driver
- **Environment Configuration**: DATABASE_URL environment variable for connection string