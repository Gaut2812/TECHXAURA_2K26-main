# GOLDEN RATIO DESIGN SYSTEM PROMPT
## Layout, Typography, and Text Alignment Guide

---

## 1. GOLDEN RATIO FUNDAMENTALS

### The Golden Ratio (φ)
```
φ (Phi) = 1.618033988749895...
Reciprocal (1/φ) = 0.618033988749895...

Common approximations:
- 1.618 (simplified)
- 8:5 ratio (Fibonacci approximation)
- 13:8 ratio (closer Fibonacci approximation)
- 21:13 ratio (even closer)
```

### Golden Ratio in Design
```
If total width = 1000px
- Primary section = 1000 × 0.618 = 618px
- Secondary section = 1000 × 0.382 = 382px

If total width = 1200px
- Primary section = 1200 × 0.618 = 741.6px ≈ 742px
- Secondary section = 1200 × 0.382 = 458.4px ≈ 458px
```

---

## 2. GOLDEN RATIO GRID LAYOUTS

### 2-Column Layout (Golden Ratio Split)

#### Desktop (1440px width)
```css
.container {
  display: grid;
  grid-template-columns: 890px 550px; /* 1.618:1 ratio */
  gap: 40px; /* Gap based on golden ratio of smaller column */
}

/* Or using fr units */
.container {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  gap: 40px;
}
```

**Visual Representation:**
```
┌────────────────────────────────────────────────────┐
│                                                    │
│  Main Content (890px)         Sidebar (550px)     │
│  ┌──────────────────────┐    ┌─────────────┐     │
│  │                      │    │             │     │
│  │  Primary Area        │    │  Secondary  │     │
│  │  (61.8% width)       │    │  (38.2%)    │     │
│  │                      │    │             │     │
│  └──────────────────────┘    └─────────────┘     │
│                                                    │
└────────────────────────────────────────────────────┘
```

#### Tablet (768px width)
```css
.container {
  display: grid;
  grid-template-columns: 475px 293px; /* 768 × 0.618 = 475 */
  gap: 24px;
}
```

#### Mobile (375px width)
```css
.container {
  display: grid;
  grid-template-columns: 1fr; /* Stack vertically */
  gap: 24px;
}
```

---

### 3-Column Layout (Golden Ratio Distribution)

```css
.three-column {
  display: grid;
  grid-template-columns: 1.618fr 1fr 0.618fr;
  gap: 32px;
}
```

**Visual Distribution:**
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Col 1 (1.618)      Col 2 (1)       Col 3 (0.618)      │
│  ┌──────────┐     ┌──────┐        ┌────┐              │
│  │          │     │      │        │    │              │
│  │ Primary  │     │ Main │        │Sec │              │
│  │          │     │      │        │    │              │
│  └──────────┘     └──────┘        └────┘              │
│                                                          │
└──────────────────────────────────────────────────────────┘

Total ratio parts: 1.618 + 1 + 0.618 = 3.236
If width = 1200px:
- Col 1: (1.618/3.236) × 1200 = 600px
- Col 2: (1/3.236) × 1200 = 371px  
- Col 3: (0.618/3.236) × 1200 = 229px
```

---

### Hero Section (Golden Ratio Height)

```css
.hero {
  /* If viewport height = 1000px */
  height: 618px; /* 1000 × 0.618 */
  
  display: grid;
  grid-template-rows: 382px 236px; /* Split hero itself by golden ratio */
}
```

**Visual:**
```
┌────────────────────────────────────────────┐
│                                            │
│          HERO TITLE (382px)                │ ← 61.8% of hero
│                                            │
├────────────────────────────────────────────┤
│     Hero Subtext / CTA (236px)             │ ← 38.2% of hero
└────────────────────────────────────────────┘
```

---

### Card Grid (Golden Ratio Spacing)

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px 30px; /* Vertical gap × 0.618 = Horizontal gap */
  
  /* 48 × 0.618 ≈ 30 */
}
```

---

## 3. TYPOGRAPHY SCALE (Golden Ratio)

### Font Size Scale

**Base font size: 16px**

```
Scale up (multiply by 1.618):
16 × 1.618 = 25.888 ≈ 26px
26 × 1.618 = 42.068 ≈ 42px
42 × 1.618 = 67.956 ≈ 68px
68 × 1.618 = 110.024 ≈ 110px

Scale down (divide by 1.618):
16 ÷ 1.618 = 9.889 ≈ 10px
10 ÷ 1.618 = 6.18 ≈ 6px (too small, rarely used)
```

