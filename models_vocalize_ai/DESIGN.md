---
name: Kinetic Intelligence
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#32343e'
  on-surface: '#e1e1ef'
  on-surface-variant: '#c7c4d6'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#918f9f'
  outline-variant: '#464554'
  surface-tint: '#c2c1ff'
  primary: '#c2c1ff'
  on-primary: '#1c0b9f'
  primary-container: '#5856d6'
  on-primary-container: '#e7e4ff'
  inverse-primary: '#4f4ccd'
  secondary: '#adc6ff'
  on-secondary: '#002e69'
  secondary-container: '#4b8eff'
  on-secondary-container: '#00285c'
  tertiary: '#e8b3ff'
  on-tertiary: '#510074'
  tertiary-container: '#9739c6'
  on-tertiary-container: '#f8deff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c2c1ff'
  on-primary-fixed: '#0c006a'
  on-primary-fixed-variant: '#3631b4'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#f6d9ff'
  tertiary-fixed-dim: '#e8b3ff'
  on-tertiary-fixed: '#310048'
  on-tertiary-fixed-variant: '#7201a2'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343e'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 20px
---

## Brand & Style
The design system is engineered for a high-fidelity AI SaaS environment, evoking a sense of "ambient intelligence." The brand personality is sophisticated, visionary, and hyper-efficient. It balances the cold precision of advanced computing with the warmth of human-centric interaction.

The visual style is a fusion of **Advanced Minimalism** and **Refined Glassmorphism**. We utilize deep, expansive dark spaces to create an infinite canvas feel, punctuated by luminous interactive elements. Depth is not communicated through traditional shadows, but through light emission, refraction, and layered translucency. The emotional goal is to make the user feel they are orchestrating powerful technology through a seamless, ethereal interface.

## Colors
The palette is rooted in a "Deep Space" foundation, using a dark charcoal-indigo for the primary canvas to minimize eye strain and maximize the pop of AI-driven insights.

- **Primary (Electric Violet):** Used for primary actions and AI "active" states.
- **Secondary (Vibrant Blue):** Used for secondary interactions and data visualization highlights.
- **Neutral (Charcoal/Indigo):** Forms the base layers of the UI.
- **Surfaces:** We use "Glass" surfaces—semi-transparent blacks (e.g., `rgba(15, 17, 26, 0.6)`) with a `20px` backdrop blur.
- **Accents:** Vibrant gradients (Violet to Blue) are reserved for high-value features like "Generate" or "Analyze" buttons.

## Typography
The typographic hierarchy emphasizes clarity and a technical edge. 
- **Geist** is used for large displays and headlines to provide a sharp, developer-adjacent aesthetic that feels modern and precise.
- **Inter** handles the heavy lifting for body copy and data descriptions, ensuring maximum readability across varying densities of information.
- **JetBrains Mono** is utilized for metadata, system status, and code snippets, reinforcing the "high-tech" nature of the platform.

All headlines should utilize tighter letter-spacing to maintain a "locked-in" professional look, while labels should be slightly tracked out for legibility at small sizes.

## Layout & Spacing
This design system employs a **Fluid Grid** model based on an 8px square rhythm. 

- **Desktop:** A 12-column grid with 24px gutters. Content is housed in "glass" modules that can span multiple columns. 
- **Hierarchy:** High-density data tables and AI playgrounds should use a "Panel" approach where the sidebar is fixed and the main workspace expands fluidly.
- **Breathing Room:** We utilize generous inner padding within cards (minimum 32px) to prevent the complex AI data from feeling cluttered. Large-scale whitespace is used to separate distinct functional areas.

## Elevation & Depth
Depth is achieved through **Luminous Stratification** rather than traditional drop shadows.

1.  **Base Level:** The deep indigo background.
2.  **Mid Level (Glass):** Floating containers with a `1px` inner border (white at 10% opacity) and a `backdrop-filter: blur(20px)`. This creates a frosted-lens effect.
3.  **Top Level (Active):** Elements that are interactive or "processing" emit a soft outer glow (`box-shadow: 0 0 30px var(--accent-glow)`).
4.  **Transitions:** When an element is focused, its backdrop blur should increase slightly, and the border opacity should rise, creating a "lift" effect without physical displacement.

## Shapes
The shape language is defined by **Continuous Curvature**. 

Standard components use a `16px` (1rem) radius to feel approachable and premium. Larger "Glass" containers and dashboard cards should use `24px` (1.5rem) to emphasize their role as structural anchors. Buttons are highly rounded (Pill-shaped) to distinguish them from informational containers. This contrast between the structured grid and the soft, rounded edges of the components creates a sophisticated, "liquid" interface feel.

## Components
- **Buttons:** Primary buttons use a linear gradient (Primary to Tertiary) with white text. Secondary buttons are "Ghost Glass" with a subtle border that glows on hover.
- **Input Fields:** Dark backgrounds (`rgba(255,255,255,0.05)`) with a `1px` bottom border that expands into a full glow when focused.
- **AI Chips:** Small, pill-shaped tags with a subtle pulse animation to indicate "Thinking" or "Live" status. Use JetBrains Mono for the text.
- **Cards:** The primary container. Must have a `1px` stroke (white at 12% opacity) and 20px backdrop blur. Titles inside cards should be Geist SemiBold.
- **Progress Indicators:** Use thin, glowing lines rather than thick bars. Use a "scanning" animation for AI processing states.
- **Scrollbars:** Hidden by default, appearing as thin, semi-transparent grey lines on hover to maintain the minimalist aesthetic.