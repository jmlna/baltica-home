/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5', // Main background - warm off-white
          100: '#F5F0EB', // Alt section background
          200: '#EFE7DD', // Hover surface
        },
        soft: '#EAE3D9', // Soft border color
        surface: '#FFFFFF', // Card / surface background
        sage: {
          DEFAULT: '#8A9A86', // Primary Accent - Sage Green
          hover: '#5E6F5A',  // Deep Sage hover
          light: '#EBF0EA',  // Sage tint - soft pill background
        },
        marine: {
          DEFAULT: '#2C3E50', // Secondary - Muted Marine Slate
          dark: '#243342',
          light: '#4A6179',
        },
        ink: '#2D3748', // Headers - Warm Slate Dark
        muted: '#4A5568', // Body - Soft Muted
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'shine': 'shine 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)', opacity: '0.55' },
          '50%': { transform: 'rotate(90deg) scale(1.08)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}