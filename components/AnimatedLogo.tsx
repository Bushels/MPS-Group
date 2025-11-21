'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-600 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Logo */}
      <div className="relative z-10 overflow-hidden rounded-lg p-1">
        <Image
          src="/logo.png"
          alt="MPS Group Logo"
          width={180}
          height={50}
          className="h-12 w-auto object-contain"
          priority
        />

        {/* Scanline Effect */}
        <motion.div
          className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{
            repeat: isHovered ? Infinity : 0,
            duration: 1.5,
            ease: 'linear',
          }}
          style={{ skewX: -20 }}
        />

        {/* Holographic Grid Overlay (Subtle) */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(transparent_2px,#fff_2px)] bg-[size:100%_4px] opacity-0 mix-blend-overlay"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />
      </div>

      {/* Glitch/Chromatic Aberration Clone (Red Shift) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50 mix-blend-screen"
        animate={{
          x: isHovered ? [0, -2, 2, -1, 0] : 0,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          repeat: isHovered ? Infinity : 0,
          duration: 0.2,
          repeatDelay: 2, // Glitch occasionally
        }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={180}
          height={50}
          className="h-12 w-auto object-contain opacity-50 invert filter" // Invert for a weird ghostly effect or just use tint
          style={{ filter: 'sepia(1) saturate(5) hue-rotate(-50deg)' }} // Red tint
        />
      </motion.div>

      {/* Glitch/Chromatic Aberration Clone (Blue Shift) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50 mix-blend-screen"
        animate={{
          x: isHovered ? [0, 2, -2, 1, 0] : 0,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          repeat: isHovered ? Infinity : 0,
          duration: 0.2,
          repeatDelay: 2.1, // Slightly offset from red
        }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={180}
          height={50}
          className="h-12 w-auto object-contain opacity-50"
          style={{ filter: 'sepia(1) saturate(5) hue-rotate(180deg)' }} // Blue tint
        />
      </motion.div>
    </motion.div>
  );
}
