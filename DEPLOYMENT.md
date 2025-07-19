# Deployment Instructions

## Backend
1. Set environment variables in `.env` (see `.env.example`).
2. Install dependencies: `pnpm install` or `npm install`.
3. Start server: `pnpm start` or `npm start`.
4. Deploy to your preferred platform (e.g., Vercel, Heroku, Render).

## Frontend
1. Set `VITE_API_URL` in `.env` to your backend URL.
2. Install dependencies: `pnpm install` or `npm install`.
3. Build: `pnpm build` or `npm run build`.
4. Deploy `dist/` to Vercel, Netlify, or your static host. 