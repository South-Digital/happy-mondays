/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#22201C',
          72: 'rgba(34,32,28,0.72)',
          60: 'rgba(34,32,28,0.60)',
          55: 'rgba(34,32,28,0.55)',
          50: 'rgba(34,32,28,0.50)',
        },
        muted: '#807B73',
        offwhite: '#FAF9F6',
        cobalt: '#2563EB',
        tile: '#F3F2EE',
        line: '#ECEAE6',
        'soft-blue': '#ECF2FE',
        pos: { DEFAULT: '#288C48', bg: '#EAF6ED', border: '#D0E8D6' },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        ui: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Desktop
        hero: ['80px', { lineHeight: '80px', letterSpacing: '-4.4px', fontWeight: '500' }],
        // Tablet: 56px at 768 rising to 80px at 1280, where `hero` takes over.
        'hero-t': [
          'clamp(56px, 4.6875vw + 20px, 80px)',
          {
            lineHeight: '1',
            // Tracks with the size so it meets the desktop -4.4px at 1280
            // without a step: -2.52px at 768 to -4.4px at 1280.
            letterSpacing: 'clamp(-4.4px, calc(0.3px - 0.367vw), -2.52px)',
            fontWeight: '500',
          },
        ],
        subline: ['18px', { lineHeight: '28.8px' }],
        section: ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        tagline: ['13px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '500' }],
        'card-title': ['22px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'card-desc': ['16px', { lineHeight: '24px' }],
        nav: ['14px', { lineHeight: '21px' }],
        // Mobile (§5)
        'hero-m': ['44px', { lineHeight: '44px', letterSpacing: '-0.03em', fontWeight: '500' }],
        'subline-m': ['16px', { lineHeight: '24px' }],
        'section-m': ['32px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'tagline-m': ['12px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      borderRadius: {
        rim: '25px',
        'rim-lg': '30px',
        'rim-in': '18px',
        'rim-in-lg': '22px',
        chip: '16px',
        'chip-lg': '18px',
        pill: '999px',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      boxShadow: {
        rim: '0 16px 40px rgba(28,33,48,.12)',
        'rim-lg': '0 24px 56px rgba(28,33,48,.12)',
        chip: '0 12px 30px rgba(28,33,48,.12)',
      },
    },
  },
  plugins: [],
}