**Complete Typography Scale:**
```css
:root {
  /* Golden Ratio Scale */
  --text-xs: 10px;      /* 16 ÷ 1.618 */
  --text-sm: 12px;      /* Adjusted for readability */
  --text-base: 16px;    /* Base size */
  --text-lg: 20px;      /* Adjusted */
  --text-xl: 26px;      /* 16 × 1.618 */
  --text-2xl: 42px;     /* 26 × 1.618 */
  --text-3xl: 68px;     /* 42 × 1.618 */
  --text-4xl: 110px;    /* 68 × 1.618 */
}

/* Usage */
body { font-size: var(--text-base); }
h6 { font-size: var(--text-lg); }
h5 { font-size: var(--text-xl); }
h4 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-4xl); }
h1 { font-size: calc(var(--text-4xl) * 1.2); } /* 132px */
```

---

### Line Height (Golden Ratio)

```css
:root {
  --line-height-tight: 1.2;      /* For headings */
  --line-height-base: 1.618;     /* Golden ratio - body text */
  --line-height-relaxed: 1.8;    /* For large paragraphs */
}

/* Usage */
h1, h2, h3 {
  line-height: var(--line-height-tight);
}

p, li, span {
  line-height: var(--line-height-base);
}

.large-paragraph {
  line-height: var(--line-height-relaxed);
}
```

---

### Letter Spacing (Golden Ratio)

```css
:root {
  --letter-spacing-tight: -0.02em;  /* Headings */
  --letter-spacing-normal: 0em;     /* Body text */
  --letter-spacing-wide: 0.025em;   /* Buttons, labels */
  --letter-spacing-wider: 0.05em;   /* All caps */
}

h1 {
  letter-spacing: var(--letter-spacing-tight);
}

button, .label {
  letter-spacing: var(--letter-spacing-wide);
}

.caps {
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
}
```

---

## 4. TEXT ALIGNMENT RULES

### Alignment by Content Type

```css
/* HEADINGS - Center or Left */
h1, h2 {
  text-align: center;  /* Hero headings */
}

h3, h4, h5, h6 {
  text-align: left;    /* Section headings */
}

/* BODY TEXT - Always Left */
p, li {
  text-align: left;    /* Easiest to read */
}

/* NEVER center body paragraphs - hard to read */
.bad-example {
  text-align: center; /* ❌ DON'T DO THIS for paragraphs */
}

/* BUTTONS - Center text inside */
button {
  text-align: center;
  justify-content: center;
  align-items: center;
}

/* FORMS - Left align labels, inputs */
label {
  text-align: left;
  display: block;
}

input, textarea {
  text-align: left;
}

/* CARDS - Left align content */
.card {
  text-align: left;
}

.card-title {
  text-align: left;  /* or center if card is centered design */
}

/* NAVIGATION - Center or Space Between */
nav {
  display: flex;
  justify-content: center; /* or space-between */
  align-items: center;
}

/* FOOTER - Center for copyright, left for links */
footer {
  text-align: center;
}

.footer-links {
  text-align: left;
}
```

---

### Line Length (Measure) for Readability

```css
/* Optimal line length: 45-75 characters (66 is ideal) */

.text-container {
  max-width: 65ch;  /* 65 characters width */
  margin-left: auto;
  margin-right: auto;
}

/* For different text sizes */
.large-text {
  max-width: 50ch;  /* Shorter for larger text */
}

.small-text {
  max-width: 80ch;  /* Longer for smaller text */
}
```

---

## 5. GOLDEN RATIO SPACING SYSTEM

### Margin & Padding Scale

**Base unit: 8px**

```css
:root {
  /* Golden ratio spacing scale */
  --space-xs: 5px;      /* 8 ÷ 1.618 */
  --space-sm: 8px;      /* Base unit */
  --space-md: 13px;     /* 8 × 1.618 */
  --space-lg: 21px;     /* 13 × 1.618 */
  --space-xl: 34px;     /* 21 × 1.618 */
  --space-2xl: 55px;    /* 34 × 1.618 */
  --space-3xl: 89px;    /* 55 × 1.618 */
  --space-4xl: 144px;   /* 89 × 1.618 */
}

/* Fibonacci sequence (approximates golden ratio) */
:root {
  --fib-1: 8px;
  --fib-2: 13px;
  --fib-3: 21px;
  --fib-4: 34px;
  --fib-5: 55px;
  --fib-6: 89px;
  --fib-7: 144px;
  --fib-8: 233px;
}
```

### Spacing Usage

