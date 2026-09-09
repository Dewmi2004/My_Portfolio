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

**Vercel — deployed together with the backend (recommended):**

If `frontend/` and `backend/` are both in one repo (`My_Portfolio/`), add a
`vercel.json` at the **repo root** (not inside `frontend/`) that defines both
as Vercel Services — see the backend's README for the exact file and full
steps. Vercel then builds and serves both from one project on one domain, so
the contact form's `fetch("/api/contact")` resolves automatically — no
`VITE_API_URL` or CORS config needed.

**Vercel — frontend only (standalone):**
1. Push this `frontend/` folder to a GitHub repo of its own.
2. On [vercel.com](https://vercel.com), **Add New Project** → import the repo.
3. Vercel auto-detects Vite: build command `npm run build`, output directory
   `dist` — no changes needed.
4. Add an **Environment Variable**: `VITE_API_URL` = your separately-deployed
   backend's URL (e.g. `https://your-backend.vercel.app`).
5. Deploy.

If you go this route, also set the backend's `FRONTEND_URL` env var to this
site's URL, so CORS allows requests from it (see the backend's README).

**GitHub Pages (quick option):**
1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package / a GitHub Action).
3. Enable Pages in the repo settings, pointing at that branch.

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
