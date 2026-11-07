---
name: CalorieIQ
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ef9900'
  on-tertiary-container: '#5c3800'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies a modern, clinical-yet-nurturing wellness aesthetic. It rejects the punitive, red-numbered anxiety of legacy calorie counters in favor of biometric clarity, encouragement, and mindful dietary balance. The emotional response is centered around control, lightness, and daily reassurance.

The visual style merges **Minimalist Precision** with **Soft Tactility**:
- Pristine white content surfaces rest over a soft, tinted sage canvas to relieve eye strain during frequent daily logging.
- Contrast is engineered with intention: authoritative dark slate text anchors complex macronutrient data without harsh pitch-black extremes.
- Micro-interactions favor fluid, organic physics—subtle progress arc fills, gentle scale transitions on log confirmations, and crisp, luminous state shifts.

## Colors

The palette establishes a deliberate botanical-clinical hierarchy:

- **Primary (`#22C55E` with `#34D399` / `#4ADE80` tints)**: Functions as the anchor for positive progress, caloric targets on track, primary calls to action, and fresh vitality indicators.
- **Secondary (`#0F766E` / Deep Sea Teal)**: Used for analytical depth—water intake monitoring, micronutrient tracking, secondary data viz lines, and grounding badges.
- **Tertiary (`#F59E0B` / Warm Amber)**: Highlights fats and energy expenditure, providing an energetic counterbalance to cool greens and slates without conveying error or penalty.
- **Neutral & Surface Hierarchy**:
  - `canvas`: `#F8FAF9` (soft off-white with an imperceptible sage undertone to eliminate cold sterile gray).
  - `surface-elevated`: `#FFFFFF` (crisp, reflective white for cards and interaction zones).
  - `border-subtle`: `#E2E8F0` (neutral partition) and `#DCFCE7` (contextual green accent borders for active meals or targets met).
  - `text-primary`: `#0F172A` (deep slate for peak legibility in bright environments).
  - `text-secondary`: `#475569` (mid-slate for units, nutrition sub-labels, and timestamps).
  - `text-muted`: `#94A3B8` (unfocused state labels, placeholder markers).

## Typography

The type system relies on **Plus Jakarta Sans** across all roles. Its geometric foundation, open counters, and subtle humanist nuances produce a friendly yet clinical presence ideal for fast numeric scanning.

- **Tabular Figures**: Always enable `font-variant-numeric: tabular-nums` across food weight quantities, calorie tallies, and macro ring stats to prevent layout jittering during live count increments.
- **Metric Emphasis**: The `numeric-metric` token pairs strict tight kerning with heavy weight to make remaining calorie allowances legible at a glance without dominating auxiliary meal list items.
- **Micro Labels**: Macro breakdown pills (Carbs, Protein, Fat) employ `label-sm` with upper-case tracking to maintain crystal-clear definition within compact capsules.

## Layout & Spacing

The mobile layout employs an intentional fluid vertical stack anchored to safe-area boundaries, maximizing thumb reach for frequent single-handed interactions.

- **Mobile Rhythm (Phone)**: 
  - Outer boundary uses `margin: 1.25rem` (20px) to maximize screen real estate while keeping touch targets safe from device edge gestures.
  - Column gutters adhere to `gutter: 1rem` (16px) for 2-up macro cards and quick-add grids.
  - Interactive touch points enforce a minimum bounding box of 44x44px, despite compact visual label heights.
- **Tablet Reflow**:
  - Shifts from a single vertical feed to a 2-column asymmetric dashboard. Left column hosts persistent summary rings and macro dials; right column houses segmented meal logs and timeline entries. Outer margin scales up to `1.5rem`.
- **Internal Grouping**:
  - Related nutritional values group tightly using `space-xs` and `space-sm`.
  - Component separation within meal cards uses `space-md`.
  - Section-to-section breaks (e.g., Breakfast to Lunch cards) enforce `space-lg`.

## Elevation & Depth

Visual hierarchy uses a refined combination of **tonal stratification** and **ambient sage-tinted micro-shadows**, avoiding dense black drops:

