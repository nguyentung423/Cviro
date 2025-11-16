# 🎨 Cviro Design System

> Modern, accessible, and production-ready component library for Cviro Event Platform

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Design Tokens](#design-tokens)
4. [Components](#components)
5. [Best Practices](#best-practices)
6. [Resources](#resources)

---

## Overview

Cviro Design System là bộ component library hoàn chỉnh với:

- ✅ **Typography System** - Sora + Inter font pairing
- ✅ **Color System** - WCAG AA/AAA compliant
- ✅ **Component States** - Loading, error, empty, disabled
- ✅ **Accessibility** - Keyboard navigation, ARIA labels, screen reader support
- ✅ **Responsive** - Mobile-first design
- ✅ **Performance** - Lazy loading, optimized images

---

## Getting Started

### Installation

Components are already integrated. Import and use:

```jsx
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Avatar from '@/components/Avatar/Avatar';

function MyComponent() {
  return (
    <div>
      <Avatar name="Ngọc Anh" size="lg" />
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

### Tailwind Classes

Use design tokens in your components:

```jsx
<div className="bg-semantic-bg-primary text-semantic-text-primary">
  <h1 className="font-heading text-4xl">
    Heading with Sora
  </h1>
  <p className="font-sans text-base">
    Body text with Inter
  </p>
</div>
```

---

## Design Tokens

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-heading` | Sora | Headings (h1-h6) |
| `font-sans` | Inter | Body text, UI |

**Sizes:**
- `text-xs` to `text-6xl` with optimized line-height
- Vietnamese-optimized letter-spacing

### Colors

#### Brand Colors
```jsx
bg-brand-primary        // #ab3f20 (Red-brown)
bg-brand-accent         // #f0b33a (Golden yellow)
bg-brand-secondary      // #536b4e (Olive green)
```

#### Semantic Colors (WCAG Compliant)
```jsx
text-semantic-text-primary      // #1a1a1a (15.8:1 contrast)
text-semantic-text-secondary    // #4a4a4a (9.7:1 contrast)
bg-semantic-success             // Success green
bg-semantic-error               // Error red
```

#### Component Classes
```jsx
className="btn-primary"         // Primary button
className="glass-light"         // Glassmorphism effect
className="shadow-brand-primary" // Brand shadow
```

### Spacing

```jsx
py-section-sm    // 4rem (64px)
py-section-md    // 6rem (96px)
py-section-lg    // 8rem (128px)
py-section-xl    // 10rem (160px)
```

---

## Components

### Form Components

#### Button
```jsx
<Button variant="primary" size="md" loading={isLoading}>
  Submit
</Button>
```
**Variants:** primary, secondary, accent, outline, ghost, danger

#### Input
```jsx
<Input 
  label="Email"
  type="email"
  error={errors.email}
  icon={MailIcon}
  required
/>
```

#### Textarea
```jsx
<Textarea 
  label="Description"
  rows={5}
  helperText="Max 500 characters"
/>
```

### Feedback Components

#### Spinner
```jsx
<Spinner size="lg" className="text-brand-primary" />
```

#### Skeleton
```jsx
<Skeleton variant="card" />
<SkeletonList count={5} />
<SkeletonTable rows={10} />
```

#### ErrorState
```jsx
<ErrorState 
  title="Failed to load"
  message="Please try again"
  onRetry={refetch}
/>
```

#### EmptyState
```jsx
<EmptyState 
  type="noJobs"
  action={() => createJob()}
  actionLabel="Create Job"
/>
```

#### Toast
```jsx
<Toast 
  type="success"
  title="Saved!"
  message="Changes saved successfully"
/>
```

#### LoadingOverlay
```jsx
<LoadingOverlay 
  visible={isLoading}
  message="Processing..."
/>
```

### Display Components

#### Avatar
```jsx
<Avatar 
  name="Ngọc Anh"
  size="lg"
  src="/optional-image.jpg"
/>
```

#### OptimizedImage
```jsx
<OptimizedImage 
  src="/image.jpg"
  alt="Event"
  aspectRatio="16/9"
/>
```

---

## Best Practices

### 1. Always Use Semantic Tokens

❌ **Bad:**
```jsx
<div className="text-gray-700">
  <button className="bg-[#ab3f20]">Click</button>
</div>
```

✅ **Good:**
```jsx
<div className="text-semantic-text-secondary">
  <Button variant="primary">Click</Button>
</div>
```

### 2. Handle All States

❌ **Bad:**
```jsx
function JobList() {
  const { data } = useFetch('/jobs');
  return data.map(job => <JobCard job={job} />);
}
```

✅ **Good:**
```jsx
function JobList() {
  const { data, loading, error } = useFetch('/jobs');
  
  if (loading) return <SkeletonList count={5} />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data.length) return <EmptyState type="noJobs" />;
  
  return data.map(job => <JobCard job={job} />);
}
```

### 3. Accessibility First

✅ **Required:**
- Use semantic HTML
- Add ARIA labels
- Keyboard navigation
- Focus states
- Alt text for images
- Error messages

```jsx
<Button 
  aria-label="Delete job"
  onClick={handleDelete}
>
  <TrashIcon aria-hidden="true" />
</Button>
```

### 4. Performance

✅ **Optimize:**
- Lazy load heavy components
- Use skeleton loaders
- Debounce loading states
- Optimize images

```jsx
const HeavyComponent = lazy(() => import('./Heavy'));

<Suspense fallback={<SkeletonCard />}>
  <HeavyComponent />
</Suspense>
```

---

## Resources

### Documentation
- [Typography System](./TYPOGRAPHY.md)
- [Color System](./COLOR_SYSTEM.md)
- [Image Optimization](./IMAGE_OPTIMIZATION.md)
- [Component States](./COMPONENT_STATES.md)
- [Priority 3 Summary](./PRIORITY_3_SUMMARY.md)

### Tools
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lucide Icons](https://lucide.dev/)

### Figma Design File
- Coming soon...

---

## Quick Reference

### Component Import Paths

```jsx
// Form
import Button from '@/components/Button/Button';
import Input, { Textarea } from '@/components/Input/Input';

// Feedback
import Spinner from '@/components/Spinner/Spinner';
import Skeleton, { SkeletonCard, SkeletonList } from '@/components/Skeleton/Skeleton';
import ErrorState from '@/components/ErrorState/ErrorState';
import EmptyState from '@/components/EmptyState/EmptyState';
import Toast, { ToastContainer } from '@/components/Toast/Toast';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';

// Display
import Avatar from '@/components/Avatar/Avatar';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
```

### Tailwind Utilities

```jsx
// Typography
className="font-heading text-4xl"     // Headings
className="font-sans text-base"       // Body

// Colors
className="bg-brand-primary"          // Brand primary
className="text-semantic-text-primary" // Text color
className="bg-semantic-success-bg"    // Success background

// Spacing
className="py-section-md"             // Section spacing
className="gap-6"                     // Component spacing

// States
className="btn-primary"               // Button
className="glass-light"               // Glassmorphism
className="shadow-brand-primary"      // Shadow
```

---

## Component Status

| Component | Status | Version |
|-----------|--------|---------|
| Button | ✅ Ready | 1.0.0 |
| Input | ✅ Ready | 1.0.0 |
| Textarea | ✅ Ready | 1.0.0 |
| Avatar | ✅ Ready | 1.0.0 |
| Spinner | ✅ Ready | 1.0.0 |
| Skeleton | ✅ Ready | 1.0.0 |
| ErrorState | ✅ Ready | 1.0.0 |
| EmptyState | ✅ Ready | 1.0.0 |
| Toast | ✅ Ready | 1.0.0 |
| LoadingOverlay | ✅ Ready | 1.0.0 |
| OptimizedImage | ✅ Ready | 1.0.0 |

---

## Contributing

When adding new components:

1. Follow existing patterns
2. Include all states (loading, error, disabled)
3. Add accessibility features
4. Write documentation
5. Test on mobile devices

---

## License

MIT © 2025 Cviro

---

**Design System Version:** 1.0.0  
**Last Updated:** November 15, 2025  
**Maintained by:** Cviro Development Team
