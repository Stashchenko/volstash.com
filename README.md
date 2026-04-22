# 🌐 Personal Portfolio / Hobbies Site

This is a personal website built with **Astro**, showcasing projects, experiments, and hobbies such as ESP32 devices,
Home Assistant automations, and Amazfit watchfaces.

The site uses Markdown content collections to generate pages dynamically.

---

## 🚀 Tech Stack

- Astro
- Markdown Content Collections (`astro:content`)
- Cloudflare Pages / Workers (optional deployment)
- Vanilla CSS (custom UI styling)

---

## 📁 Project Structure

```
src/
    content/
        hobbies/ # Markdown project files
    pages/
        hobbies/
           index.astro # Grid of all projects
           [slug].astro # Dynamic project page
    layouts/
           Layout.astro
    public/
```

---

## 🧑‍💻 Local Development

Install dependencies:

`npm install`

Run development server:

`npm run dev`

Open in browser:

http://localhost:4321

---

## 👀 Preview Production Build

To test production behavior locally:

```bash
npm run build
npm run preview
```

Then open:

http://localhost:4321

---

## 🏗 Build for Production

`npm run build`

Output will be generated in:

`dist/`

---

## ☁️ Deploy to Cloudflare Pages

### Option 1 — GitHub integration (recommended)

1. Push code to GitHub
2. Open Cloudflare Dashboard: https://dash.cloudflare.com
3. Go to Pages → Create Project
4. Connect repository

#### Build settings:

Framework preset: `Astro`

Build command: `npm run build`

Output directory: `dist`

---

### Option 2 — Manual deploy

```bash
npm run build
npx wrangler pages deploy dist
```

---

## ⚙️ Astro Config (Cloudflare)

```js
import {defineConfig} from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    adapter: cloudflare(),
});
```

---

## 📦 Content System

Each project is stored as a Markdown file:

`src/content/hobbies/*.md`

Example:

```js
title: "Smart Display"
github: "https://github.com/user/repo"
```

## 🧠 Features

- Markdown-based project system
- Fast static + edge rendering (Astro)
- Matrix-style UI tiles
- Responsive grid layout
- GitHub integration per project
- Auto-generated pages from content

---

## ➕ Adding a New Project

Create file:

`src/content/hobbies/new-project.md`

Add frontmatter:

```js
title: "New Project"
github: "https://github.com/user/repo"
```

It will automatically appear in the UI.

---

## 📄 License

Personal project — free to reuse structure and ideas.
