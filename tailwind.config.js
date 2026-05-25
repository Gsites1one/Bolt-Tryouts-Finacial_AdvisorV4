/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Theme-aware tokens (CSS variables defined in tailwind.css)
        background: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--accent) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
          violet: "rgb(var(--accent-violet) / <alpha-value>)",
          cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },

        // Constant brand colors (used for fixed dark heroes / CTA banners)
        ink: "#0A0F1A",
        paper: "#FFFFFF",
        aurora: {
          base: "#070A12",
          mint: "#3FE5BA",
          violet: "#B66EFF",
          cyan: "#5BD0F4",
          teal: "#0B4F4A",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Geist"', '"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw + 1rem, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 8px 30px rgb(11 79 74 / 0.08)",
        glow: "0 0 40px rgb(63 229 186 / 0.35)",
        "glow-lg": "0 0 80px rgb(63 229 186 / 0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgb(var(--foreground) / 0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-a": {
          "0%, 100%": { transform: "translate3d(-10%, -15%, 0) scale(1)" },
          "33%": { transform: "translate3d(15%, -5%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-15%, 10%, 0) scale(0.92)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate3d(20%, 10%, 0) scale(1)" },
          "50%": { transform: "translate3d(-10%, -15%, 0) scale(1.2)" },
        },
        "aurora-c": {
          "0%, 100%": { transform: "translate3d(-5%, 20%, 0) scale(1.1)" },
          "40%": { transform: "translate3d(20%, -10%, 0) scale(0.95)" },
          "80%": { transform: "translate3d(-15%, 5%, 0) scale(1.05)" },
        },
        "aurora-d": {
          "0%, 100%": { transform: "translate3d(0%, 0%, 0) scale(1)" },
          "25%": { transform: "translate3d(-25%, 15%, 0) scale(1.1)" },
          "75%": { transform: "translate3d(20%, -10%, 0) scale(0.9)" },
        },
        "spin-slow": {
          from: { transform: "translate(-50%, 0) rotate(0deg)" },
          to: { transform: "translate(-50%, 0) rotate(360deg)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.4)" },
        },
        "beam-fall": {
          "0%, 100%": { opacity: "0.3", transform: "translateX(-50%) scaleY(1)" },
          "50%": { opacity: "0.7", transform: "translateX(-50%) scaleY(1.05)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "aurora-a": "aurora-a 18s ease-in-out infinite",
        "aurora-b": "aurora-b 22s ease-in-out infinite",
        "aurora-c": "aurora-c 16s ease-in-out infinite",
        "aurora-d": "aurora-d 24s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        "draw-line": "draw-line 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "beam-fall": "beam-fall 6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
