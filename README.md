# Spotify Profile

> A web app for visualizing personalized Spotify data

Built with a bunch of things, but to name a few:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React (Vite)](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)

## Setup

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8888/callback` as a Redirect URI in the app settings
1. Create an `.env` file in the `server/` directory based on `server/.env.example`
1. `nvm use`
1. Install dependencies:

```bash
# backend
cd server && npm install

# frontend
cd ../client && npm install
```

1. Start for development:

```bash
# backend (from server/)
cd server && npm start

# frontend (from client/)
cd ../client && npm run dev
```

