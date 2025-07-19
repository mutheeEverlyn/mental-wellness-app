# Monitoring & Error Tracking

## Backend
- Use services like Sentry, LogRocket, or Datadog for error tracking.
- Example (Sentry):
  1. Install: `npm install @sentry/node`
  2. In `server/index.js`:
     ```js
     const Sentry = require('@sentry/node');
     Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
     app.use(Sentry.Handlers.requestHandler());
     app.use(Sentry.Handlers.errorHandler());
     ```

## Frontend
- Use Sentry, LogRocket, or similar for error tracking.
- Example (Sentry):
  1. Install: `npm install @sentry/react`
  2. In `client/src/main.jsx`:
     ```js
     import * as Sentry from '@sentry/react';
     Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
     ``` 