# Open Graph Image Guide

## Required OG Image

To complete your SEO setup, you need to create an Open Graph (OG) image for social media sharing.

### Specifications

- **Filename**: `og-image.jpg` (or `og-image.png`)
- **Location**: `/public/og-image.jpg`
- **Dimensions**: 1200 × 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: JPG or PNG
- **File Size**: < 1 MB (recommended)
- **Color Mode**: RGB

### Design Recommendations

Your OG image should include:

1. **Your Name**: "Farouk Adedamola" prominently displayed
2. **Title/Role**: "Senior Frontend Engineer" or "Software Developer"
3. **Brand Colors**: Use your portfolio's color scheme (emerald-light: #10b981)
4. **Simple Background**: Dark theme matching your site (#0a0a0a)
5. **Professional Photo**: Optional but recommended
6. **Tech Stack Icons**: Optional - React, TypeScript, Next.js logos

### Design Tools

You can create your OG image using:

1. **Figma**: Free online design tool
   - Template: [OG Image Template](https://www.figma.com/community/file/1234567890/)
   
2. **Canva**: Easy drag-and-drop editor
   - Size: Custom 1200 × 630 px
   
3. **Adobe Photoshop/Illustrator**: Professional tools
   
4. **Online Generators**:
   - [OG Image Generator](https://og-image.vercel.app/)
   - [Bannerbear](https://www.bannerbear.com/demos/open-graph-image-generator/)

### Example Content

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        FAROUK ADEDAMOLA                            │
│        Senior Frontend Engineer                     │
│                                                     │
│        React • Next.js • TypeScript                │
│        Building Exceptional Web Experiences         │
│                                                     │
│        faroukadedamola.com                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### After Creating

1. Save the image as `/public/og-image.jpg`
2. Verify the image appears at `https://yourdomain.com/og-image.jpg`
3. Test with [OpenGraph.xyz](https://www.opengraph.xyz/)
4. Check preview on social media platforms

### Testing Your OG Image

Once uploaded, test on:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- OpenGraph.xyz: https://www.opengraph.xyz/

### Per-Page OG Images (Optional)

For even better social sharing, consider creating specific OG images for:
- Blog posts: `/public/og-blog.jpg`
- Projects page: `/public/og-projects.jpg`
- Resume page: `/public/og-resume.jpg`

Then update the metadata in respective page files.

