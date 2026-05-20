/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inverse-on-surface": "#2e303a",
        "on-tertiary": "#510074",
        "tertiary-fixed-dim": "#e8b3ff",
        "secondary-container": "#4b8eff",
        "surface-container-high": "#282933",
        "on-primary-fixed": "#0c006a",
        "primary": "#c2c1ff",
        "on-secondary-fixed-variant": "#004493",
        "on-secondary-container": "#00285c",
        "on-surface-variant": "#c7c4d6",
        "on-error-container": "#ffdad6",
        "background": "#11131c",
        "primary-container": "#5856d6",
        "on-tertiary-container": "#f8deff",
        "surface-container": "#1d1f29",
        "on-surface": "#e1e1ef",
        "secondary-fixed": "#d8e2ff",
        "on-primary-container": "#e7e4ff",
        "surface-container-highest": "#32343e",
        "surface-bright": "#373943",
        "secondary": "#adc6ff",
        "primary-fixed": "#e2dfff",
        "on-secondary-fixed": "#001a41",
        "surface-variant": "#32343e",
        "outline": "#918f9f",
        "on-background": "#e1e1ef",
        "on-tertiary-fixed-variant": "#7201a2",
        "tertiary-container": "#9739c6",
        "on-primary": "#1c0b9f",
        "inverse-surface": "#e1e1ef",
        "primary-fixed-dim": "#c2c1ff",
        "surface": "#11131c",
        "on-tertiary-fixed": "#310048",
        "on-error": "#690005",
        "error-container": "#93000a",
        "surface-container-lowest": "#0c0e17",
        "surface-dim": "#11131c",
        "surface-container-low": "#191b24",
        "outline-variant": "#464554",
        "tertiary-fixed": "#f6d9ff",
        "tertiary": "#e8b3ff",
        "secondary-fixed-dim": "#adc6ff",
        "inverse-primary": "#4f4ccd",
        "on-secondary": "#002e69",
        "on-primary-fixed-variant": "#3631b4",
        "error": "#ffb4ab",
        "surface-tint": "#c2c1ff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-max": "1440px",
        "unit": "8px",
        "margin-desktop": "40px",
        "margin-mobile": "20px",
        "gutter": "24px"
      },
      fontFamily: {
        "label-sm": ["JetBrains Mono"],
        "body-md": ["Inter"],
        "headline-md": ["Geist"],
        "display-lg": ["Geist"],
        "body-lg": ["Inter"],
        "display-lg-mobile": ["Geist"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    }
  }
};
