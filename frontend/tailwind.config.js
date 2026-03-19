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
          50:  '#e0f2fe',
          100: '#bae6fd',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          500: '#7f97ff',
          600: '#667be6',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: {
          0: '#0f1419',
          50: '#1a1f2e',
          100: '#252d3a',
          200: '#2a3142',
          300: '#3a4555',
          400: '#6b7280',
          500: '#9ca3af',
          600: '#bfdbfe',
          700: '#e5e7eb',
          800: '#f3f4f6',
          900: '#ffffff',
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
