---
name: Nocturnal Bauhaus
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e7bdb7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#ad8883'
  outline-variant: '#5d3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#ff5545'
  on-primary-container: '#5c0002'
  inverse-primary: '#c0000a'
  secondary: '#fff0c4'
  on-secondary: '#3b2f00'
  secondary-container: '#fad100'
  on-secondary-container: '#6d5a00'
  tertiary: '#adc6ff'
  on-tertiary: '#002e69'
  tertiary-container: '#4b8eff'
  on-tertiary-container: '#00285c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930005'
  secondary-fixed: '#ffe171'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#554600'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#004493'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  mono-label:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: '0'
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  grid-columns: '12'
---

## Brand & Style
This design system reimagines the Bauhaus movement for a high-contrast, digital dark mode. It centers on the philosophy of "form follows function" but filtered through a contemporary, technical lens. The aesthetic is **Bold, Geometric, and Structural**, utilizing a pitch-black foundation to allow primary color accents to vibrate with maximum intensity.

The target audience includes developers, architects, and creative technologists who value precision, mathematical harmony, and a reductionist approach. The UI should evoke a sense of controlled energy, intellectual rigor, and modern industrialism. 

Visual hallmarks include:
- **Strict Geometricity:** Reliance on basic shapes (circles, squares, triangles).
- **Inverted Brutalism:** Raw structural lines and heavy borders, but rendered with high-frequency primary colors against an absolute black void.
- **Asymmetric Balance:** Intentional use of whitespace (blackspace) to create dynamic tension.

## Colors
The palette is restricted to the three primary colors of the Bauhaus school, optimized for digital luminance against a **#000000** background.

- **Primary (Red):** Used for critical actions, errors, and primary brand moments.
- **Secondary (Yellow):** Used for warnings, highlights, and secondary interactive elements.
- **Tertiary (Blue):** Used for informational elements, links, and selection states.
- **Neutral:** Pure white (#FFFFFF) is used for primary headers; a slightly dimmed off-white (#E5E5E5) is used for long-form body text to reduce eye strain.
- **Structural Gray:** A deep charcoal (#1C1C1E) is used sparingly for container backgrounds where separation from the pitch-black base is required.

## Typography
**Space Grotesk** is the exclusive typeface for this design system. Its idiosyncratic geometric terminals and technical feel perfectly mirror the Bauhaus spirit.

- **Headlines:** Use tight tracking and heavy weights. Large display type should be used as a structural element of the layout.
- **Body:** Maintain generous line height for readability against the black background.
- **Labels:** Use "label-caps" for navigation and category headers to provide a rhythmic, architectural feel.
- **Alignment:** Strongly favor left-aligned text to maintain a clear vertical axis.

## Layout & Spacing
The layout is governed by a strict **12-column fixed grid** on desktop and a **4-column fluid grid** on mobile.

- **Mathematical Rhythm:** All spacing must be multiples of 8px.
- **Heavy Gutters:** 24px gutters create "negative space channels" that emphasize the verticality of the design.
- **Asymmetry:** Content should intentionally leave empty columns to the right or left to create a dynamic, editorial feel.
- **Visible Structure:** In specific layouts, the grid itself can be visualized with 1px white or primary-colored strokes.

## Elevation & Depth
This system rejects traditional shadows and depth. It is a **flat, layered environment** where hierarchy is established through:

- **Bold Borders:** Instead of shadows, use 2px or 3px solid borders in white or primary colors to define containers.
- **Tonal Stacking:** Use a "Surface" color (#1C1C1E) to lift cards off the pure black "Base" (#000000).
- **Z-Index via Color:** Elements with higher importance are given a primary color background (Red/Yellow/Blue) which visually "pops" forward against the darkness.
- **No Blurs:** Avoid all glassmorphism or soft blurs. Transitions between layers are immediate and sharp.

## Shapes
The shape language is strictly **Sharp (0px)**.

- **Geometric Purity:** Every container, button, and input must be a perfect rectangle or square. 
- **Iconography:** Use heavy-weight, non-rounded stroke icons. Icons should be constructed from basic geometric shapes.
- **Decorative Elements:** Use circles and triangles as secondary decorative motifs or as specific action indicators (e.g., a perfect circle for a "Play" button or a toggle thumb).

## Components
- **Buttons:** Rectangular with a 2px solid border. Default state is a white border with white text. Hover state fills the background with a primary color (Red or Blue) and switches text to black.
- **Inputs:** 2px solid white bottom-border only. Labels use "label-caps" positioned strictly above the input.
- **Cards:** Background of #1C1C1E with a 1px white border. Headers within cards should be separated by a 1px horizontal rule.
- **Lists:** Items separated by 1px white rules. Use a primary color square (8px x 8px) as a bullet point for high-emphasis lists.
- **Chips/Badges:** Solid blocks of primary colors with black text. No rounded corners.
- **Progress Bars:** A simple 8px tall track. The unfilled portion is #1C1C1E; the filled portion is a solid Primary Yellow.
- **Checkboxes:** Square, 2px stroke. When checked, the box is filled with Primary Blue.