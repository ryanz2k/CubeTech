# CubeTech Innovations - Homepage

A responsive homepage for CubeTech Innovations, built with HTML, CSS, and JavaScript.

## Live Demo

[View Live Demo](#) *(Add your deployment URL here)*

## Features

- Fully responsive design (mobile, tablet, desktop)
- Interactive team carousel with touch/swipe support
- Animated statistics counters
- Smooth scroll navigation
- Contact form with validation
- Newsletter subscription
- Back-to-top button

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Google Fonts (Outfit, Playfair Display)

## Getting Started

Open `index.html` in your browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## Deployment

**GitHub Pages:**
1. Push to GitHub
2. Go to Settings → Pages
3. Select main branch and save

**Netlify:**
Drag and drop the folder at [netlify.com/drop](https://app.netlify.com/drop)

## Project Structure

```
CubeTech/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── favicon.png
│   └── (images)
└── README.md
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- iOS Safari, Chrome for Android

---

## Explanation

### Tools & Framework

I used vanilla HTML, CSS, and JavaScript for this project. This approach ensures fast load times, no build dependencies, and easy deployment to any static hosting service.

### Design Translation

I analyzed the Figma design to identify the layout structure, color palette, and typography. The CSS uses custom properties for consistent theming, and the layout is built with CSS Grid and Flexbox for responsiveness.

### Challenges

- Creating a responsive carousel that works well on all screen sizes
- Implementing the polaroid-style image collage with CSS transforms
- Balancing animations with performance using GPU-accelerated properties

### Future Improvements

- Backend integration for form submissions
- Dark mode toggle
- Multi-language support
- Image optimization with WebP format
