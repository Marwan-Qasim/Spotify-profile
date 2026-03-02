const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'e6e86f3fe5054f6e99c7b64068d397df';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'fe3f186ef84f482495304ccb19c28376';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:5173';

// Allow multiple origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://the-spotify-profile.vercel.app',
  process.env.FRONTEND_URI,
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked origin: ${origin}`);
      callback(null, true); // Allow for now - tighten security later
    }
  },
  credentials: true 
}));
app.use(express.json());

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  // Added user-follow-read so /me/following is allowed
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played playlist-read-private user-follow-read';

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
        state,
      }),
  );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    res.redirect(`${FRONTEND_URI}/#access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    res.redirect(`${FRONTEND_URI}/#error=invalid_token`);
  }
});

app.get('/refresh_token', async (req, res) => {
  const { refresh_token } = req.query;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: 'Failed to refresh token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
