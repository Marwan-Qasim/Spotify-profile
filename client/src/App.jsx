import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAccessToken, startSpotifyLogin } from './spotify';

import styled, { keyframes } from 'styled-components';
import Login from './components/Login';
import Profile from './components/Profile';
import Nav from './components/Nav';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import RecentlyPlayed from './components/RecentlyPlayed';
import Playlists from './components/PlayLists';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--black);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: var(--nav-width);
  padding: 0;
  min-height: 100vh;
`;

const bannerIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PreviewBanner = styled.div`
  margin: 24px 24px 0;
  padding: 18px 22px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.18), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  animation: ${bannerIn} 0.35s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BannerCopy = styled.div`
  display: grid;
  gap: 4px;
`;

const BannerTitle = styled.h2`
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--white);
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
`;

const BannerActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const BannerButton = styled.button`
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryBannerButton = styled(BannerButton)`
  background: var(--green);
  color: var(--black);
`;

const SecondaryBannerButton = styled(BannerButton)`
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;


function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Get token dynamically on component mount
    // This ensures we check the URL hash AFTER the redirect from login
    const currentToken = getAccessToken();
    setAccessToken(currentToken);
  }, []);

  const isPreviewMode = !accessToken;

  return (
    <Router>
      <AppContainer>
        <Nav />
        <MainContent>
          {isPreviewMode && (
            <PreviewBanner>
              <BannerCopy>
                <BannerTitle>Preview mode is active</BannerTitle>
                <BannerText>
                  Visitors can explore the full Spotify-profile UI with curated mock data. Connect your Spotify account to switch into live mode.
                </BannerText>
              </BannerCopy>
              <BannerActions>
                <PrimaryBannerButton onClick={startSpotifyLogin}>Log in with Spotify</PrimaryBannerButton>
                <SecondaryBannerButton onClick={() => window.location.reload()}>Refresh preview</SecondaryBannerButton>
              </BannerActions>
            </PreviewBanner>
          )}

          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/top-artists" element={<TopArtists />} />
            <Route path="/top-tracks" element={<TopTracks />} />
            <Route path="/recent" element={<RecentlyPlayed />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  )
}

export default App
