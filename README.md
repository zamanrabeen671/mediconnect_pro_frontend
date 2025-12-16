
# mediConnect Pro — Web Client

Frontend web client for the mediConnect Pro backend. Built with React, Vite and TypeScript, this app provides the user interface for authentication, appointment booking, scheduling, doctor/patient profiles, and prescription management.

---

## Features

- Authentication (login/register) with JWT integration to backend
- Role-based UI for patients, doctors, and admins
- Browse and manage doctor profiles and schedules
- Book, view, and manage appointments (pending, done, rx issued)
- View and upload prescriptions (images/PDFs) and attach to appointments
- Responsive dashboard and pages for mobile and desktop
- TypeScript, TailwindCSS, and Vite for fast dev experience

---

## Tech Stack

- React + TypeScript
- Vite (dev server & bundler)
- TailwindCSS (styling)
- Axios / Fetch (API requests)
- Optional Electron support (if present in this repo)

---

## Quickstart (macOS / Linux / Windows)

1. Install dependencies

```bash
cd mediConnect_Pro_client
npm install
```

2. Configure environment variables

Create a `.env` or `.env.local` file in the project root with at least the API base URL:

```
VITE_API_URL=http://127.0.0.1:8000
```

3. Run the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm run preview
```

Note: Check `package.json` for exact script names if they differ.

---

## Integrating with the Backend

- Start the backend API first (see backend README). The frontend expects a running REST API (default: `http://127.0.0.1:8000`).
- Point `VITE_API_URL` to the backend base URL. The frontend will use this to call endpoints like `/auth/login`, `/appointments`, `/prescriptions`, etc.
- Use the backend OpenAPI docs at `http://127.0.0.1:8000/docs` to inspect request/response shapes while developing the UI.

---

## Project Structure (high level)

- `src/` — application source
	- `components/` — reusable UI components
	- `pages/` — route pages (Home, Login, Dashboard, Appointments, Prescriptions, etc.)
	- `store/` — client state management (auth, data stores)
	- `utils/` — helpers, API wrapper, auth utilities
	- `settings/` — app config (e.g., `config.ts` for API URL)

Refer to the source folders for component and page-level details.

---

## Notes

- Keep the backend running and CORS enabled for local development.
- If the repo includes Electron packaging, review `package.json` and `electron` config before building desktop bundles.

---

If you want, I can also:

- add a short `How to connect to local backend` section with example login calls
- list exact `npm` scripts by reading `package.json`