- **Level 0 (Canvas)**: Non-interactive base canvas rendered in `#F8FAF9`.
- **Level 1 (Surface Cards & Containers)**: Crisp `#FFFFFF` surfaces layered with a dual-shadow technique:
  - Ambient: `0 1px 3px rgba(15, 23, 42, 0.04)`
  - Key: `0 8px 24px rgba(34, 197, 94, 0.05)` (subtle botanical light refraction)
  - Perimeter: 1px border stroke with `#E2E8F0` at 70% opacity.
- **Level 2 (Active Modals & Quick Action Sheets)**: Elevated bottom-sheets utilize `0 20px 35px -10px rgba(15, 23, 42, 0.08)` complemented by an upper 1px inner glow stroke (`rgba(255, 255, 255, 0.8)`).
- **Floating Action Buttons (FAB)**: Primary circular add-meal button features an active glow: `0 8px 20px rgba(34, 197, 94, 0.35)`, creating instant physical affordance.

## Shapes

The design uses balanced, modern curves (`roundedness: 2` base) to communicate bodily health, organic nourishment, and approachable technology:

- **Cards & Dashboard Panels**: Uniformly styled with `rounded-lg` (16px / 1rem) to frame data into digestible, pillowy segments.
- **Inputs & Meal Line Items**: Styled with base roundedness (8px / 0.5rem) for clean alignment with software keyboards.
- **Floating Badges, Status Chips & Primary Buttons**: Fully pill-shaped (`rounded-full` / 9999px) to invite direct fingertip tapping and highlight nutritional categorization.

## Components

### Buttons
- **Primary Action (Log Meal / Save)**: Full-width or pill container filled with `#22C55E`, crisp `#FFFFFF` semi-bold text, elevated by a subtle green aura shadow. Pressed state compresses gently to `scale(0.98)` with `#16A34A` background.
- **Secondary Action**: Background `#F0FDF4`, text `#15803D`, border `1px solid #DCFCE7`. No drop shadow.
- **Ghost Action**: Transparent surface, `#475569` slate text, active state tinted to `#F1F5F9`.

### Nutritional Macro Chips
- Compact pill-shaped containers (`rounded-full`) with a soft background tint and a high-contrast label:
  - **Protein**: Pale ocean tint (`#F0FDFA`), `#0F766E` text, border `#CCFBF1`.
  - **Carbs**: Pale mint tint (`#F0FDF4`), `#16A34A` text, border `#DCFCE7`.
  - **Fat**: Warm honey tint (`#FEF3C7`), `#B45309` text, border `#FDE68A`.
  - Spacing: 6px vertical padding, 12px horizontal padding.

### Lists & Meal Logs
- Borderless interior list rows stacked within an enclosing Level 1 White Card.
- Row separators use hairline dividers (`1px solid #F1F5F9`) indented past food thumbnail icons.
- Trailing metadata balances calorie total in bold slate (`#0F172A`) over macro distribution sub-lines in muted gray (`#94A3B8`).

### Input Fields & Food Search
- White fill surface (`#FFFFFF`) with a `1px solid #E2E8F0` border.
- Placeholder styled in `#94A3B8` `body-md`.
- Focus state expands an outer ring: `3px solid rgba(74, 222, 128, 0.25)` and tints border to `#22C55E`. Includes a clear button (`x`) with a generous 40px tap area.

### Caloric Dashboard Dial (Specialty Component)
- Centered on the dashboard: a concentric SVG progress ring displaying net intake against total allowance.
- Track uses `#E2E8F0` with a smooth round stroke cap.
- Primary active progress bar uses a multi-stop gradient spanning `#4ADE80` to `#22C55E`.
- Center core displays `numeric-metric` for remaining calories, stacked vertically over an uppercase `label-md` unit descriptor ("KCAL REMAINING").

### Segmented Barcode & AI Camera Toggle
- Positioned in the search bar header; pill container with `#F1F5F9` background.
- Sliding pill indicator in `#FFFFFF` with micro-shadow `0 2px 4px rgba(0, 0, 0, 0.06)` highlights the active search mode (Text, Barcode, Photo).