# Portfolio Backend (Part 2: Node.js + Express + MongoDB)

The API behind the portfolio's contact form — receives messages, validates them,
saves them to MongoDB, and optionally emails you a notification.

This is a sibling folder to the frontend: put it next to (not inside) that
project, e.g.

```
my-portfolio/
├── frontend/   ← the React/Vite site
└── backend/    ← this project
```

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

| Variable | Required | Notes |
|---|---|---|
| `PORT` | no | defaults to `5000` |
| `FRONTEND_URL` | recommended | comma-separated allowed origins for CORS, e.g. `http://localhost:5173,https://yourdomain.com` |
| `MONGO_URI` | yes, to save messages | e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI |
| `ADMIN_API_KEY` | yes, to read messages | any long random string — sent as the `x-admin-key` header |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | no | leave blank to skip email notifications entirely |
| `CONTACT_TO_EMAIL` | no | where notification emails are sent |

The server still starts and `/api/health` still works even without `MONGO_URI` —
it just returns `"db": "disconnected"`, and `/api/contact` will return a 503
until the database is reachable. This means a misconfigured `.env` never takes
the whole API down.

## Run

```bash
npm run dev     # auto-restarts on file changes (Node's built-in --watch)
npm start       # plain node
```

## API

### `GET /api/health`
```json
{ "status": "ok", "db": "connected", "time": "2026-09-09T08:00:00.000Z" }
```

### `POST /api/contact`
Public — this is what the frontend's contact form calls.

Request body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "message": "Hi, I'd love to chat about..." }
```

- Validates `name`, `email`, `message` (all required; length-capped).
- Rate-limited to 8 submissions per IP per 15 minutes.
- Saves the message to MongoDB.
- If SMTP env vars are set, fires a notification email to `CONTACT_TO_EMAIL`
  (a failed email never fails the request — the message is still saved).

Success response (`201`):
```json
{ "success": true, "message": "Thanks — your message has been received. I'll reply soon!", "id": "..." }
```

### `GET /api/contact`
Protected — for you to read saved messages. Send header `x-admin-key: <ADMIN_API_KEY>`.

Query params: `?page=1&limit=20` (limit capped at 50).

```json
{ "page": 1, "limit": 20, "total": 3, "messages": [ { "name": "...", "email": "...", "message": "...", "createdAt": "..." } ] }
```

## Connecting the frontend

In the frontend's `.env`, point `VITE_API_URL` at wherever this server is
deployed (e.g. `http://localhost:5000` locally, or your Render/Railway/Fly
URL in production). The frontend already falls back to opening the visitor's
email client if this API is unreachable, so the site keeps working even if
the backend is temporarily down.

## Deploying

### Vercel Services (recommended — one deployment with the frontend)

If `frontend/` and `backend/` live in the same repo (`My_Portfolio/`), Vercel
can deploy them together as one project using its **Services** feature —
both under one domain, e.g. `https://my-portfolio.vercel.app` for the site
and `https://my-portfolio.vercel.app/api/...` for the API. No CORS setup and
no separate `VITE_API_URL` needed, since it's all same-origin.

1. Add a **`vercel.json` at the repo root** (`My_Portfolio/vercel.json` —
   *not* inside `frontend/` or `backend/`):
   ```json
   {
     "services": {
       "frontend": { "root": "frontend/" },
       "backend": { "root": "backend/", "entrypoint": "api/index.js" }
     },
     "rewrites": [
       { "source": "/api/(.*)", "destination": { "service": "backend" } },
       { "source": "/(.*)", "destination": { "service": "frontend" } }
     ]
   }
   ```
2. Commit and push it.
3. On [vercel.com](https://vercel.com), **Add New Project** → import the repo.
   Vercel should auto-detect both services (frontend as Vite, backend as
   Express) — if it shows a "vercel.json required" notice, that just means
   it's waiting for the file above; click **Refresh** once it's pushed.
4. Set **Environment Variables** on the project (these apply to the backend
   service): `MONGO_URI` (MongoDB Atlas — see note below), `ADMIN_API_KEY`,
   and the `SMTP_*` / `CONTACT_TO_EMAIL` ones if you want email notifications.
   `FRONTEND_URL` and `VITE_API_URL` aren't needed in this setup since
   everything is same-origin.
5. Deploy.

This repo's `api/index.js` (the serverless entry point) works for both this
Services setup and the standalone approach below — no code changes needed
either way.

### Alternative: standalone backend project

If you'd rather deploy the backend as its own separate Vercel project (its
own domain, deployed independently from the frontend):

1. Import `backend/` as its own Vercel project (Root Directory: `backend`).
2. Add a `backend/vercel.json`:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/api" }] }
   ```
3. Set the same env vars as above, plus `FRONTEND_URL` (for CORS) set to
   your frontend's deployed URL.
4. In the **frontend's** Vercel project, set `VITE_API_URL` to this backend's
   deployed URL.

**Two things worth knowing about running Express on Vercel either way:**
- **MongoDB Atlas, not local MongoDB.** A serverless function can't reach
  `mongodb://localhost` — use a MongoDB Atlas connection string in `MONGO_URI`,
  and allow `0.0.0.0/0` in Atlas's Network Access (or Vercel's specific IP
  ranges) since serverless functions don't have a fixed IP.
- **Rate limiting is best-effort here.** `express-rate-limit`'s default store
  is in-memory, which only persists within a single warm serverless instance —
  fine for casual spam protection on a personal portfolio, but not a hard
  guarantee under real load. A durable limit would need an external store
  (e.g. Upstash Redis), which is out of scope for this project.

### Alternative: Render / Railway / Fly.io

If you'd rather run this as a normal always-on Node server instead of
serverless (simpler mental model, no cold starts, rate-limiting works exactly
as written), any of these work well — just set the same environment
variables and use `npm start` as the start command.

Pair any of the above with a free **MongoDB Atlas** cluster.

## Project structure

```
backend/
├── server.js                          # local dev entry point (npm run dev / npm start)
├── api/
│   └── index.js                       # Vercel serverless entry point
├── src/
│   ├── app.js                         # Express app: CORS, JSON parsing, routes, error handling
│   ├── config/db.js                   # MongoDB connection (non-blocking on failure)
│   ├── models/ContactMessage.js       # Mongoose schema
│   ├── controllers/contactController.js
│   ├── routes/contactRoutes.js
│   ├── middleware/rateLimiter.js
│   ├── middleware/requireAdminKey.js
│   ├── middleware/errorHandler.js
│   └── utils/sendMail.js              # optional nodemailer notification
└── .env.example
```
