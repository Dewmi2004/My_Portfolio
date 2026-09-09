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

Any Node host works — **Render**, **Railway**, **Fly.io**, or a small VPS.
Pair it with a free **MongoDB Atlas** cluster (whitelist the host's outbound
IP, or `0.0.0.0/0` for simplicity on a personal project) and set the env vars
above in the host's dashboard.

## Project structure

```
backend/
├── server.js                          # entry point: loads env, connects DB, starts the app
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
