# Design System - Industrial Glassmorphism

## BRAND COLORS

### Primary: MPS Red
```css
--mps-red: #D32F2F
```
**Usage**: Primary CTAs, laser effects, critical alerts, brand emphasis

**Palette** (available in Tailwind as `mps-red-{shade}`):
- 50: #FFEBEE
- 100: #FFCDD2
- 200: #EF9A9A
- 300: #E57373
- 400: #EF5350
- 500: #F44336
- 600: #E53935
- 700: #D32F2F (DEFAULT)
- 800: #C62828
- 900: #B71C1C

### Secondary: MPS Blue
```css
--mps-blue: #1976D2
```
**Usage**: Secondary CTAs, system status, informational elements

**Palette** (available in Tailwind as `mps-blue-{shade}`):
- 50: #E3F2FD
- 100: #BBDEFB
- 200: #90CAF9
- 300: #64B5F6
- 400: #42A5F5
- 500: #2196F3
- 600: #1E88E5
- 700: #1976D2 (DEFAULT)
- 800: #1565C0
- 900: #0D47A1

### Base: Dark Mode HUD
```css
--hud-bg: #050505         /* Deep black background */
--hud-panel: #0A0F1E      /* Glass panel background */
--hud-border: rgba(255, 255, 255, 0.1)  /* Glass borders */
```

---

## TYPOGRAPHY

### Primary Font: Inter
- **Usage**: Body text, headings, UI elements
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Implementation**: Imported via `next/font/google` in `app/layout.tsx`

### Monospace Font: JetBrains Mono
- **Usage**: Code, data displays, technical information
- **Fallback**: 'Courier New', monospace
- **Tailwind Class**: `font-mono`

### Font Sizes
```css
text-xs      → 10px-12px   /* Status badges, labels */
text-sm      → 14px        /* Body text, captions */
text-base    → 16px        /* Default text */
text-lg      → 18px        /* Emphasized text */
text-xl      → 20px        /* Subheadings */
text-2xl     → 24px        /* Section titles */
text-3xl     → 30px        /* Stats, numbers */
text-4xl     → 36px        /* Page headings */
text-5xl     → 48px        /* Hero secondary */
text-7xl     → 72px        /* Hero primary (desktop) */
text-9xl     → 128px       /* Hero primary (large screens) */
```

---

## GLASSMORPHISM SPECIFICATIONS

### Glass Panel (Standard)
```tsx
className="backdrop-blur-md bg-[#0A0F1E]/60 border border-white/10 shadow-2xl rounded-xl"
```

**Properties:**
- **Backdrop Blur**: 12px (`backdrop-blur-md`)
- **Background**: `#0A0F1E` at 60% opacity
- **Border**: White at 10% opacity
- **Shadow**: Deep shadow for depth
- **Border Radius**: 12px (rounded-xl)

### Glass Card (Component)
```tsx
<GlassCard className="optional-custom">
  {children}
</GlassCard>
```

### Hover States
```css
hover:border-white/20     /* Increased border visibility */
hover:bg-white/5         /* Slight background lightening */
transition-all           /* Smooth transitions */
```

---

## ANIMATION RULES

### Keyframe Animations

#### Laser Scan (Vertical)
```css
@keyframes scan-vertical {
  0% { top: -10%; }
  100% { top: 110%; }
}
/* Duration: 4s, Easing: cubic-bezier(0.45, 0.05, 0.55, 0.95) */
```

#### Marquee (Horizontal Scroll)
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* Duration: 30s, Easing: linear infinite */
```

### Hover Animations
- **Translation**: `hover:translate-x-1`, `hover:translate-x-2`
- **Duration**: 300ms recommended
- **Easing**: Default ease or `transition-all`

### Performance Guidelines
- **Use `transform`** instead of position properties
- **Prefer `opacity`** over color changes for performance
- **Use `will-change`** sparingly and only when needed
- **Avoid animating** `box-shadow` (use opacity on shadow layers instead)

---

## INDUSTRIAL TEXTURES

### Pipe Texture
```css
background-image: repeating-linear-gradient(
  90deg,
  transparent 0px,
  transparent 40px,
  rgba(0,0,0,0.8) 40px,
  rgba(0,0,0,0.8) 42px
);
```
**Usage**: Backgrounds for industrial sections

### Grid Pattern
```css
background-image: linear-gradient(45deg, #1e293b 1px, transparent 1px);
background-size: 20px 20px;
```
**Usage**: Technical section backgrounds

---

## SHADOW SYSTEM

### Glass Shadows
```css
shadow-glass      → 0 8px 32px 0 rgba(0, 0, 0, 0.37)
shadow-glass-red  → 0 0 20px rgba(211, 47, 47, 0.5), 0 0 40px rgba(211, 47, 47, 0.3)
shadow-glass-blue → 0 0 20px rgba(25, 118, 210, 0.5), 0 0 40px rgba(25, 118, 210, 0.3)
```

### Usage Examples
- **Red Glow**: CTA buttons, laser effects, critical elements
- **Blue Glow**: Information panels, system status, secondary CTAs
- **Standard Glass**: All glassmorphism panels

---

## MICRO-INTERACTIONS

### Pulse Animation
```tsx
<span className="animate-pulse">LIVE</span>
<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
```
**Usage**: Live status indicators, alerts, attention-grabbing elements

### Count-Up Effect
Implemented in `StatsWidget` component:
- **Duration**: 2000ms
- **Easing**: Linear interpolation
- **Trigger**: On component mount

### Button States
```tsx
className="
  bg-red-700 
  hover:bg-red-800 
  transition-all 
  shadow-lg 
  shadow-red-900/20
  hover:shadow-red-900/40
"
```

---

## SPACING & LAYOUT

### Container Widths
```css
max-w-[1400px]   /* Standard content */
max-w-[1600px]   /* Wide sections, hero */
```

### Section Padding
```css
py-24 px-6       /* Standard section */
py-32 px-6       /* Large section */
py-16 px-6       /* Compact section */
```

### Gap Sizes
```css
gap-4    /* Tight grouping */
gap-6    /* Standard spacing */
gap-12   /* Section spacing */
gap-20   /* Large section spacing */
```

---

## RESPONSIVE BREAKPOINTS

```css
sm   → 640px    /* Small devices */
md   → 768px    /* Tablets */
lg   → 1024px   /* Desktop */
xl   → 1280px   /* Large desktop */
2xl  → 1536px   /* Extra large */
```

### Mobile-First Approach
```tsx
className="
  text-7xl       {/* Mobile base */}
  md:text-9xl    {/* Tablet and up */}
"
```

---

## ACCESSIBILITY

### Color Contrast
- All text must meet WCAG AA standards (4.5:1 minimum)
- Interactive elements must be clearly distinguishable
- Focus states required on all interactive elements

### Focus States
```tsx
className="focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
```

---

**Last Updated**: Initial project setup
