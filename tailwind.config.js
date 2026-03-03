/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   './pages/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.{js,ts,jsx,tsx,mdx}',
'./app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE7D9',
          darker: '#E0D8C8',
        },
        ink: {
          DEFAULT: '#0D0D0D',
          soft: '#1A1A1A',
          muted: '#3D3530',
        },
        orange: {
          DEFAULT: '#C4500A',
          light: '#E05E0E',
          pale: '#F5E6D8',
        },
        amber: {
          DEFAULT: '#E8A838',
          light: '#F5C96B',
          pale: '#FDF6E3',
        },
        muted: '#8A7F72',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.05em' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'vinyl-spin': 'vinylSpin 3s linear infinite',
        'vinyl-slow': 'vinylSpinSlow 8s linear infinite',
        'ticker': 'ticker 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        vinylSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        vinylSpinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(196, 80, 10, 0.12)',
        'warm-lg': '0 12px 48px rgba(196, 80, 10, 0.18)',
        'card': '0 2px 16px rgba(13, 13, 13, 0.08)',
        'card-hover': '0 20px 48px rgba(13, 13, 13, 0.14)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};