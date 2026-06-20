# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project setup notes (My-Fitness-App)

- **Environment variables:** Create a `.env` file at the project root with Vite-style variables. See `.env.example`.

	Example `.env` (do NOT commit real keys):

	VITE_SUPABASE_URL=https://your-project-ref.supabase.co
	VITE_SUPABASE_ANON_KEY=your-anon-public-key

- **Database:** The app expects a `users` table that references Supabase Auth user ids. See `db/create_users_table.sql` for a starter SQL snippet you can run in the Supabase SQL editor.

- **Start dev server:**

```bash
npm install
npm run dev
```

**Quick setup**

1. Copy `.env.example` to `.env` and fill in real Supabase values, or run the helper:

```bash
npm run setup
```

2. Install deps and start the dev server:

```bash
npm install
npm run dev
```

If you don't have Supabase keys yet, the app will warn but still run — features that require the API will fail until valid keys are provided.

If you cannot reach the app at `http://localhost:5173`:

- Check the terminal where you ran `npm run dev` — Vite prints the exact local URL and port. If a different port is used, open that URL.
- If the browser shows "refused to connect", try starting with explicit host binding:

```bash
npm run dev -- --host
```

- On Windows, verify the dev server is listening on the port:

```powershell
netstat -ano | findstr :5173
```

- If something else is using the port, kill it (`taskkill /PID <PID> /F`) and restart.

- **Next recommended steps:**
	- Move any remaining secrets out of source control and into environment variables.
	- Create a protected-route wrapper (done) and verify auth flows.
	- Run the SQL in `db/create_users_table.sql` in your Supabase project before signing up users.

- **Testing & coverage**

	Run tests locally:

	```bash
	npm run test        # interactive/watch
	npm run test:ci     # single run
	npm run test:coverage
	```

## Deployment (Vercel)

This repo includes a GitHub Actions workflow to deploy to Vercel on pushes to `main`: `.github/workflows/deploy-vercel.yml`.

Before the workflow can run, add the following repository secrets in GitHub (Settings → Secrets):

- `VERCEL_TOKEN` — your Vercel personal token (create at https://vercel.com/account/tokens).
- `VERCEL_ORG_ID` — your Vercel organization ID (found in project settings or Vercel dashboard).
- `VERCEL_PROJECT_ID` — your Vercel project ID.

Once secrets are set, pushes to `main` will trigger a production deploy.

If you prefer, you can also connect the repository directly in the Vercel dashboard (recommended for first-time setup).
	CI will run tests and upload coverage as an artifact. Coverage thresholds are enforced in `vitest.config.js` (statements/functions/lines >= 80%, branches >= 75%).
