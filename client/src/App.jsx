import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAccessToken } from './spotify';

import styled from 'styled-components';
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


function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Get token dynamically on component mount
    // This ensures we check the URL hash AFTER the redirect from login
    const currentToken = getAccessToken();
    setAccessToken(currentToken);
  }, []);

  return (
    <>
    {accessToken ? (
        <Router>
          <AppContainer>
            <Nav />
            <MainContent>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/recent" element={<RecentlyPlayed />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      ) : (
        <Login />
      )} 
    </>
  )
}

export default App
