# Tech Stack - Source of Truth

## CORE FRAMEWORK

### Framework: Next.js 14+ (App Router strategy only. No pages/ directory)
- **Version**: 14.2.18+
- **Strategy**: App Router ONLY
- **Location**: All routes in `app/` directory
- **Server Components**: Default for all pages unless interactivity required

### Language: TypeScript (Strict mode)
- **Version**: 5.6.3+
- **Mode**: Strict
- **Config**: See `tsconfig.json`
- **Type Safety**: Avoid `any`. Define interfaces for all Props and Database returns.

### Styling: Tailwind CSS (Utility-first)
- **Version**: 3.4.14+
- **Strategy**: Utility-first approach
- **Custom Config**: MPS brand colors in `tailwind.config.ts`
- **CSS Modules**: Only use for complex animations if absolutely necessary

---

## CRITICAL LIBRARIES

### Icons: lucide-react
- **Version**: 0.462.0+
- **Usage**: `import { IconName } from 'lucide-react'`
- **DO NOT USE**: FontAwesome, React Icons, or other icon libraries

### Animation: framer-motion
- **Version**: 11.11.17+
- **Usage**: For all UI physics and complex animations
- **Fallback**: CSS keyframes for simple animations (already in use)

### Backend/Auth: Supabase
- **@supabase/supabase-js**: 2.46.1+
- **@supabase/auth-helpers-nextjs**: 0.10.0+
- **Integration**: Direct integration with Next.js App Router

### UI Components
- **Strategy**: Custom built using Tailwind
- **Design Pattern**: Industrial Glassmorphism
- **No UI Libraries**: Do not use shadcn/ui, MUI, or similar component libraries

---

## CODING STANDARDS

### "Use Client" Policy
- **Default**: Server Components
- **Add 'use client'**: Only to leaf components requiring:
  - React hooks (useState, useEffect, etc.)
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs (window, document, etc.)

**Example:**
```tsx
// ❌ BAD - Entire page is client component
'use client';
export default function Page() {
  return <div><StaticContent /><InteractiveButton /></div>
}

// ✅ GOOD - Only interactive component is client
export default function Page() {
  return <div><StaticContent /><InteractiveButton /></div>
}

// components/InteractiveButton.tsx
'use client';
export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Image Handling
- **Always use**: `next/image`
- **Required props**: `width` and `height` to prevent layout shift
- **Optimization**: Configured in `next.config.js`

**Example:**
```tsx
import Image from 'next/image';

<Image 
  src="/images/shop.png" 
  alt="Description"
  width={1920}
  height={1080}
  priority // for above-the-fold images
/>
```

### Type Safety
- **Avoid `any`**: Always define proper types
- **Use interfaces**: For all component Props
- **Database types**: Define interfaces for Supabase returns

**Example:**
```tsx
// ✅ GOOD
interface StatsWidgetProps {
  icon: LucideIcon;
  value: number;
  label: string;
  unit?: string;
  color: 'red' | 'blue';
  decimals?: number;
}

const StatsWidget = ({ icon: Icon, value, label, unit, color, decimals = 0 }: StatsWidgetProps) => {
  // implementation
}

// ❌ BAD
const StatsWidget = ({ icon, value, label, unit, color, decimals }: any) => {
  // implementation
}
```

---

## FORBIDDEN

### ❌ DO NOT USE

1. **jQuery** - React handles DOM manipulation
2. **Bootstrap** - We use Tailwind CSS
3. **styled-components** - Conflicts with Tailwind, use Tailwind classes
4. **CSS-in-JS libraries** - Use Tailwind utilities
5. **Alternative icon libraries** - Use lucide-react only
6. **Pages directory** - Use App Router only

---

## PACKAGE VERSIONS (Reference)

See `package.json` for complete list. Key packages:

```json
{
  "dependencies": {
    "next": "^14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.6.3",
    "lucide-react": "^0.462.0",
    "framer-motion": "^11.11.17",
    "@supabase/supabase-js": "^2.46.1",
    "@supabase/auth-helpers-nextjs": "^0.10.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.14",
    "eslint": "^8.57.1",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.8"
  }
}
```

---

**Last Updated**: Initial project setup
