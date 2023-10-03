import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { 
    extend: {
      colors: {
        'transparent': 'transparent',
        'current': 'currentColor',
        'womble': {
          dark: '#090e1b',
          light: '#efe9f0',
          accent: '#2187c2',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
  },
  plugins: [],
}
export default config
