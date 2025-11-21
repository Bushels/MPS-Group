# Development Guide

## Getting Started

### First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Missing Directories**
   ```bash
   mkdir -p public/images
   ```

3. **Add Images**
   - Place `shop.png` in `/public/images/`

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to `http://localhost:3000`

---

## Development Workflow

### Component Creation

When creating a new component, follow this structure:

```typescript
// components/ui/ComponentName.tsx
'use client'; // Only if using hooks or interactivity

import React from 'react';
import { IconName } from 'lucide-react';

interface ComponentNameProps {
  // Define all props with types
  title: string;
  optional?: boolean;
}

export function ComponentName({ title, optional = false }: ComponentNameProps) {
  return (
    <div className="glass-panel">
      {/* Component content */}
    </div>
  );
}
```

**Key Rules:**
- Use TypeScript interfaces for all props
- Add `'use client'` only when necessary (hooks, events, browser APIs)
- Import icons from `lucide-react` only
- Use Tailwind classes for styling
- Follow Industrial Glassmorphism design patterns

---

## Glassmorphism Implementation

### Standard Glass Card

```tsx
<div className="backdrop-blur-md bg-[#0A0F1E]/60 border border-white/10 shadow-2xl rounded-xl p-6">
  {/* Content */}
</div>
```

### With Hover Effects

```tsx
<div className="
  backdrop-blur-md 
  bg-[#0A0F1E]/60 
  border border-white/10 
  hover:border-white/20
  shadow-2xl 
  rounded-xl 
  p-6
  transition-all
  duration-300
">
  {/* Content */}
</div>
```

### Using the GlassCard Component

```tsx
import { GlassCard } from '@/components/ui/GlassCard';

<GlassCard className="hover:bg-white/5">
  <h3>Title</h3>
  <p>Content</p>
</GlassCard>
```

---

## Animation Patterns

### Count-Up Animation

```typescript
const [count, setCount] = useState(0);

useEffect(() => {
  let start = 0;
  const end = targetValue;
  const duration = 2000;
  const increment = end / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= end) {
      setCount(end);
      clearInterval(timer);
    } else {
      setCount(start);
    }
  }, 16);
  
  return () => clearInterval(timer);
}, [targetValue]);
```

### CSS Keyframe Animations

**In Component:**
```tsx
<style jsx global>{`
  @keyframes custom-animation {
    0% {  property: value; }
    100% { property: value; }
  }
  .custom-class {
    animation: custom-animation 2s ease-in-out infinite;
  }
`}</style>
```

**In Tailwind Config:**
```typescript
// tailwind.config.ts
animation: {
  'custom': 'custom-animation 2s ease-in-out infinite',
},
keyframes: {
  'custom-animation': {
    '0%': { property: 'value' },
    '100%': { property: 'value' },
  },
}
```

---

## Image Optimization

### Using next/image

```tsx
import Image from 'next/image';

<Image 
  src="/images/shop.png" 
  alt="MPS 136 Acre Facility"
  width={1920}
  height={1080}
  priority // Use for above-the-fold images
  quality={90} // Default is 75
  placeholder="blur" // Optional blur-up effect
/>
```

### Image Best Practices
- Always specify `width` and `height`
- Use `priority` for hero images
- Optimize images before adding to `/public`
- Use WebP or AVIF formats when possible
- Keep images under 1MB for best performance

---

## State Management

### Local State (useState)

```typescript
'use client';
import { useState } from 'react';

function Component() {
  const [isOpen, setIsOpen] = useState(false);
  
  return <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
}
```

### Server Components (Default)

```typescript
// No 'use client' directive
// Can fetch data directly, run server-side code

export default async function Page() {
  // Server-side data fetching
  const data = await fetchData();
  
  return <div>{data.title}</div>
}
```

---

## Supabase Integration (Future)

### Client Setup

```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export const createClient = () => createClientComponentClient<Database>();
```

### Server Component Usage

```typescript
// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export const createClient = () => createServerComponentClient<Database>({ 
  cookies 
});
```

---

## Debugging

### TypeScript Errors

```bash
npm run type-check
```

### Linting Issues

```bash
npm run lint
```

### Build Errors

```bash
npm run build
```

### Formatting

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format
```

---

## Common Patterns

### Responsive Design

```tsx
className="
  text-7xl         {/* Mobile */}
  md:text-8xl      {/* Tablet */}
  lg:text-9xl      {/* Desktop */}
"
```

### Conditional Classes

```tsx
className={`
  base-classes
  ${condition ? 'true-classes' : 'false-classes'}
`}
```

### Custom Utilities

```tsx
// In globals.css
@layer utilities {
  .glass-panel {
    @apply backdrop-blur-glass bg-hud-panel/60 border border-hud-border shadow-glass;
  }
}

// Usage
<div className="glass-panel p-6 rounded-xl">
```

---

## Performance Tips

1. **Use Server Components by default** - Only add `'use client'` when necessary
2. **Optimize images** - Always use `next/image`
3. **Lazy load components** - Use Next.js dynamic imports for heavy components
4. **Minimize client JavaScript** - Keep logic server-side when possible
5. **Use CSS transforms** - Animate with `transform` instead of position properties

---

## Git Workflow (When Ready)

```bash
# Create feature branch
git checkout -b feature/component-name

# Make changes, commit often
git add .
git commit -m "feat: add component description"

# Push to remote
git push origin feature/component-name

# Create PR for review
```

---

**Next Steps:**
1. Extract components to separate files
2. Set up Supabase project
3. Implement authentication
4. Create additional pages

---

**Need Help?** Refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Lucide Icons](https://lucide.dev)
