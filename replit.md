# Soulforge Alchemist - Replit Development Guide

## Overview

Soulforge Alchemist is a steampunk-themed incremental alchemy game built as a full-stack web application. Players gather elements, discover compounds through transmutation, and create homunculi to automate their alchemical processes. The game features a mystical steampunk aesthetic with Professor Phineas "Pip" Cogsworth as the mentor character.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom steampunk theme
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: React Context API with useReducer for game state
- **Routing**: Single-page application with tab-based navigation

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Mode**: Vite middleware integration for hot reloading
- **Production Build**: ESBuild for server bundling

### Development Environment
- **Platform**: Replit with autoscale deployment
- **Database**: PostgreSQL 16 module
- **Package Manager**: npm
- **TypeScript**: Full TypeScript support across client, server, and shared code

## Key Components

### Game Systems
1. **Element Gathering**: Basic elements (fire, water, earth, air) with manual and automated collection
2. **Transmutation System**: Combine elements to discover new compounds with animated reactions
3. **Homunculi Management**: Create and assign AI assistants to automate element production
4. **Discovery Grimoire**: Track and categorize discovered compounds and formulas
5. **Progression Tracking**: Statistics and achievement-like progression indicators

### UI Components
- **Home**: Dashboard with Professor Pip, stats, and progression overview
- **Laboratory**: Main transmutation interface with element selection and brewing animations
- **Grimoire**: Discovery browser with filtering and completion tracking
- **Homunculi**: Creation and management interface for automated assistants
- **Navbar**: Navigation with real-time element counts and steampunk branding

### Data Models
- **Elements**: Basic building blocks with tiers and categories
- **Compounds**: Discoverable recipes requiring specific element combinations
- **Homunculi**: Automated workers with specializations and efficiency ratings
- **Game State**: Player progress, discoveries, and resource management

## Data Flow

### Client-Side State Management
1. **GameContext**: Centralized state management using React Context
2. **Actions**: Reducer-based actions for state mutations (gather, transmute, create)
3. **Local State**: Component-level state for UI interactions and animations
4. **Persistence**: Game state stored in browser localStorage (backend DB ready)

### Future Backend Integration
- **Authentication**: User registration and login system (schema prepared)
- **Game Progress**: Server-side save data and cross-device synchronization
- **Leaderboards**: Global statistics and player comparisons
- **Real-time Features**: Multiplayer interactions and live events

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem (@types, hooks, query)
- **Database**: Drizzle ORM with Neon serverless PostgreSQL
- **Styling**: Tailwind CSS with PostCSS processing
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Animations**: CSS transitions and custom steampunk effects

### Development Dependencies
- **Build Tools**: Vite, ESBuild, TypeScript compiler
- **Replit Integration**: Cartographer and runtime error overlays
- **Code Quality**: Proper TypeScript configuration and path aliases

## Deployment Strategy

### Development Environment
- **Local Server**: `npm run dev` starts both frontend and backend with hot reloading
- **Port Configuration**: Backend serves on port 5000, mapped to external port 80
- **Database**: Automatic PostgreSQL provisioning through Replit modules

### Production Deployment
- **Build Process**: Vite builds frontend assets, ESBuild bundles server code
- **Deployment Target**: Replit autoscale infrastructure
- **Static Assets**: Served from dist/public directory
- **Environment Variables**: DATABASE_URL required for database connection

### Database Management
- **Schema Definition**: Shared TypeScript schema with Drizzle definitions
- **Migrations**: Automated schema migrations with `npm run db:push`
- **Connection**: Environment variable-based database URL configuration

## Changelog

```
Changelog:
- June 20, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```