# Watkins Wedding '27

A beautiful, modern wedding website for the Watkins Wedding taking place on April 10th, 2027 in Manchester. This site features interactive animations, responsive design, and an elegant user experience.

## 🌐 Live Site

**Domain:** [watkinswedding.co.uk](https://watkinswedding.co.uk)

**Location:** Manchester  
**Date:** April 10, 2027

---

## ✨ Features

- **Responsive Design** - Mobile-first approach with hamburger menu for smaller screens
- **Interactive SVG Animations** - Animated text flowing along SVG paths with pause functionality
- **Modern Styling** - Built with Tailwind CSS and SCSS for maintainable, scalable styles
- **Navigation Menu** - Easy access to key sections:
  - Travel & Stay
  - Things to Do
  - Registry
  - RSVP
- **Smooth Animations** - GSAP-powered animations for fluid motion effects
- **Dark Mode Color Scheme** - Elegant theme with muted greens and warm tones

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and responsive design
- **SCSS** - Preprocessing for better CSS organization
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Interactive functionality and animations
- **GSAP** - Professional animation library
- **PostCSS** - CSS transformation with autoprefixer
- **Sass** - CSS preprocessing

---

## 📦 Project Structure

```
pur3-malice.github.io/
├── index.html              # Main HTML file
├── style.css               # Compiled main styles (from SCSS)
├── tailwind.css            # Compiled Tailwind styles
├── script.js               # JavaScript functionality
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── CNAME                   # Custom domain configuration
├── README.md               # This file
└── src/
    ├── scss/
    │   └── style.scss      # Main SCSS styles
    └── tailwind/
        └── input.css       # Tailwind CSS input
```

---

## 📋 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd pur3-malice.github.io
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:8080`

---

## 🏗️ Build Scripts

All build commands are defined in `package.json`:

### Development

- **`npm run dev`** - Start live-server with file watching for real-time development
  ```bash
  npm run dev
  ```

### Production Builds

- **`npm run build:scss`** - Compile SCSS to CSS (minified, no source maps)

  ```bash
  npm run build:scss
  ```

- **`npm run build:css`** - Compile Tailwind CSS (minified)

  ```bash
  npm run build:css
  ```

- **`npm run build`** - Run all build tasks (SCSS + Tailwind)
  ```bash
  npm run build
  ```

---

## 🎨 Styling

The project uses a combination of approaches for styling:

### Color Palette

- **Background:** `#818866` (Sage Green)
- **Text:** `#39492e` (Dark Olive)
- **Accent:** `#81291c` (Deep Red) - hover state
- **Primary Button:** `rgb(28, 128, 228)` (Blue) - hover state

### Responsive Breakpoints

- **Mobile:** Below 650px (hamburger menu active)
- **Desktop:** 650px and above (full navigation)

### Key Styles

- **Main Container:** Full viewport height with centered flex layout
- **Navigation:** Smooth transitions, responsive hamburger menu
- **SVG Elements:** Block display with object-fit cover
- **Buttons:** Custom styling with hover effects

---

## 📱 Mobile-First Design

The site is designed to be mobile-first with responsive features:

- **Hamburger Menu** - Displays on screens below 650px width
- **Flexible Typography** - Sizes adjust for smaller screens
- **Touch-Friendly** - Proper spacing and sizing for touch interfaces
- **Smooth Animations** - Hardware-accelerated transforms

### Hamburger Menu Classes

- `.hamburger` - Menu button (hidden on desktop)
- `.hamburger--open` - Active state with animation
- `.nav--open` - Navigation panel visibility
- `.bar` - Individual hamburger bars with rotate animations

---

## ⚙️ Configuration Files

### `tailwind.config.js`

Tailwind CSS configuration for custom theme and plugins.

### `postcss.config.js`

PostCSS configuration with autoprefixer for vendor prefixes.

### `package.json`

- **Dev Dependencies:**
  - `tailwindcss@^3.4.0`
  - `sass@^1.69.0`
  - `postcss@^8.4.0`
  - `autoprefixer@^10.4.0`
  - `concurrently@^8.2.2`
  - Image optimization tools (imagemin, imagemin-mozjpeg, imagemin-pngquant)

---

## 🎬 JavaScript Features

The `script.js` file handles:

- **Pause Button** - Allows users to pause/play animations
- **SVG Text Animation** - Text flows along SVG paths using GSAP
- **Menu Toggle** - Hamburger menu open/close functionality
- **Animation Timing** - Controls for smooth, continuous animations

### Animation Library

Uses **GSAP 3.12.2** from CDN for professional animation capabilities.

---

## 🚀 Deployment

This site is deployed as a GitHub Pages site with a custom domain.

### Custom Domain

The `CNAME` file contains: `watkinswedding.co.uk`

### Deployment Steps

1. Push changes to the `main` branch
2. GitHub Actions automatically deploys to GitHub Pages
3. Changes propagate through DNS to the custom domain

---

## 📝 Navigation Structure

Current navigation items and their purposes:

| Item              | Purpose                                       |
| ----------------- | --------------------------------------------- |
| **Travel & Stay** | Information about accommodation in Manchester |
| **Things to Do**  | Attractions and activities in the area        |
| **Registry**      | Wedding registry information                  |
| **RSVP**          | Button to submit attendance confirmation      |

---

## 🔍 Browser Support

The site uses modern CSS and JavaScript features optimized for:

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 💡 Development Tips

1. **Watch Mode:** Use `npm run dev` for live reloading during development
2. **Building Styles:** Always run `npm run build` before deployment
3. **SCSS Organization:** Keep component styles in `src/scss/style.scss`
4. **Tailwind Classes:** Use utility-first approach in HTML
5. **SVG Optimization:** Keep SVG path data for animations in mind

---

## 📞 Contact & Support

For questions or issues related to this wedding website, please contact the site owner.

---

## 📄 License

This project is the personal property of the Watkins family.

---

**Last Updated:** April 2027  
**Project Status:** Active
