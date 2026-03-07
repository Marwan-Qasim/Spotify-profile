import axios from 'axios';

// Tokens
const EXPIRATION_TIME = 3600 * 1000; // 1 hour in ms

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = (token) => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Logout function - defined early so it can be used by other functions
export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  // Clear URL hash
  window.history.replaceState('', document.title, window.location.pathname + window.location.search);
  window.location.href = '/';
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = getLocalRefreshToken();
    if (!refreshToken || refreshToken === 'undefined') {
      console.error('No refresh token available');
      logout();
      return;
    }
    const { data } = axios.get(`https://spotify-profile-bmj1.onrender.com/refresh_token?refresh_token=${refreshToken}`)
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
  } catch (e) {
    console.error('Token refresh failed:', e);
    logout();
  }
};

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error('Auth error:', error);
    // Clear hash and logout on error
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    logout();
    return null;
  }

  // ALWAYS prioritize fresh tokens from URL hash (new login)
  if (access_token && refresh_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    // Clear hash from URL to prevent token reuse
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    return access_token;
  }

  // Check if existing token is expired
  if (isTokenExpired()) {
    refreshAccessToken();
    return null;
  }

  // Fall back to localStorage token
  const localAccessToken = getLocalAccessToken();
  
  // Validate token exists and is not 'undefined' string
  if (!localAccessToken || localAccessToken === 'undefined') {
    return null;
  }
  
  return localAccessToken;
};

const isTokenExpired = () => {
  const tokenTimestamp = getTokenTimestamp();
  if (!tokenTimestamp) return false;
  return Date.now() - Number(tokenTimestamp) > EXPIRATION_TIME;
};

const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const token = getAccessToken();

// Re-export getAccessToken so it can be called dynamically
export { getAccessToken as getAccessTokenDynamic };

// API calls
const getHeaders = () => {
  const token = getAccessToken();
  if (!token || token === 'undefined') {
    console.error('No valid access token available');
    logout();
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers: getHeaders() });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers: getHeaders() });

export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers: getHeaders() });

export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', { headers: getHeaders() });

export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers: getHeaders() });

export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers: getHeaders() });

export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers: getHeaders() });

export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers: getHeaders() });

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers: getHeaders() });

export const getUserPlaylists = () =>
  axios.get('https://api.spotify.com/v1/me/playlists', { headers: getHeaders() });

export const getPlaylistById = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers: getHeaders() });

export const getUserInfo = () =>
  Promise.all([getUser(), getFollowing(), getRecentlyPlayed(), getTopArtistsLong(), getTopTracksLong(), getUserPlaylists()]).then(
    ([user, followedArtists, recentlyPlayed, topArtists, topTracks, playlists]) => ({
      user: user.data,
      followedArtists: followedArtists.data,
      recentlyPlayed: recentlyPlayed.data,
      topArtists: topArtists.data,
      topTracks: topTracks.data,
      playlists: playlists.data,
    })
  );

export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
