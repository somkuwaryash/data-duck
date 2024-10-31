const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Electric blue primary colors
        primary: {
          '50': '#E6FFFD',
          '100': '#B3FFFA',
          '200': '#80FFF7',
          '300': '#4DFFF4',
          '400': '#1AFFF1',
          '500': '#00E6D6',
          '600': '#00B3A7',
          '700': '#008078',
          '800': '#004D48',
          '900': '#001A19',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // Vibrant purple secondary colors
        secondary: {
          '50': '#F3E6FF',
          '100': '#E6CCFF',
          '200': '#CC99FF',
          '300': '#B366FF',
          '400': '#9933FF',
          '500': '#7F00FF',
          '600': '#6600CC',
          '700': '#4C0099',
          '800': '#330066',
          '900': '#190033',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        // Neon accents
        accent: {
          purple: '#B14EFF',
          blue: '#0FF0FF',
          pink: '#FF1493',
          green: '#39FF14',
          yellow: '#FFD700',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        background: {
          DEFAULT: '#0A0B0E',
          subtle: '#12151A',
          muted: '#1A1E24',
          foreground: '#FFFFFF'
        },
        card: {
          DEFAULT: '#12151A',
          hovered: '#1A1E24',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: '#12151A',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#1A1E24',
          foreground: '#B3B8C2'
        },
        destructive: {
          DEFAULT: '#FF3864',
          foreground: '#FFFFFF'
        },
        border: '#2A2F38',
        input: '#2A2F38',
        ring: '#0FF0FF',
        // Vibrant chart colors for data visualization
        chart: {
          blue: '#0FF0FF',
          purple: '#B14EFF',
          pink: '#FF1493',
          green: '#39FF14',
          yellow: '#FFD700'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Custom box shadows with neon glows
      boxShadow: {
        'neon-blue': '0 0 5px #0FF0FF, 0 0 20px rgba(15, 240, 255, 0.3)',
        'neon-purple': '0 0 5px #B14EFF, 0 0 20px rgba(177, 78, 255, 0.3)',
        'neon-pink': '0 0 5px #FF1493, 0 0 20px rgba(255, 20, 147, 0.3)',
      },
      // Custom background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom right, #12151A, #1A1E24)',
      },
      keyframes: {
        'glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")]
}