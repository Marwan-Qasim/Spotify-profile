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

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  if (isTokenExpired()) {
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
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

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.reload();
};

// API calls
const getHeaders = () => ({
  Authorization: `Bearer ${getLocalAccessToken()}`,
  'Content-Type': 'application/json',
});

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
