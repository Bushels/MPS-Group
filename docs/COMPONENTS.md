# Component Style Guide

## Overview

This guide documents the component patterns and usage for the MPS Group Industrial Glassmorphism design system.

---

## Core Components

### GlassCard

**Purpose**: Reusable glassmorphism container for content sections.

**Usage:**
```tsx
import { GlassCard } from '@/components/ui/GlassCard';

<GlassCard className="hover:bg-white/5">
  <h3>Title</h3>
  <p>Content</p>
</GlassCard>
```

**Props:**
```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;  // Additional Tailwind classes
}
```

**Visual Specifications:**
- Backdrop blur: 12px
- Background: `#0A0F1E` at 60% opacity
- Border: White at 10% opacity
- Shadow: Deep shadow (`shadow-2xl`)
- Border radius: 12px (`rounded-xl`)
- Padding: 24px (`p-6`)

---

### StatsWidget

**Purpose**: Animated statistics display with count-up effect.

**Usage:**
```tsx
import { Anchor } from 'lucide-react';

<StatsWidget 
  icon={Anchor}
  value={3148512}
  label="Lbs Steel Fabricated"
  color="red"
/>

<StatsWidget 
  icon={Container}
  value={1.2}
  label="Avg Trucks per Week"
  decimals={1}
  color="blue"
  unit="per week"
/>
```

**Props:**
```typescript
interface StatsWidgetProps {
  icon: LucideIcon;      // Icon component from lucide-react
  value: number;          // Target value for count-up
  label: string;          // Description text
  unit?: string;          // Optional unit suffix (e.g., "lbs", "%")
  color: 'red' | 'blue'; // Color theme
  decimals?: number;      // Decimal places (default: 0)
}
```

**Behavior:**
- Counts from 0 to target value over 2 seconds
- Uses eased animation (linear interpolation)
- Triggers on component mount
- Formats numbers with locale-specific separators

**Visual Variations:**

**Red Theme** (`color="red"`):
- Icon background: `bg-red-600/10`
- Icon color: `text-red-600`

**Blue Theme** (`color="blue"`):
- Icon background: `bg-blue-600/20`
- Icon color: `text-blue-500`

---

## Button Patterns

### Primary CTA (Red)

```tsx
<button className="
  bg-red-700 
  hover:bg-red-800 
  text-white 
  px-6 py-3 
  rounded 
  text-xs 
  font-bold 
  uppercase 
  tracking-widest 
  transition-all 
  shadow-lg 
  shadow-red-900/20
">
  Get a Quote
</button>
```

### Secondary CTA (Blue)

```tsx
<button className="
  bg-blue-700 
  hover:bg-blue-600 
  text-white 
  px-6 py-3 
  rounded 
  text-xs 
  font-bold 
  uppercase 
  tracking-widest 
  transition-all 
  shadow-lg 
  shadow-blue-900/50
">
  View Details
</button>
```

### Text Button

```tsx
<button className="
  text-red-500 
  hover:text-white 
  font-bold 
  uppercase 
  tracking-widest 
  text-sm 
  flex 
  items-center 
  gap-2 
  transition-colors
">
  Learn More <ChevronRight className="w-4 h-4" />
</button>
```

---

## Badge Patterns

### Status Badge (Active)

```tsx
<div className="
  px-3 py-1 
  bg-green-500/10 
  border border-green-500/20 
  rounded 
  text-green-500 
  text-[10px] 
  font-bold 
  uppercase 
  tracking-widest 
  animate-pulse
">
  Hiring Active
</div>
```

### Status Badge (Alert)

```tsx
<div className="
  inline-flex 
  items-center 
  gap-3 
  px-4 py-2 
  bg-red-900/20 
  border border-red-900/50 
  rounded 
  text-red-500 
  text-xs 
  font-bold 
  uppercase 
  tracking-widest 
  animate-pulse
">
  <Target className="w-4 h-4" /> 
  Limited Capacity Event
</div>
```

---

## Card Patterns

### Service Card (Interactive)

