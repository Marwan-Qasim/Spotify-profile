const delay = (data, ms = 400) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ data }), ms);
  });

const svgArt = (label, colors) => {
  const [start, end] = colors;
  const safeLabel = label.replace(/&/g, '&amp;');

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="48" fill="url(#g)"/>
      <circle cx="320" cy="74" r="78" fill="rgba(255,255,255,0.12)"/>
      <circle cx="86" cy="330" r="110" fill="rgba(0,0,0,0.18)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="54" font-weight="700">${safeLabel}</text>
    </svg>
  `)}`;
};

const makeArtist = (id, name, genre, colors) => ({
  id,
  name,
  genres: [genre],
  images: [{ url: svgArt(name.slice(0, 2).toUpperCase(), colors) }],
  external_urls: { spotify: 'https://open.spotify.com/' },
});

const makeTrack = (id, name, artistNames, albumName, colors, durationMs) => ({
  id,
  name,
  artists: artistNames.map((artistName) => ({ name: artistName })),
  album: {
    name: albumName,
    images: [{ url: svgArt(albumName.slice(0, 2).toUpperCase(), colors) }],
  },
  duration_ms: durationMs,
  external_urls: { spotify: 'https://open.spotify.com/' },
});

const previewArtists = [
  makeArtist('artist-1', 'Mika North', 'dream pop', ['#0f172a', '#38bdf8']),
  makeArtist('artist-2', 'Solar Tide', 'electronic', ['#111827', '#f97316']),
  makeArtist('artist-3', 'Velvet Pulse', 'indie rock', ['#1b1b2f', '#a855f7']),
  makeArtist('artist-4', 'Noon Letters', 'alternative r&b', ['#0b1320', '#10b981']),
  makeArtist('artist-5', 'Echo Bloom', 'art pop', ['#2b0f2f', '#ec4899']),
  makeArtist('artist-6', 'Neon Harbor', 'synthwave', ['#0f172a', '#06b6d4']),
  makeArtist('artist-7', 'Paper Satellites', 'bedroom pop', ['#111827', '#f59e0b']),
  makeArtist('artist-8', 'Midnight Frame', 'ambient', ['#111827', '#64748b']),
  makeArtist('artist-9', 'Blue District', 'neo soul', ['#0f172a', '#3b82f6']),
  makeArtist('artist-10', 'Cinder Club', 'alt-pop', ['#111827', '#ef4444']),
];

const previewTracks = [
  makeTrack('track-1', 'Glass Skyline', ['Mika North'], 'Night Drive', ['#0f172a', '#38bdf8'], 214000),
  makeTrack('track-2', 'After the Rain', ['Velvet Pulse', 'Noon Letters'], 'Static Garden', ['#1b1b2f', '#a855f7'], 188000),
  makeTrack('track-3', 'Warm Static', ['Solar Tide'], 'Late Signal', ['#111827', '#f97316'], 241000),
  makeTrack('track-4', 'Silver Thread', ['Echo Bloom'], 'Color Theory', ['#2b0f2f', '#ec4899'], 197000),
  makeTrack('track-5', 'Low Light', ['Neon Harbor'], 'Night Systems', ['#0f172a', '#06b6d4'], 263000),
  makeTrack('track-6', 'Quiet Voltage', ['Paper Satellites'], 'Soft Machines', ['#111827', '#f59e0b'], 176000),
  makeTrack('track-7', 'Parallel Hearts', ['Blue District'], 'City Echoes', ['#0f172a', '#3b82f6'], 229000),
  makeTrack('track-8', 'Open Window', ['Midnight Frame'], 'Blue Hour', ['#111827', '#64748b'], 204000),
  makeTrack('track-9', 'North Star Radio', ['Cinder Club'], 'Signal Fire', ['#111827', '#ef4444'], 216000),
  makeTrack('track-10', 'Fading Neon', ['Mika North', 'Solar Tide'], 'Night Drive', ['#0f172a', '#38bdf8'], 252000),
];

const previewPlaylists = [
  { id: 'playlist-1', name: 'Late Night Drift', tracks: { total: 42 }, images: [{ url: svgArt('LN', ['#111827', '#38bdf8']) }], external_urls: { spotify: 'https://open.spotify.com/' } },
  { id: 'playlist-2', name: 'Soft Focus', tracks: { total: 28 }, images: [{ url: svgArt('SF', ['#2b0f2f', '#ec4899']) }], external_urls: { spotify: 'https://open.spotify.com/' } },
  { id: 'playlist-3', name: 'City Afterglow', tracks: { total: 61 }, images: [{ url: svgArt('CA', ['#111827', '#f97316']) }], external_urls: { spotify: 'https://open.spotify.com/' } },
  { id: 'playlist-4', name: 'Glass Room Sessions', tracks: { total: 19 }, images: [{ url: svgArt('GR', ['#0f172a', '#10b981']) }], external_urls: { spotify: 'https://open.spotify.com/' } },
  { id: 'playlist-5', name: 'Radio Preview', tracks: { total: 15 }, images: [{ url: svgArt('RP', ['#0f172a', '#a855f7']) }], external_urls: { spotify: 'https://open.spotify.com/' } },
];

const previewRecentlyPlayed = previewTracks.slice(0, 8).map((track, index) => ({
  track,
  played_at: new Date(Date.now() - index * 1000 * 60 * 28).toISOString(),
}));

const previewUser = {
  display_name: 'Preview Listener',
  external_urls: { spotify: 'https://open.spotify.com/user/preview-listener' },
  images: [{ url: svgArt('PL', ['#0f172a', '#1db954']) }],
  followers: { total: 12840 },
  following: { total: 312 },
};

const cloneRange = (items, count, rotate = 0) => ({
  items: items.slice(rotate).concat(items.slice(0, rotate)).slice(0, count),
  total: count,
});

export const getMockUser = () => delay(previewUser);
export const getMockFollowing = () => delay({ artists: previewArtists.slice(0, 12), total: previewUser.following.total });
export const getMockRecentlyPlayed = () => delay({ items: previewRecentlyPlayed });
export const getMockTopArtistsShort = () => delay(cloneRange(previewArtists, 8, 2));
export const getMockTopArtistsMedium = () => delay(cloneRange(previewArtists, 9, 1));
export const getMockTopArtistsLong = () => delay(cloneRange(previewArtists, 10, 0));
export const getMockTopTracksShort = () => delay(cloneRange(previewTracks, 8, 1));
export const getMockTopTracksMedium = () => delay(cloneRange(previewTracks, 9, 0));
export const getMockTopTracksLong = () => delay(cloneRange(previewTracks, 10, 2));
export const getMockUserPlaylists = () => delay({ items: previewPlaylists, total: previewPlaylists.length });
export const getMockPlaylistById = () => delay(previewPlaylists[0]);

export const getMockUserInfo = () =>
  Promise.all([
    getMockUser(),
    getMockFollowing(),
    getMockRecentlyPlayed(),
    getMockTopArtistsLong(),
    getMockTopTracksLong(),
    getMockUserPlaylists(),
  ]).then(([user, followedArtists, recentlyPlayed, topArtists, topTracks, playlists]) => ({
    user: user.data,
    followedArtists: followedArtists.data,
    recentlyPlayed: recentlyPlayed.data,
    topArtists: topArtists.data,
    topTracks: topTracks.data,
    playlists: playlists.data,
  }));