```css
/* Between elements */
.element + .element {
  margin-top: var(--space-lg); /* 21px */
}

/* Section spacing */
section {
  padding-top: var(--space-3xl);    /* 89px */
  padding-bottom: var(--space-3xl); /* 89px */
}

/* Card padding */
.card {
  padding: var(--space-xl); /* 34px */
}

/* Button padding */
button {
  padding: var(--space-md) var(--space-xl); /* 13px 34px */
}
```

---

## 6. GOLDEN RECTANGLE IN DESIGN

### Card Dimensions

```css
.card {
  width: 400px;
  height: 247px; /* 400 ÷ 1.618 */
  
  /* Or using aspect-ratio */
  aspect-ratio: 1.618 / 1;
}
```

**Visual:**
```
┌───────────────────────────┐
│                           │
│     Golden Rectangle      │
│     Width : Height        │
│     = 1.618 : 1          │
│                           │
└───────────────────────────┘
    Width = 400px
    Height = 247px
```

### Image Dimensions

```css
.hero-image {
  width: 100%;
  aspect-ratio: 1.618 / 1;
  object-fit: cover;
}

.portrait-image {
  aspect-ratio: 1 / 1.618; /* Vertical golden rectangle */
}
```

---

## 7. PRACTICAL EXAMPLES

### Landing Page Hero Section

```css
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 61.8fr 38.2fr; /* Golden ratio split */
  gap: var(--space-2xl);
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-title {
  font-size: var(--text-4xl);      /* 110px */
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-lg);  /* 21px */
  letter-spacing: var(--letter-spacing-tight);
}

.hero-subtitle {
  font-size: var(--text-xl);       /* 26px */
  line-height: var(--line-height-base);
  max-width: 65ch;
  margin-bottom: var(--space-xl);  /* 34px */
}

.hero-cta {
  padding: var(--space-md) var(--space-2xl); /* 13px 55px */
  font-size: var(--text-lg);
  text-align: center;
}
```

---

### Article/Blog Post Layout

```css
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.618fr 1fr; /* Golden ratio */
  gap: var(--space-3xl); /* 89px */
}

.article-content {
  /* Main content in larger section */
  padding: var(--space-2xl);
}

.article-sidebar {
  /* Sidebar in smaller section */
  padding: var(--space-xl);
}

.article-content h1 {
  font-size: var(--text-3xl);      /* 68px */
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-xl);  /* 34px */
  text-align: left;
}

.article-content h2 {
  font-size: var(--text-2xl);      /* 42px */
  margin-top: var(--space-2xl);    /* 55px */
  margin-bottom: var(--space-lg);  /* 21px */
  text-align: left;
}

.article-content p {
  font-size: var(--text-base);     /* 16px */
  line-height: var(--line-height-base); /* 1.618 */
  margin-bottom: var(--space-lg);  /* 21px */
  max-width: 65ch;
  text-align: left;                /* ALWAYS left for paragraphs */
}

.article-content blockquote {
  font-size: var(--text-lg);       /* 20px */
  line-height: var(--line-height-relaxed);
  padding-left: var(--space-xl);   /* 34px */
  border-left: 3px solid;
  margin: var(--space-2xl) 0;      /* 55px */
  font-style: italic;
}
```

---

### Form Layout

```css
.form-container {
  max-width: 618px; /* Golden ratio of 1000px viewport */
  margin: 0 auto;
  padding: var(--space-2xl);
}

.form-group {
  margin-bottom: var(--space-xl); /* 34px */
}

.form-label {
  display: block;
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: var(--space-sm); /* 8px */
  text-align: left; /* Labels always left */
}

.form-input {
  width: 100%;
  padding: var(--space-md) var(--space-lg); /* 13px 21px */
  font-size: var(--text-base);
  text-align: left; /* Input text always left */
}

.form-button {
  width: 100%;
  padding: var(--space-lg) var(--space-xl); /* 21px 34px */
  font-size: var(--text-lg);
  text-align: center; /* Buttons centered */
  margin-top: var(--space-2xl);
}
```

---

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-2xl) var(--space-xl); /* 55px 34px */
  padding: var(--space-3xl);
}

.card {
  aspect-ratio: 1.618 / 1;
  padding: var(--space-xl);
  text-align: left; /* Card content left-aligned */
}

.card-title {
  font-size: var(--text-xl);
  margin-bottom: var(--space-md);
  text-align: left; /* Title left in card */
}

.card-description {
  font-size: var(--text-base);
  line-height: var(--line-height-base);
  margin-bottom: var(--space-lg);
  text-align: left; /* Description left */
}

