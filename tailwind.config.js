module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Light Orange primary accent
        primary: {
          50: "#FFF6EC",
          100: "#FFE8D6",
          200: "#FFD4AE",
          300: "#FFC98D",
          400: "#FFC98D",
          500: "#FFB86C",
          600: "#E09B4E",
          700: "#C47F35",
          800: "#9E6122",
          900: "#111827"
        },
        // Clean high-contrast neutral palette
        cream: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#D1D5DB", // Distinct border
          400: "#9CA3AF", // Visible placeholders
          500: "#6B7280", // Icons / secondary text
          600: "#4B5563",
          700: "#374151", // Form labels
          800: "#1F2937",
          900: "#111827"  // Main dark text
        },
        warm: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827"
        },
        dark: {
          bg: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E5E7EB"
        },
        slate: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827"
        },
        gray: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827"
        },
        blue: {
          50: "#FFF6EC",
          100: "#FFE8D6",
          500: "#FFB86C",
          600: "#E09B4E",
          700: "#C47F35"
        },
        rose: {
          50: "#FFF6EC",
          100: "#FFE8D6",
          500: "#FFB86C",
          600: "#E09B4E",
          700: "#C47F35"
        },
        emerald: {
          50: "#FFF6EC",
          100: "#FFE8D6",
          500: "#FFB86C",
          600: "#E09B4E",
          700: "#C47F35"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(249, 250, 251, 1))"
      }
    }
  },
  plugins: [],
  safelist: [
    "bg-white",
    "text-gray-900",
    "text-warm-900",
    "bg-primary-500",
    "bg-primary-600"
  ]
};
