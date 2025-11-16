# 🎨 Cviro Color System - WCAG Compliant

## Overview
Color system được thiết kế theo chuẩn WCAG AA/AAA với contrast ratios đảm bảo accessibility cho mọi người dùng.

---

## 1. Brand Colors

### Primary (Red-Brown)
```jsx
// Main brand color
bg-brand-primary           // #ab3f20
hover:bg-brand-primary-hover  // #8a3219
bg-brand-primary-light     // #d65037
bg-brand-primary-dark      // #7a2d17
```

### Accent (Golden Yellow)
```jsx
bg-brand-accent            // #f0b33a
hover:bg-brand-accent-hover   // #d99b1f
bg-brand-accent-light      // #f5c962
```

### Secondary (Olive Green)
```jsx
bg-brand-secondary         // #536b4e
hover:bg-brand-secondary-hover // #3f5239
bg-brand-secondary-light   // #6d8a65
```

---

## 2. Semantic Colors (WCAG AA Compliant)

### Text Colors
```jsx
// Primary text - Contrast 15.8:1 (WCAG AAA)
text-semantic-text-primary      // #1a1a1a on white

// Secondary text - Contrast 9.7:1 (WCAG AAA)
text-semantic-text-secondary    // #4a4a4a on white

// Tertiary text - Contrast 5.7:1 (WCAG AA)
text-semantic-text-tertiary     // #6b6b6b on white

// Muted text - Contrast 3.5:1 (minimum)
text-semantic-text-muted        // #8a8a8a on white

// Inverse (on dark backgrounds)
text-semantic-text-inverse      // #ffffff
text-semantic-text-inverse-muted // #e5e5e5
```

### Background Colors
```jsx
bg-semantic-bg-primary          // #ffffff
bg-semantic-bg-secondary        // #f8f9fa
bg-semantic-bg-tertiary         // #f0f1f3
bg-semantic-bg-dark             // #1a1a1a
bg-semantic-bg-dark-secondary   // #2a2a2a
```

### State Colors
```jsx
// Success
bg-semantic-success             // #10b981
bg-semantic-success-bg          // #d1fae5
text-green-700                  // For text

// Warning
bg-semantic-warning             // #f59e0b
bg-semantic-warning-bg          // #fef3c7
text-amber-700                  // For text

// Error
bg-semantic-error               // #ef4444
bg-semantic-error-bg            // #fee2e2
text-red-700                    // For text

// Info
bg-semantic-info                // #3b82f6
bg-semantic-info-bg             // #dbeafe
text-blue-700                   // For text
```

### Borders
```jsx
border-semantic-border-light    // #e5e7eb
border-semantic-border-medium   // #d1d5db
border-semantic-border-dark     // #9ca3af
```

---

## 3. Overlay Colors (Glassmorphism)

```jsx
// White overlays
bg-overlay-white-10    // rgba(255, 255, 255, 0.1)
bg-overlay-white-20    // rgba(255, 255, 255, 0.2)
bg-overlay-white-30    // rgba(255, 255, 255, 0.3)
bg-overlay-white-60    // rgba(255, 255, 255, 0.6)
bg-overlay-white-80    // rgba(255, 255, 255, 0.8)

// Black overlays
bg-overlay-black-10    // rgba(0, 0, 0, 0.1)
bg-overlay-black-20    // rgba(0, 0, 0, 0.2)
bg-overlay-black-40    // rgba(0, 0, 0, 0.4)
bg-overlay-black-60    // rgba(0, 0, 0, 0.6)
```

---

## 4. Component Classes

### Buttons
```jsx
// Primary button
<button className="btn-primary">Click me</button>

// Secondary button
<button className="btn-secondary">Click me</button>

// Accent button
<button className="btn-accent">Click me</button>

// Outline button
<button className="btn-outline">Click me</button>
```

### Glass Morphism
```jsx
// Light glass
<div className="glass-light p-6 rounded-2xl">
  Content with backdrop blur
</div>

// Dark glass
<div className="glass-dark p-6 rounded-2xl">
  Content with dark overlay
</div>
```

### Text Utilities
```jsx
<h1 className="text-primary">Primary heading</h1>
<p className="text-secondary">Secondary text</p>
<span className="text-tertiary">Tertiary text</span>
<small className="text-muted">Muted text</small>
```

---

## 5. Migration Guide

### ❌ OLD (Non-accessible)
```jsx
// Poor contrast
<p className="text-white/90">Text</p>
<p className="text-gray-500">Text</p>

// Inconsistent colors
<button className="bg-[#ab3f20] hover:bg-[#8a3219]">

// No semantic meaning
<div className="bg-white/60">
```

### ✅ NEW (WCAG compliant)
```jsx
// Proper contrast
<p className="text-semantic-text-primary">Text</p>
<p className="text-secondary">Text</p>

// Consistent brand colors
<button className="btn-primary">

// Semantic overlay
<div className="glass-light">
```

---

## 6. Best Practices

### ✅ DO
- Use semantic color tokens (`text-primary`, `bg-semantic-bg-primary`)
- Use component classes for consistency (`btn-primary`, `glass-light`)
- Test contrast ratios with browser DevTools
- Use brand colors for CTAs and key elements
- Use state colors for feedback (success, error, warning)

### ❌ DON'T
- Don't use arbitrary opacity values (`text-white/75`)
- Don't hardcode hex colors directly in components
- Don't use low-contrast text on backgrounds
- Don't ignore focus states for keyboard navigation

---

## 7. Accessibility Checklist

- [ ] Text has minimum 4.5:1 contrast ratio (WCAG AA)
- [ ] Large text has minimum 3:1 contrast ratio
- [ ] Interactive elements have visible focus states
- [ ] Color is not the only indicator (use icons + text)
- [ ] Form errors are clearly visible
- [ ] Disabled states are distinguishable

---

## 8. Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
