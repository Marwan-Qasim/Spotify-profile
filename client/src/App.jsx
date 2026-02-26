import React, {useState, useEffect, use} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { token } from './spotify';

import styled from 'styled-components';
import Login from './components/Login';
import Profile from './components/Profile';

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
    setAccessToken(token);
  }, []);

  return (
    <>
    {accessToken ? (
        <Router>
          <AppContainer>
            <MainContent>
              <Routes>
                <Route path="/" element={<Profile />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      ) : (
        <Login></Login>
      )} 
    </>
  )
}

export default App
