/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdf9',
          100: '#e0faf3',
          200: '#c1f3e7',
          300: '#a2ecdb',
          400: '#83e5cf',
          500: '#2D5F4F',
          600: '#1f4238',
          700: '#162f28',
          800: '#0d1f18',
          900: '#050f0a',
        },
        secondary: {
          500: '#7f97ff',
          600: '#667be6',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['14px', { lineHeight: '1.5' }],
        caption: ['12px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        card: '16px',
        inner: '12px',
        pill: '9999px',
      },
      spacing: {
        sidebar: '260px',
        topbar: '72px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 20px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
