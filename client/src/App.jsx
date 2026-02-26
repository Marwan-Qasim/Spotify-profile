import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import Login from './components/login';

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
 
  return (
    <>
      <AppContainer>
        <MainContent>
          <Login></Login>
        </MainContent>
      </AppContainer>
    </>
  )
}

export default App