.card-button {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  text-align: center; /* Button text centered */
}
```

---

## 8. RESPONSIVE GOLDEN RATIO

### Breakpoints Based on Golden Ratio

```css
:root {
  --mobile: 375px;
  --tablet: 607px;    /* 375 × 1.618 */
  --desktop: 982px;   /* 607 × 1.618 */
  --large: 1590px;    /* 982 × 1.618 */
}

@media (min-width: 607px) {
  /* Tablet and up */
  :root {
    --text-base: 18px; /* Scale up base font */
  }
}

@media (min-width: 982px) {
  /* Desktop and up */
  :root {
    --text-base: 20px;
  }
}

@media (min-width: 1590px) {
  /* Large screens */
  :root {
    --text-base: 22px;
  }
}
```

---

## 9. TEXT ALIGNMENT DECISION TREE

```
┌─────────────────────────────────────┐
│   What type of content is it?       │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
   HEADING           PARAGRAPH
      │                 │
      ▼                 ▼
  ┌───────┐        ┌────────┐
  │Center │        │  Left  │ ← ALWAYS LEFT
  │  or   │        │  Only  │
  │ Left  │        └────────┘
  └───┬───┘
      │
      ├─ Hero heading → Center
      ├─ Section heading → Left
      └─ Card heading → Left (or center if card centered)


┌─────────────────────────────────────┐
│   Is it interactive?                 │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
   BUTTON            LINK
      │                 │
      ▼                 ▼
  ┌────────┐        ┌────────┐
  │ Center │        │ Left   │
  │  text  │        │  text  │
  └────────┘        └────────┘


┌─────────────────────────────────────┐
│   Is it in a form?                   │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
    LABEL            INPUT
      │                 │
      ▼                 ▼
  ┌────────┐        ┌────────┐
  │  Left  │        │  Left  │
  └────────┘        └────────┘


┌─────────────────────────────────────┐
│   Is it navigation/menu?             │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Horizontal: Center   │
    │ Vertical: Left       │
    │ Dropdown: Left       │
    └──────────────────────┘
```

---

## 10. COMPLETE EXAMPLE: EVENT CARD

```css
.event-card {
  /* Golden rectangle */
  width: 400px;
  height: 247px;
  
  /* Golden ratio padding */
  padding: var(--space-xl); /* 34px */
  
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  /* All content left-aligned */
  text-align: left;
}

.event-category {
  /* Small label */
  font-size: var(--text-sm);       /* 12px */
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  margin-bottom: var(--space-sm);  /* 8px */
  text-align: left;
}

.event-title {
  font-size: var(--text-xl);       /* 26px */
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-md);  /* 13px */
  text-align: left;
}

.event-description {
  font-size: var(--text-base);     /* 16px */
  line-height: var(--line-height-base);
  margin-bottom: var(--space-lg);  /* 21px */
  text-align: left;
  
  /* Limit lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  
  font-size: var(--text-sm);
}

.event-meta-item {
  text-align: left;
}

.event-button {
  align-self: flex-start; /* Button on left */
  padding: var(--space-sm) var(--space-lg); /* 8px 21px */
  font-size: var(--text-base);
  text-align: center; /* Text inside button centered */
}
```

---

## 11. ACCESSIBILITY CONSIDERATIONS

```css
/* Ensure sufficient contrast */
:root {
  --text-primary: #000000;
  --text-secondary: #4A5568;
  --background: #FFFFFF;
}

/* Minimum font sizes for accessibility */
body {
  font-size: clamp(16px, 1vw + 0.5rem, 20px);
}

/* Focus indicators */
*:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: var(--space-xs); /* 5px */
}

/* Proper heading hierarchy */
/* Don't skip levels: h1 → h2 → h3 (not h1 → h3) */
```

---

## 12. GOLDEN RATIO CHEAT SHEET

### Quick Reference

```
GOLDEN RATIO: 1.618
RECIPROCAL: 0.618

FONT SIZES (base 16px):
10px, 16px, 26px, 42px, 68px, 110px

SPACING (base 8px):
5px, 8px, 13px, 21px, 34px, 55px, 89px, 144px

LAYOUT SPLITS:
- 61.8% / 38.2% (two sections)
- 1.618fr / 1fr (grid columns)

TEXT ALIGNMENT:
- Headings: Center or Left
- Paragraphs: ALWAYS Left
- Buttons: Center
- Forms: Left
- Navigation: Center or Space-between

LINE HEIGHT:
- Headings: 1.2
- Body: 1.618
- Large text: 1.8

LINE LENGTH:
- Optimal: 65 characters
- Range: 45-75 characters
```

---

Use this prompt to create harmonious, readable, and aesthetically pleasing layouts with proper typography!
