// Color system variables - easily customizable for your brand
export const colors = {
  // Primary brand colors
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Main primary
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Secondary colors
  secondary: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },

  // Accent colors
  accent: {
    50: "#fef7ff",
    100: "#fceeff",
    200: "#f8daff",
    300: "#f2b8ff",
    400: "#e879ff",
    500: "#d946ef", // Main accent
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },

  // Neutral colors
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
}

// CSS custom properties for easy theming
export const cssVariables = `
  :root {
    --color-primary: ${colors.primary[500]};
    --color-primary-light: ${colors.primary[400]};
    --color-primary-dark: ${colors.primary[600]};
    --color-secondary: ${colors.secondary[500]};
    --color-accent: ${colors.accent[500]};
    --color-neutral: ${colors.neutral[500]};
    --color-background: ${colors.neutral[50]};
    --color-surface: #ffffff;
    --color-text-primary: ${colors.neutral[900]};
    --color-text-secondary: ${colors.neutral[600]};
    --color-border: ${colors.neutral[200]};
  }
`