```tsx
<GlassCard className="group cursor-pointer hover:bg-white/5 transition-all">
  {/* Icon with color transition */}
  <div className="
    mb-6 p-4 
    bg-red-900/10 
    w-fit 
    rounded-lg 
    text-red-600 
    group-hover:text-white 
    group-hover:bg-red-600 
    transition-colors
  ">
    <Flame className="w-8 h-8" />
  </div>
  
  {/* Content */}
  <h3 className="text-2xl font-bold text-white mb-2">
    Fabrication
  </h3>
  <p className="text-slate-400 text-sm leading-relaxed mb-6">
    Large-scale structural steel processing.
  </p>
  
  {/* CTA */}
  <div className="
    flex items-center gap-2 
    text-sm font-bold text-red-500 
    group-hover:translate-x-2 
    transition-transform
  ">
    View Capacity <ArrowRight className="w-4 h-4" />
  </div>
</GlassCard>
```

### Info Panel Card

```tsx
<GlassCard className="relative bg-[#050505]/80 backdrop-blur-xl">
  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
    <div>
      <h3 className="text-xl font-bold text-white">Title</h3>
      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
        Subtitle
      </p>
    </div>
    <div className="badge">Status</div>
  </div>
  
  <div className="space-y-4">
    {/* Content */}
  </div>
</GlassCard>
```

---

## Icon Usage

### Import Pattern

```typescript
import { 
  ArrowRight, 
  Factory, 
  Layers,
  // ... other icons
} from 'lucide-react';
```

### Size Guidelines

- **Mini**: `w-3 h-3` (12px) - Status indicators, inline text
- **Small**: `w-4 h-4` (16px) - Buttons, badges
- **Medium**: `w-5 h-5` (20px) - List items
- **Large**: `w-6 h-6` (24px) - Cards, sections
- **XLarge**: `w-8 h-8` (32px) - Feature highlights
- **Hero**: `w-16 h-16` (64px) - Hero sections, major features

### Color Patterns

```tsx
{/* Red accent */}
<Icon className="w-4 h-4 text-red-600" />

{/* Blue accent */}
<Icon className="w-4 h-4 text-blue-500" />

{/* Neutral */}
<Icon className="w-4 h-4 text-slate-400" />

{/* Status indicators */}
<Icon className="w-4 h-4 text-green-500" />  {/* Active/Success */}
<Icon className="w-4 h-4 text-yellow-500" /> {/* Warning */}
<Icon className="w-4 h-4 text-red-500" />    {/* Alert/Critical */}
```

---

## Typography Patterns

### Hero Heading

```tsx
<h1 className="
  text-7xl md:text-9xl 
  font-bold 
  text-white 
  leading-[0.85] 
  tracking-tighter
">
  136 ACRES. <br />
  <span className="text-red-600">$0 STORAGE.</span>
</h1>
```

### Section Heading

```tsx
<h2 className="text-4xl font-bold text-white mb-4">
  Divisions of Excellence
</h2>
```

### Card Title

```tsx
<h3 className="text-2xl font-bold text-white mb-2">
  Fabrication
</h3>
```

### Body Text

```tsx
<p className="text-slate-400 text-sm leading-relaxed">
  Description text goes here.
</p>
```

### Label Text

```tsx
<span className="
  text-xs 
  text-slate-500 
  uppercase 
  tracking-widest 
  font-medium
">
  Label
</span>
```

---

## Animation Patterns

### Pulse (Status Indicator)

```tsx
<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
```

### Hover Translate

```tsx
<div className="
  flex items-center gap-2 
  transition-transform 
  hover:translate-x-2
">
  Text <ArrowRight />
</div>
```

### Fade In

```tsx
<div className="
  opacity-0 
  animate-fade-in
">
  {/* Add to tailwind.config.ts */}
</div>
```

---

## Layout Patterns

### Container

```tsx
<div className="max-w-[1400px] mx-auto px-6">
  {/* Content */}
</div>
```

### Grid Layout

```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<div className="grid md:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Flex Layout

```tsx
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## Accessibility

### Focus States

All interactive elements must have visible focus states:

```tsx
<button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-red-600 
  focus:ring-offset-2 
  focus:ring-offset-black
">
  Button
</button>
```

### Alt Text

Always provide descriptive alt text for images:

```tsx
<Image 
  src="/images/shop.png" 
  alt="MPS Group 136-acre fabrication facility in Pierceland, Saskatchewan"
  width={1920}
  height={1080}
/>
```

### ARIA Labels

Use ARIA labels for icon-only buttons:

```tsx
<button aria-label="Close menu">
  <X className="w-6 h-6" />
</button>
```

---

**Last Updated**: Initial project setup
