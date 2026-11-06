import type { Config } from "tailwindcss";

/**
 * Ama Parba design tokens.
 * Colour, type, spacing, shadow, radius, motion — single source of truth.
 * CSS custom properties live in src/styles/globals.css and mirror these names.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    // Explicit breakpoints: 360–430 phones are the base (no prefix).
    screens: {
      xs: "430px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F3E9",
          50: "#FDFBF7",
          100: "#F8F3E9",
          200: "#EFE6D5",
          300: "#E3D5BC",
        },
        maroon: {
          DEFAULT: "#751F25",
          50: "#FBF1F1",
          100: "#F0D8D9",
          600: "#8C2A31",
          700: "#751F25",
          800: "#5A161B",
          900: "#3D0F12",
        },
        saffron: {
          DEFAULT: "#D88945",
          100: "#F7E6D4",
          300: "#EDBE92",
          500: "#D88945",
          700: "#B56A2C",
        },
        earth: {
          DEFAULT: "#46362F",
          400: "#7A6459",
          600: "#5A463D",
          700: "#46362F",
          900: "#2A201C",
        },
        sage: {
          DEFAULT: "#7A8669",
          200: "#D5DACC",
          400: "#9BA48C",
          600: "#7A8669",
          800: "#55604A",
        },
      },
      fontFamily: {
        // Loaded via next/font in src/app/layout.tsx
        display: ["var(--font-display)", "var(--font-odia)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "var(--font-odia)", "system-ui", "sans-serif"],
        odia: ["var(--font-odia)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        // Fluid scale — clamp(min, preferred, max). No media queries needed.
        "fluid-xs": ["clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)", { lineHeight: "1.5" }],
        "fluid-sm": ["clamp(0.875rem, 0.84rem + 0.17vw, 0.9375rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)", { lineHeight: "1.7" }],
        "fluid-lg": ["clamp(1.125rem, 1.05rem + 0.37vw, 1.3125rem)", { lineHeight: "1.6" }],
        "fluid-xl": ["clamp(1.375rem, 1.24rem + 0.67vw, 1.75rem)", { lineHeight: "1.4" }],
        "fluid-2xl": ["clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem)", { lineHeight: "1.2" }],
        "fluid-3xl": ["clamp(2.125rem, 1.7rem + 2.1vw, 3.5rem)", { lineHeight: "1.1" }],
        "fluid-4xl": ["clamp(2.5rem, 1.85rem + 3.25vw, 4.75rem)", { lineHeight: "1.05" }],
        "fluid-5xl": ["clamp(3rem, 2rem + 5vw, 6.5rem)", { lineHeight: "1" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        tightish: "-0.015em",
        tighter2: "-0.03em",
      },
      maxWidth: {
        prose: "62ch",
        shell: "1240px",
        wide: "1480px",
      },
      spacing: {
        gutter: "clamp(1rem, 4vw, 2.5rem)",
        section: "clamp(4rem, 9vw, 8.5rem)",
        "section-sm": "clamp(2.5rem, 6vw, 5rem)",
      },
      borderRadius: {
        card: "4px",
        panel: "10px",
        pill: "999px",
      },
      boxShadow: {
        // Warm-tinted shadows — neutral grey reads cold against ivory.
        soft: "0 1px 2px rgba(70,54,47,0.05), 0 6px 20px -8px rgba(70,54,47,0.12)",
        lift: "0 2px 4px rgba(70,54,47,0.06), 0 18px 40px -14px rgba(70,54,47,0.22)",
        deep: "0 30px 70px -28px rgba(70,54,47,0.42)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "180ms",
        base: "320ms",
        slow: "640ms",
        reveal: "900ms",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee-x 36s linear infinite",
        float: "float-y 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
