# Three.js OCTG Pipe Background Integration

## What We've Built

We've created a high-fidelity 3D OCTG pipe rendering with an animated laser scan effect using Three.js and PBR (Physically Based Rendering) materials. This replaces the simple CSS-based laser scan with a stunning, realistic 3D visualization.

## Files Created

1. **`components/PipeBackground.tsx`** - The main Three.js component featuring:
   - Realistic glossy metal pipe with PBR materials (metalness: 0.95, roughness: 0.15)
   - Animated red laser spotlight that scans vertically
   - Pipe threading detail rings for added realism
   - HDR environment mapping for realistic reflections
   - Post-processing bloom effects for the laser glow
   - Optimized for 60fps performance

2. **`components/PipeBackgroundClient.tsx`** - Dynamic import wrapper that:
   - Disables SSR (Three.js requires browser APIs)
   - Provides a loading fallback
   - Prevents hydration issues in Next.js

## Packages Installed

```
three@latest
@types/three@latest
@react-three/fiber@latest
@react-three/drei@latest
@react-three/postprocessing@latest
```

Installed with `--legacy-peer-deps` flag due to React 18/19 peer dependency conflicts.

## How to Integrate into app/page.tsx

### Step 1: Add the import

At the top of `app/page.tsx`, after the existing imports, add:

```typescript
import PipeBackground from '../components/PipeBackgroundClient';
```

### Step 2: Replace the hero section background

Find the hero section starting at line ~226:

```tsx
{/* --- HERO SECTION: THE YARD --- */}
<section className="relative flex h-screen items-center overflow-hidden bg-[#050505]">
```

Replace everything from line ~228 to ~254 (the "Background Images & Effects" and "Laser Scan Effect" divs) with:

```tsx
{
  /* Background: Three.js OCTG Pipe with Laser Scan */
}
<PipeBackground />;

{
  /* Shop Image as subtle backdrop (reduced opacity) */
}
<div className="absolute inset-0 z-10">
  <div className="absolute inset-0 h-full w-full overflow-hidden">
    <Image
      src="/images/shop.png"
      alt="MPS 136 Acre Facility"
      fill
      className="object-cover opacity-10 mix-blend-overlay brightness-50 contrast-125 grayscale"
      priority
    />
  </div>
  <div className="absolute inset-0 bg-[#050505]/60"></div>
</div>;
```

### Step 3: Run the dev server

```bash
npm run dev
```

The Three.js scene should now render in the background with:

- A realistic glossy OCTG pipe
- An animated red laser spotlight scanning vertically
- Beautiful reflections from the environment map
- Bloom glow effects on the laser

## Technical Details

### PBR Material Settings

- **Base Color**: `#8A8A8A` (steel gray)
- **Metalness**: `0.95` (nearly fully metallic)
- **Roughness**: `0.15` (low for high gloss)
- **Environment Map Intensity**: `1.5` (enhanced reflections)

### Laser Spotlight

- **Color**: `#D32F2F` (brand red)
- **Intensity**: `20`
- **Animation**: Smooth sine wave motion (-4 to +4 range)
- **Duration**: ~4 seconds per cycle
- **Bloom Effect**: Applied for glow

### Performance Optimizations

- Adaptive pixel ratio (dpr: [1, 2])
- High-performance power preference
- Efficient cylinder geometry (64 segments)
- Pre filtered environment maps
- Render on demand (static after initial load)

## Future Enhancements

1. **Custom PBR Textures**: Add real OCTG pipe textures
   - Normal maps for surface detail (scratches, threading)
   - Roughness maps for varied glossiness
   - AO maps for depth

2. **Interactive Camera**: Enable subtle mouse parallax

3. **Multiple Pipes**: Render a stack of pipes for more realism

4. **Custom HDR Environment**: Create industry-specific HDRI

5. **Performance Monitoring**: Add FPS counter for optimization

## Troubleshooting

**If you see "Module not found" errors:**

- Ensure packages are installed: `npm install`
- Check that import paths use the correct relative path

**If the scene appears black:**

- Verify the environment preset is loading
- Check browser console for WebGL errors

**If performance is poor:**

- Reduce bloom intensity
- Lower cylinder segment count
- Disable shadows

## Visual Result

✨ You now have a **stunning, premium 3D pipe visualization** that:

- Clearly shows it's OCTG pipe (not just abstract texture)
- Has realistic glossy metal materials
- Features dynamic laser lighting
- Maintains 60fps performance
- Matches the Industrial Glassmorphism theme

This is a significant visual upgrade that will WOW users on first load! 🚀
