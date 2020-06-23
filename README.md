# Discursópoli

## Stack
Backend: Firebase Hosting. A node/express app runs on a Firebase Function instance.

Frontend: SPA using Preact and Material UI components.

## Development
Run local server:
```
GOOGLE_APPLICATION_CREDENTIALS=../service-accounts/crlf-d8b04-ee815416296a.json firebase emulators:start
```

Build (both backend and frontend):
```
tools/build
```
## Production
Production build (both backend and frontend):
```
tools/build_production
```

Deploy (includes build):
```
tools/deploy
```
