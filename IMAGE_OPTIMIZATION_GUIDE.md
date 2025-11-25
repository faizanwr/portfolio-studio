# Image Optimization Guide

This guide explains how Sanity handles image compression and how to optimize images for your portfolio.

## Schema Configuration (Sanity Studio)

### Image Fields Overview

| Field | Type | Max Size | Metadata Extracted | Formats Accepted |
|-------|------|----------|-------------------|------------------|
| **Project Icon** | icon | 500KB | blurhash, lqip, palette | PNG, JPEG, WebP |
| **Letter Image** | image | 1MB | blurhash, lqip, palette | PNG, JPEG, WebP |
| **Project Content Images** | content images | 2MB | blurhash, lqip, palette, exif | PNG, JPEG, WebP |

### What's Configured in Schemas

✅ **Accepted formats** - Only PNG, JPEG, and WebP
✅ **Metadata extraction** - Automatic extraction of:
- `blurhash` - Placeholder blur hash
- `lqip` - Low Quality Image Placeholder
- `palette` - Dominant colors
- `exif` - Camera/photo metadata (content images only)

✅ **Alt text fields** - For accessibility and SEO
✅ **Aspect ratio guides** - Visual constraints in the Studio UI

## Frontend Optimization (Portfolio Site)

### Using the Image URL Builder

In your portfolio site's `sanityClient.js`, you already have the URL builder. Here's how to optimize for each use case:

#### 1. Project Icons (64x64)
```javascript
import { urlFor } from '../sanityClient'

// Small, optimized icons (used in ShowcaseBeta.jsx)
const iconUrl = urlFor(project.icon)
    .width(64)
    .height(64)
    .format('webp')      // Modern format
    .quality(85)         // Good quality, smaller size
    .fit('fill')         // Fill the dimensions
    .url()

// For retina displays (2x)
const iconUrl2x = urlFor(project.icon)
    .width(128)
    .height(128)
    .format('webp')
    .quality(80)
    .url()
```

#### 2. Letter Images (Square, 1:1)
```javascript
// Medium size for letter covers
const letterImageUrl = urlFor(letter.image)
    .width(800)
    .height(800)
    .format('webp')
    .quality(80)
    .fit('crop')         // Crop to maintain aspect ratio
    .url()

// With blur placeholder
const letterBlur = letter.image.asset.metadata?.lqip
```

#### 3. Project Content Images (16:9)
```javascript
// Large content images (used in ProjectDetail.jsx)
const contentImageUrl = urlFor(imageValue)
    .width(1600)         // Max width
    .height(900)         // 16:9 aspect ratio
    .format('webp')
    .quality(75)         // Lower quality for large images
    .fit('max')          // Fit within bounds
    .url()

// Access alt text
const altText = imageValue.alt || 'Project Image'
```

### Quality Guidelines

| Use Case | Width | Quality | Format | Notes |
|----------|-------|---------|--------|-------|
| Thumbnails/Icons | 64-128px | 85 | WebP | High quality for small files |
| Letter Covers | 800px | 80 | WebP | Balance of quality/size |
| Content Images | 1600px | 75 | WebP | Larger files need more compression |
| Retina Displays | 2x size | -5 quality | WebP | Slightly lower quality is fine |

### Advanced: Responsive Images

Use `srcset` for different screen sizes:

```javascript
<img
    src={urlFor(image).width(800).quality(80).format('webp').url()}
    srcSet={`
        ${urlFor(image).width(400).quality(85).format('webp').url()} 400w,
        ${urlFor(image).width(800).quality(80).format('webp').url()} 800w,
        ${urlFor(image).width(1600).quality(75).format('webp').url()} 1600w
    `}
    sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1600px"
    alt={image.alt || 'Image'}
/>
```

## Example: Update ProjectDetail.jsx

Replace the current image rendering with optimized version:

```javascript
const components = {
    types: {
        image: ({ value }) => {
            return (
                <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/100 my-8">
                    <img
                        src={urlFor(value).width(1600).height(900).quality(75).format('webp').url()}
                        srcSet={`
                            ${urlFor(value).width(800).height(450).quality(80).format('webp').url()} 800w,
                            ${urlFor(value).width(1600).height(900).quality(75).format('webp').url()} 1600w
                        `}
                        sizes="(max-width: 1024px) 800px, 1600px"
                        alt={value.alt || 'Project Image'}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    {value.caption && (
                        <p className="text-sm text-black/50 mt-2">{value.caption}</p>
                    )}
                </div>
            )
        }
    }
}
```

## Compression Cheat Sheet

### URL Parameters
```javascript
urlFor(image)
    .width(800)           // Set width
    .height(600)          // Set height
    .quality(80)          // 0-100, default 75
    .format('webp')       // webp, jpg, png (webp is smallest)
    .fit('clip')          // clip, crop, fill, fillmax, max, scale, min
    .blur(50)             // 0-2000, for blur effect
    .sharpen(50)          // 0-100, sharpen image
    .auto('format')       // Auto-detect best format
    .url()
```

### Common Fit Modes
- `clip` - Keep aspect ratio, resize to fit within bounds
- `crop` - Crop to exact dimensions (uses hotspot)
- `fill` - Fill exact dimensions (may stretch)
- `max` - Resize to fit within bounds (max width/height)

## Performance Tips

1. **Use WebP** - 30% smaller than JPEG with same quality
2. **Lower quality for large images** - Quality 75 is often indistinguishable from 100
3. **Use lazy loading** - Add `loading="lazy"` to images
4. **Provide alt text** - Good for SEO and accessibility
5. **Use blur placeholders** - Show LQIP while loading:
   ```javascript
   style={{ backgroundImage: `url(${image.asset.metadata?.lqip})` }}
   ```

## Testing

Check image sizes:
```bash
# In your portfolio site
npm run build
# Check dist/assets for image sizes
```

Recommended sizes after optimization:
- Icons: < 10KB
- Letter covers: 50-150KB
- Content images: 100-300KB

## Questions?

- Sanity Image API Docs: https://www.sanity.io/docs/image-url
- WebP Support: 97%+ browsers (safe to use)
