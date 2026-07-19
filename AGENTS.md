# AGENTS.md

## Cursor Cloud specific instructions

ShopIt is a single Node.js/Express e-commerce **REST API backend** (no frontend, no test suite). Entry point is `backend/server.js`; routes are mounted under `/api/v1` (see `backend/routes/`). Runtime config is read from `backend/config/config.env` (committed, with working defaults), so no extra env setup is needed.

### Services

- **MongoDB** (required): the app connects on startup to `mongodb://localhost:27017/shopit`. MongoDB 8.0 is installed at the system level (persisted in the VM snapshot) but is **not** auto-started. Start it before running the server:
  `mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --bind_ip 127.0.0.1 --port 27017`
  (run it in a background/tmux session; systemd is not available in this container).
- **API server** (required): `npm start` (plain node) or `npx nodemon backend/server.js` (hot reload). Listens on port **4000**.

### Gotchas

- `npm run dev` / `npm run prod` use Windows `SET` syntax and do **not** work on Linux. Use `npx nodemon backend/server.js` for hot reload, or `npm start`. `NODE_ENV` is set via `config.env` regardless.
- MongoDB must be running before starting the server or the seeder, or DB operations hang/fail.
- Seed sample products with `npm run seeder` (destructive: it deletes all products first, then bulk-inserts `backend/data/products.json`).
- Auth uses JWT stored in an HTTP-only cookie named `token`. Protected admin routes (`/api/v1/admin/...`) require that cookie, so authenticate with a cookie jar (e.g. `curl -c/-b cookies.txt`) after `POST /api/v1/register` or `POST /api/v1/login`.
- There is no lint config and no automated tests in this repo.
