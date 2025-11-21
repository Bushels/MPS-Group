# MPS Group - Industrial Services Platform

A high-performance B2B platform featuring "Industrial Glassmorphism" design, built for MPS Group's 136-acre industrial facility in Pierceland, SK.

## 🎯 Project Overview

MPS Group is a leading industrial services provider in the Western Canadian Sedimentary Basin, specializing in:
- **Fabrication**: Large-scale structural steel processing with CWB Division 2 certification
- **Modular Assembly**: 100-acre assembly yard for mega-modules
- **Pipefitting**: ABSA certified pressure piping and field installation
- **Machining**: Precision CNC machining and custom components
- **Downhole Technologies**: Proprietary WellFi™ and PipeVault™ product lines

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14+** - App Router strategy only
- **TypeScript** - Strict mode enabled
- **React 18** - Latest features with Server Components

### Styling & UI
- **Tailwind CSS** - Utility-first styling with custom glassmorphism utilities
- **Framer Motion** - Physics-based animations
- **Lucide React** - Icon system

### Backend & Data
- **Supabase** - Backend as a service, authentication, and database
- **@supabase/auth-helpers-nextjs** - Auth integration for Next.js

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 📁 Project Structure

```
mps-group/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & Tailwind
├── components/            # Reusable components (to be created)
├── lib/                   # Utility functions (to be created)
├── public/               # Static assets
│   └── images/           # Images (shop.png, etc.)
├── docs/                 # Documentation
│   ├── ai-context/       # AI directive files
│   ├── DEVELOPMENT.md    # Development guide
│   └── COMPONENTS.md     # Component style guide
├── .vscode/              # VS Code configuration
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind configuration
└── README.md             # This file
```

## 🎨 Design System

### Industrial Glassmorphism Theme

The site uses a custom "Industrial Glassmorphism" aesthetic with a "Dark Mode HUD" feel:

**Brand Colors:**
- **MPS Red**: `#D32F2F` - Primary brand color
- **MPS Blue**: `#1976D2` - Secondary brand color
- **HUD Background**: `#050505` - Deep black base
- **HUD Panel**: `#0A0F1E` - Glass panel background

**Key Design Elements:**
- Glassmorphism cards with backdrop blur
- Laser scan animations
- Industrial textures and patterns
- Animated statistics widgets
- Scrolling partner logo marquee

### Typography
- **Primary Font**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

## 🧩 Components

### GlassCard
Reusable glassmorphism card component with backdrop blur and border effects.

```tsx
<GlassCard className="custom-class">
  {/* content */}
</GlassCard>
```

### StatsWidget
Animated statistics counter with count-up effect on mount.

```tsx
<StatsWidget 
  icon={IconComponent}
  value={1234}
  label="Label Text"
  unit="optional unit"
  color="red" // or "blue"
  decimals={0} // optional
/>
```

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT.md) - Coding standards and workflows
- [Component Guide](docs/COMPONENTS.md) - Component usage and patterns
- [AI Context](docs/ai-context/) - AI agent directive files

## 🔧 IDE Setup

### Recommended Extensions

The project includes VS Code extension recommendations in `.vscode/extensions.json`:
- **ESLint** - Code linting
- **Prettier** - Code formatting  
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **TypeScript** - Enhanced TypeScript support
- **Supabase** - Supabase integration

### Auto-Format on Save

The workspace is configured to automatically format files on save using Prettier.

## 🌐 Deployment

This project is designed to be deployed on **Vercel** with automatic deployments from your Git repository.

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

## 📄 License

© 2025 MPS Group. All Rights Reserved.

---

**Built with ⚡ by MPS Group - Industrial Leadership Since 2005**
