/**
 * SUKOON Brand Theme Configuration
 * Centralized color system and design tokens for consistent branding
 */

export const theme = {
  colors: {
    // SUKOON Brand Colors
    primary: {
      50: "#f3f0ff",
      100: "#e9e2ff",
      200: "#d6c8ff",
      300: "#b8a0ff",
      400: "#9569ff",
      500: "#66489C", // Main brand color
      600: "#5a3d87",
      700: "#4d3372",
      800: "#40295e",
      900: "#35204d",
    },
    secondary: {
      50: "#f0fdfc",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#12B4AD", // Secondary brand color
      600: "#0f9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    // Neutral colors for text and backgrounds
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    // Status colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Typography scale
  typography: {
    fontFamily: {
      sans: ["sans-serif"],
      arabic: ["Noto Sans Arabic", "system-ui", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
  },

  // Spacing scale
  spacing: {
    section: "5rem", // 80px
    container: "1.5rem", // 24px
  },

  // Animation durations
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// CSS custom properties for runtime theme switching
export const cssVariables = `
  :root {
    --color-primary: ${theme.colors.primary[500]};
    --color-primary-light: ${theme.colors.primary[400]};
    --color-primary-dark: ${theme.colors.primary[600]};
    --color-secondary: ${theme.colors.secondary[500]};
    --color-secondary-light: ${theme.colors.secondary[400]};
    --color-secondary-dark: ${theme.colors.secondary[600]};
    --color-background: ${theme.colors.neutral[50]};
    --color-surface: #ffffff;
    --color-text-primary: ${theme.colors.neutral[900]};
    --color-text-secondary: ${theme.colors.neutral[600]};
    --color-border: ${theme.colors.neutral[200]};
    --spacing-section: ${theme.spacing.section};
    --animation-normal: ${theme.animation.normal};
  }
`

export type Theme = typeof theme
