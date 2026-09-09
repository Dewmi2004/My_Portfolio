# Imasha Dewmi — Portfolio (Part 1: Frontend)

A responsive, single-page portfolio built with **React + Vite** (the "R" in MERN), styled after a hexagon-portrait hero layout in a **sea green / black / white** palette with a light and dark theme toggle.

> This is **Part 1** of the MERN-stack portfolio project. Part 2 (Node.js + Express + MongoDB backend for the contact form) will be delivered separately and dropped into a sibling `backend/` folder.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The static site is generated in `dist/`.

## Connecting to the backend (Part 2)

The contact form posts to the Node/Express API that will live in `../backend`. Set the API base URL via an env variable:

```bash
cp .env.example .env
# edit .env and set VITE_API_URL to your backend URL, e.g. http://localhost:5000
```

If the backend is unreachable, the form automatically falls back to opening the visitor's email client instead — so the site works standalone even before Part 2 is added.

## Deploying

Any static host works well: **GitHub Pages**, **Vercel**, or **Netlify**.

**GitHub Pages (quick option):**
1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package / a GitHub Action).
3. Enable Pages in the repo settings, pointing at that branch.

**Vercel / Netlify:** import the repo, set the root directory to `frontend`, build command `npm run build`, output directory `dist`.

## Project structure

```
frontend/
├── public/                   # static assets, CV PDF, favicon
├── src/
│   ├── assets/                # portrait image
│   ├── components/            # Navbar, Hero, About, Skills, Projects, EducationCerts, Contact, Footer, Icons
│   ├── data/portfolioData.js  # all resume content in one place — edit this to update the site
│   ├── hooks/useTheme.js      # light/dark theme logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # theme tokens + all styling
└── index.html
```

To update any content (projects, skills, contact details), edit `src/data/portfolioData.js` — nothing else needs to change.
