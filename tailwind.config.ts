import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Steampunk color palette
        brass: {
          200: '#fbbf24', // bright brass
          300: '#f59e0b', // medium brass
          400: '#d97706', // warm brass
          500: '#b45309', // deep brass
          600: '#92400e', // dark brass
          700: '#78350f', // darker brass
          800: '#451a03', // darkest brass
        },
        copper: {
          300: '#ea580c',
          400: '#dc2626',
          500: '#b91c1c',
          600: '#991b1b',
        },
        steam: {
          300: '#e5e7eb',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'steampunk-gradient': 'linear-gradient(135deg, #451a03 0%, #78350f 25%, #92400e 50%, #b45309 75%, #d97706 100%)',
      },
      boxShadow: {
        'brass': '0 4px 6px -1px rgba(217, 119, 6, 0.1), 0 2px 4px -1px rgba(217, 119, 6, 0.06)',
        'steampunk': '0 10px 15px -3px rgba(217, 119, 6, 0.1), 0 4px 6px -2px rgba(217, 119, 6, 0.05)',
        'glow': '0 0 20px rgba(252, 211, 77, 0.4)',
      },
      fontFamily: {
        'display': ['Cinzel Decorative', 'serif'],
        'body': ['Lato', 'Montserrat', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "steam": {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.7" },
          "50%": { transform: "translateY(-10px) scale(1.1)", opacity: "1" },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px rgba(252, 211, 77, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(252, 211, 77, 0.6)" },
        },
        "bubble": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "steam": "steam 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "bubble": "bubble 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
