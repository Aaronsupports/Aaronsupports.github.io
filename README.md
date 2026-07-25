# Aaron Timothy Navarro — VA Portfolio Website

A fast, dependency-free personal portfolio site for Aaron Timothy Navarro, General Virtual Assistant. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step — in a dark-mode-first, Web3-inspired "creative tech" style, with an optional light mode.

**Live sections:** Hero · About · Services · Skills · Experience · Portfolio · Why Hire Me · Testimonials · Contact

---

## 1. Project overview

| | |
|---|---|
| **Purpose** | Attract VA clients, present services, and showcase experience |
| **Stack** | HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla JavaScript |
| **Dependencies** | None required. Google Fonts (Space Grotesk, Inter, JetBrains Mono) are loaded from a CDN — see [Going fully offline](#going-fully-offline) if you'd rather not use it |
| **Hosting target** | GitHub Pages (also works on Netlify, Vercel, or any static host) |

Design notes: dark navy/charcoal base with electric blue, cyan, and violet accents; glassmorphism cards; a monospace "developer console" motif (`// section` labels, a live status badge) that nods to Aaron's Web3 background; scroll-triggered reveal animations; and a fully responsive layout for mobile, tablet, and desktop.

---

## 2. File structure

```
va-site/
├── index.html      All page content and structure (single page)
├── style.css       All styling, theme tokens, layout, animations
├── script.js       All behavior: nav, theme toggle, reveal, form validation
├── favicon.svg      Small gradient monogram favicon
└── README.md        This file
```

Everything is self-contained — there is no build tool, package manager, or compilation step. Edit the files directly and refresh your browser.

---

## 3. How to run locally

You don't need Node, npm, or any installation. Pick either option:

**Option A — just open it**
Double-click `index.html` (or drag it into your browser). Everything works except the two `@import`-style Google Fonts calls, which need internet access to load (the page still looks fine with fallback system fonts if you're offline).

**Option B — local server (recommended)**
Some browsers restrict certain features when opening files directly with `file://`. A simple local server avoids that:

```bash
# Python 3
cd va-site
python3 -m http.server 8000
# then open http://localhost:8000

# or, with Node installed
npx serve va-site
```

---

## 4. How to customize the content

Everything lives in plain HTML/CSS, so search-and-replace is usually enough.

**Text & sections** — open `index.html`. Each section is wrapped in an HTML comment banner, e.g. `<!-- ==================== SERVICES ==================== -->`, so you can jump straight to the part you want to edit.

**Profile photo** — the hero and About section currently use a gradient "ATN" monogram (`.avatar-mono` in `index.html`, inside `.hero-card`). To use a real photo, replace:
```html
<div class="avatar-mono">ATN</div>
```
with:
```html
<img src="your-photo.jpg" alt="Aaron Timothy Navarro" class="avatar-mono" />
```
(Add `object-fit: cover;` to `.avatar-mono` in `style.css` if the photo isn't square.)

**Colors** — all colors are CSS custom properties at the top of `style.css` under `:root` (dark mode) and `[data-theme="light"]` (light mode). Change `--accent-blue`, `--accent-cyan`, `--accent-violet`, or the background tokens there and the whole site updates.

**Services / Skills / Portfolio / Testimonials cards** — each is a repeated block (`<article class="card ...">` or similar) inside its section. Copy an existing block, edit the text, and remove any you don't need.

**Testimonials** — the three testimonials are clearly-labeled placeholders (`Alex R.`, `Priya K.`, `Jordan M.`). Swap in real client names, roles, and quotes once you have them.

**Portfolio samples** — the six portfolio cards are placeholders tagged "Sample." Replace the titles/descriptions with real project write-ups, and consider linking each card to a case study page or PDF once you have one.

**Contact form** — the form currently opens the visitor's email app with a pre-filled message (via a `mailto:` link) when submitted, so it works immediately with zero setup. If you'd rather have messages submitted directly from the page without opening an email app, connect a form backend such as [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/) and swap the submit handler in `script.js` (look for the `Contact form validation` section) for a `fetch()` call to your provider.

**Theme toggle persistence** — by default the light/dark toggle resets to dark mode on every page load (session-only, no data is stored). If you'd like the visitor's choice to persist across visits, wrap `localStorage.getItem`/`setItem` calls around the `applyTheme()` function in `script.js`.

**Favicon / social preview image** — `favicon.svg` is a simple generated monogram; replace it with your own icon if you'd like. The Open Graph/Twitter meta tags in `index.html` reference `og-image.png`, which isn't included — add a 1200×630px image with that filename to the project root for link previews on social media and messaging apps.

### Going fully offline
To remove the Google Fonts dependency, delete the `<link>` tags for `fonts.googleapis.com`/`fonts.gstatic.com` in `index.html` and remove the three `font-family` references in `style.css` (`--font-display`, `--font-body`, `--font-mono`) — the fallback system fonts listed alongside each will take over automatically.

---

## 5. How to deploy on GitHub Pages

1. Create a new repository on GitHub (or use an existing one), e.g. `aaron-va-portfolio`.
2. Push these four files to the repository root:
   ```bash
   cd va-site
   git init
   git add .
   git commit -m "Initial VA portfolio site"
   git branch -M main
   git remote add origin https://github.com/Aaronsupports/aaron-va-portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch."
5. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at `https://Aaronsupports.github.io/aaron-va-portfolio/` (usually within a minute or two).

**Using a "username.github.io" repo instead:** if you name the repository exactly `Aaronsupports.github.io`, GitHub Pages will publish it at the shorter `https://Aaronsupports.github.io/` with no extra path — update the `og:url` and `canonical` tags in `index.html` to match whichever URL you end up using.

---

## Accessibility & performance notes
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a "Skip to main content" link, and visible keyboard focus states are built in.
- Animations respect `prefers-reduced-motion` and are disabled for visitors who have that system setting on.
- No image assets are required for the base design (icons are inline SVG, avatar is a CSS/text monogram), keeping the page lightweight.
- Update the meta `description`, `og:title`, `og:description`, and `canonical` URL in `index.html` if you change the domain or the site's focus.
