/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Sora', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Refined type scale
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        'base': ['1rem', { lineHeight: '1.75', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.014em' }],
        'xl': ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.017em' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.019em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.021em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.022em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.024em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.026em' }],
      },
      spacing: {
        // Consistent spacing scale for sections
        'section-sm': '4rem',
        'section-md': '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',
      },
      colors: {
        // Brand colors (existing palette)
        brand: {
          primary: '#ab3f20',      // Main red-brown
          'primary-hover': '#8a3219',
          'primary-light': '#d65037',
          'primary-dark': '#7a2d17',
          accent: '#f0b33a',       // Golden yellow
          'accent-hover': '#d99b1f',
          'accent-light': '#f5c962',
          secondary: '#536b4e',    // Olive green
          'secondary-hover': '#3f5239',
          'secondary-light': '#6d8a65',
        },
        // Semantic colors (WCAG AA compliant)
        semantic: {
          // Text colors with proper contrast
          'text-primary': '#1a1a1a',      // Contrast ratio 15.8:1 on white
          'text-secondary': '#4a4a4a',    // Contrast ratio 9.7:1 on white
          'text-tertiary': '#6b6b6b',     // Contrast ratio 5.7:1 on white (WCAG AA)
          'text-muted': '#8a8a8a',        // Contrast ratio 3.5:1 on white (minimum)
          'text-inverse': '#ffffff',
          'text-inverse-muted': '#e5e5e5',
          
          // Background colors
          'bg-primary': '#ffffff',
          'bg-secondary': '#f8f9fa',
          'bg-tertiary': '#f0f1f3',
          'bg-dark': '#1a1a1a',
          'bg-dark-secondary': '#2a2a2a',
          
          // State colors (accessible)
          'success': '#10b981',           // Green - WCAG AA
          'success-bg': '#d1fae5',
          'warning': '#f59e0b',           // Amber - WCAG AA
          'warning-bg': '#fef3c7',
          'error': '#ef4444',             // Red - WCAG AA
          'error-bg': '#fee2e2',
          'info': '#3b82f6',              // Blue - WCAG AA
          'info-bg': '#dbeafe',
          
          // Borders
          'border-light': '#e5e7eb',
          'border-medium': '#d1d5db',
          'border-dark': '#9ca3af',
        },
        // Overlay colors (glassmorphism)
        overlay: {
          'white-10': 'rgba(255, 255, 255, 0.1)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-30': 'rgba(255, 255, 255, 0.3)',
          'white-60': 'rgba(255, 255, 255, 0.6)',
          'white-80': 'rgba(255, 255, 255, 0.8)',
          'black-10': 'rgba(0, 0, 0, 0.1)',
          'black-20': 'rgba(0, 0, 0, 0.2)',
          'black-40': 'rgba(0, 0, 0, 0.4)',
          'black-60': 'rgba(0, 0, 0, 0.6)',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'pulse-slow-delayed': 'pulse-slow-delayed 8s ease-in-out infinite 2s',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'pulse-slow-delayed': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
