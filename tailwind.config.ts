import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MPS Brand Colors - Industrial Glassmorphism
        'mps-red': {
          DEFAULT: '#D32F2F',
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        'mps-blue': {
          DEFAULT: '#1976D2',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        // Dark mode HUD palette
        'hud-bg': '#050505',
        'hud-panel': '#0A0F1E',
        'hud-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backdropBlur: {
        'glass-sm': '4px',
        'glass': '12px',
        'glass-lg': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-red': '0 0 20px rgba(211, 47, 47, 0.5), 0 0 40px rgba(211, 47, 47, 0.3)',
        'glass-blue': '0 0 20px rgba(25, 118, 210, 0.5), 0 0 40px rgba(25, 118, 210, 0.3)',
      },
      animation: {
        'scan-vertical': 'scan-vertical 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'scan-vertical': {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
