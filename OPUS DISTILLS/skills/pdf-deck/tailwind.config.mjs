/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './presets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#09090b',
          base: '#000000',
          dark: '#050507',
          surface: '#121214',
          raised: '#18181b',
          border: '#27272a',
          hover: '#222226',
        },
        studio: {
          bg: '#09090b',
          sidebar: '#0e0e11',
          panel: '#131317',
          card: '#18181d',
          border: '#232328',
          text: '#fafafa',
          muted: '#8b8b94',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Source Serif 4', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Space Grotesk', 'Archivo', 'sans-serif'],
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
};
