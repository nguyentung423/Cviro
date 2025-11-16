# 🖼️ Image Optimization Guide

## Overview
Hướng dẫn tối ưu hóa images cho performance, accessibility và SEO.

---

## 1. Components

### Avatar Component
Thay thế placeholder images bằng gradient avatars với initials.

```jsx
import Avatar from '@/components/Avatar/Avatar';

// Basic usage
<Avatar name="Ngọc Anh" size="md" />

// With image fallback
<Avatar 
  src="/path/to/image.jpg"
  name="Thu Hà" 
  alt="PG tại Tech Expo"
  size="lg"
/>

// Sizes available
<Avatar size="xs" />  // 32px
<Avatar size="sm" />  // 48px
<Avatar size="md" />  // 64px (default)
<Avatar size="lg" />  // 80px
<Avatar size="xl" />  // 96px
<Avatar size="2xl" /> // 128px
```

**Features:**
- Consistent gradient colors based on name
- Automatic initials generation
- Graceful fallback when image fails
- Lazy loading built-in

---

### OptimizedImage Component
Smart image component với lazy loading và skeleton loader.

```jsx
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

// Basic usage
<OptimizedImage 
  src="/images/event.jpg"
  alt="Tech Expo 2024"
  className="rounded-lg"
/>

// With aspect ratio
<OptimizedImage 
  src="/images/banner.jpg"
  alt="Event Banner"
  aspectRatio="16/9"  // Options: 'square', '16/9', '4/3', '3/2', 'auto'
/>

// With custom fallback
<OptimizedImage 
  src="/images/photo.jpg"
  alt="Profile"
  fallback={<div>Custom fallback UI</div>}
/>
```

**Features:**
- Automatic skeleton loading state
- Lazy loading (native)
- Error handling với fallback UI
- Aspect ratio presets
- Smooth fade-in transition

---

## 2. Image Formats

### Recommended Formats

```
✅ WebP - Modern, best compression (use for most images)
✅ AVIF - Next-gen format (progressive enhancement)
✅ SVG - Icons, logos, illustrations
⚠️ PNG - Transparency needed, logos
⚠️ JPG - Photos (fallback)
❌ GIF - Avoid, use video or WebP animation
```

### Responsive Images

```html
<!-- Picture element for art direction -->
<picture>
  <source 
    srcset="/images/hero-mobile.webp" 
    media="(max-width: 768px)"
    type="image/webp"
  />
  <source 
    srcset="/images/hero-desktop.webp" 
    media="(min-width: 769px)"
    type="image/webp"
  />
  <img 
    src="/images/hero-desktop.jpg" 
    alt="Event Platform"
    loading="lazy"
  />
</picture>

<!-- Srcset for resolution switching -->
<img
  srcset="
    /images/logo-1x.png 1x,
    /images/logo-2x.png 2x,
    /images/logo-3x.png 3x
  "
  src="/images/logo-1x.png"
  alt="Cviro Logo"
/>
```

---

## 3. Performance Best Practices

### Image Sizing

```javascript
// Recommended max sizes
{
  thumbnail: '150x150',      // Avatars, thumbnails
  card: '400x300',           // Card images
  hero: '1920x1080',         // Hero banners
  og: '1200x630',            // Social media
}

// Never serve images larger than needed
// Use responsive images for different screen sizes
```

### Lazy Loading

```jsx
// Native lazy loading (recommended)
<img src="/image.jpg" loading="lazy" alt="..." />

// Eager loading for above-the-fold images
<img src="/hero.jpg" loading="eager" alt="..." />

// Preload critical images
<link rel="preload" as="image" href="/logo.png" />
```

### Image CDN Setup

```javascript
// Use Cloudinary, Imgix, or similar CDN
const imageUrl = (src, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  return `https://cdn.example.com/${src}?w=${width}&h=${height}&q=${quality}&fm=${format}`;
};

// Usage
<img 
  src={imageUrl('/events/expo.jpg', { width: 800, quality: 85 })}
  alt="Tech Expo"
/>
```

---

## 4. Accessibility

### Alt Text Best Practices

```jsx
// ✅ GOOD - Descriptive, contextual
<img 
  src="/pg-booth.jpg"
  alt="PG nhân viên tư vấn khách hàng tại booth Tech Expo"
/>

// ❌ BAD - Generic, non-descriptive
<img src="/img1.jpg" alt="Image" />
<img src="/photo.jpg" alt="Photo" />
<img src="/pic.jpg" alt="" />  // Empty alt for decorative only

// Decorative images
<img src="/decoration.svg" alt="" role="presentation" />

// Complex images need description
<figure>
  <img src="/chart.png" alt="Biểu đồ tăng trưởng người dùng" />
  <figcaption>
    Số lượng người dùng tăng từ 1,000 (tháng 1) lên 12,000 (tháng 12)
  </figcaption>
</figure>
```

---

## 5. SEO Optimization

### Image Metadata

```jsx
// Structured data for images
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://cviro.com/images/hero.jpg",
  "width": 1920,
  "height": 1080,
  "caption": "Cviro - Nền tảng kết nối nhân sự sự kiện"
}
</script>

// Open Graph images
<meta property="og:image" content="https://cviro.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Cviro Event Platform" />

// Twitter Card
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://cviro.com/twitter-card.jpg" />
```

### File Naming

```
✅ GOOD
event-staff-tech-expo-2024.jpg
pg-booth-promotion-hanoi.webp
mc-stage-performance.jpg

❌ BAD
IMG_1234.jpg
photo-final-v2-FINAL.png
untitled.jpg
```

---

## 6. Migration from Placeholders

### Before (Placeholder)
```jsx
const story = {
  name: "Ngọc Anh",
  image: "https://via.placeholder.com/80x80/ab3f20/FFFFFF?text=NA"
};

<img src={story.image} alt={story.name} />
```

### After (Avatar Component)
```jsx
const story = {
  name: "Ngọc Anh",
  // No image property needed
};

<Avatar name={story.name} size="lg" />
```

### Benefits
- ✅ No external HTTP requests
- ✅ Consistent brand colors
- ✅ Professional appearance
- ✅ Faster page load
- ✅ Works offline

---

## 7. Tools & Resources

### Compression Tools
- [Squoosh](https://squoosh.app/) - Online image compressor
- [ImageOptim](https://imageoptim.com/) - Mac app
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression

### Image CDNs
- [Cloudinary](https://cloudinary.com/) - Full-featured CDN
- [Imgix](https://imgix.com/) - Real-time image processing
- [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/)

### Testing
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance audit
- [WebPageTest](https://www.webpagetest.org/) - Detailed analysis
- Chrome DevTools → Network → Img filter

---

## 8. Checklist

- [ ] Replace all placeholder images with Avatar component
- [ ] Add lazy loading to below-fold images
- [ ] Optimize image sizes (max 200KB for photos)
- [ ] Use WebP format with JPG fallback
- [ ] Add descriptive alt text to all images
- [ ] Preload hero/critical images
- [ ] Add Open Graph images for social sharing
- [ ] Test on 3G network speed
- [ ] Verify images in Lighthouse audit
- [ ] Add image sitemaps for SEO
