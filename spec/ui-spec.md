# UI Specification - Weather App

## 1. Overview

This spec defines UI improvements for the weather app, focusing on a clean, light theme with bluish-white color palette, edge case handling, and mobile responsiveness.

## 2. Current State

| Element | Current |
|---------|---------|
| Background | Dark gradient (slate blue to darker slate) |
| Theme | Dark mode only |
| Font | System default |
| Layout | Flexbox centered |
| Edge cases | Basic error/loading states |
| Mobile | Not optimized |

## 3. Desired State

### 3.1 Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#2563EB` (Blue 600) | Buttons, accents, highlights |
| Primary Hover | `#1D4ED8` (Blue 700) | Button hover state |
| Background | `#F8FAFC` (Slate 50) | Page background |
| Card Background | `#FFFFFF` (White) | Weather card |
| Text Primary | `#1E293B` (Slate 800) | Headings, main text |
| Text Secondary | `#64748B` (Slate 500) | Descriptions, labels |
| Border | `#E2E8F0` (Slate 200) | Card borders, inputs |
| Error | `#DC2626` (Red 600) | Error messages |
| Error Background | `#FEF2F2` (Red 50) | Error container |

### 3.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| App Title | System | 2rem | 300 (light) |
| City Name | System | 1.75rem | 500 |
| Temperature | System | 4rem | 200 (light) |
| Body | System | 1rem | 400 |
| Labels | System | 0.75rem | 500 |
| Button | System | 1rem | 500 |

### 3.3 Layout Structure

```
+------------------------------------------+
|                page                      |
|  +------------------------------------+ |
|  |           h1: Weather App          | |
|  +------------------------------------+ |
|  |  +-----------------------------+  | |
|  |  |      search-form             |  | |
|  |  |  [input] [Search button]   |  | |
|  +-----------------------------+----+ |
|  +------------------------------------+ |
|  |        weather-card (white)     |  |
|  |  +---------------------------+  | |
|  |  |     City, Country         |  | |
|  |  +---------------------------+  | |
|  |  +---------------------------+  | |
|  |  |  [icon]      24°C         |  | |
|  |  +---------------------------+  | |
|  |  |     Description          |  | |
|  |  +---------------------------+  | |
|  |  |  Feels | Humidity | Wind |  | |
|  |  +---------------------------+  | |
|  +------------------------------------+ |
+------------------------------------------+
```

### 3.4 Spacing System

| Element | Value |
|---------|-------|
| Page padding | 2rem |
| Card padding | 2rem 2.5rem |
| Gap between sections | 2rem |
| Detail item gap | 2rem |
| Input padding | 14px 20px |
| Border radius (card) | 16px |
| Border radius (input/button) | 12px |

### 3.5 Components

#### Search Form
- Full-width input with placeholder "Enter city name..."
- Search button (blue background, white text)
- Loading state: button disabled, shows "Searching..."
- Focus state: subtle blue border glow

#### Weather Card
- White background
- Subtle shadow: `0 4px 16px rgba(0, 0, 0, 0.08)`
- Border: 1px solid `#E2E8F0`
- Border radius: 16px

#### Error State
- Red background tint (`#FEF2F2`)
- Red border (`#FECACA`)
- Red text (`#DC2626`)
- Border radius: 12px
- Padding: 1rem 1.5rem

#### Placeholder State
- Secondary text color
- Centered text
- "Search for a city to see weather"

### 3.6 Mobile Responsiveness

| Breakpoint | Width |
|-----------|-------|
| Desktop | > 640px |
| Tablet | 481px - 640px |
| Mobile | <= 480px |

#### Mobile Adjustments (480px and below)

| Element | Adjustment |
|---------|------------|
| Page padding | 1rem |
| Card min-width | 100% (no fixed width) |
| Card padding | 1.5rem |
| App title | 1.75rem |
| Temperature | 3rem |
| Weather icon | 80px (from 100px) |
| Detail items gap | 1rem |
| Search form | Column direction (stack) |

### 3.7 Edge Cases

| Case | Handling |
|------|----------|
| Empty input | Button disabled, prevent submit |
| API error | Show error message in red box |
| Loading | Show placeholder, disable button |
| No data | Show "Search for a city..." |
| Very long city name | Truncate with ellipsis |
| Network offline | Show "Unable to fetch weather. Check connection." |
| API rate limit | Show "Too many requests. Try again later." |

### 3.8 Animations & Transitions

| Element | Transition |
|---------|------------|
| Button hover | translateY(-1px), box-shadow increase |
| Input focus | border-color, box-shadow |
| Card load | fade-in (0.3s ease) |
| Temperature change | smooth number transition |

## 4. Acceptance Criteria

### Visual
- [ ] Page has light bluish-white background (#F8FAFC)
- [ ] Weather card is white with subtle shadow
- [ ] Primary button is blue (#2563EB)
- [ ] All text is legible (proper contrast)
- [ ] Consistent spacing throughout

### Responsiveness
- [ ] Usable on mobile (320px+)
- [ ] Search form stacks vertically on mobile
- [ ] Card adapts to screen width

### Edge Cases
- [ ] Empty input disables search button
- [ ] Loading state shows "Searching..."
- [ ] API errors display in styled error box
- [ ] Long city names don't break layout
- [ ] Offline/error states handled gracefully

### Accessibility
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus states visible
- [ ] Buttons have accessible labels

## 5. Implementation Notes

- Change only UI/styling files (App.css, index.css)
- No changes to component logic
- Use CSS variables for theming
- Test on real device or responsive mode
- Preserve existing API integration