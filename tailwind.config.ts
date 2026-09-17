import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          espresso: "#211A17",
          ivory: "#F7F2EA",
          rose: "#C98F87",
          champagne: "#C9A46C",
          charcoal: "#292624",
          muted: "#766D67",
          cardBg: "#FFFFFF",
          softIvory: "#EFE8DC",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      animation: {
        'draw-path': 'draw 3s ease-in-out forwards',
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
