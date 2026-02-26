import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--black);
  animation: ${fadeIn} 0.6s ease;
`;

const Logo = styled.div`
  margin-bottom: 48px;

  svg {
    width: 80px;
    height: 80px;
    fill: var(--green);
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: var(--light-grey);
  margin-bottom: 48px;
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--black);
  padding: 16px 48px;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--green-hover);
    transform: scale(1.04);
  }
`;

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const Login = () => (
  <LoginContainer>
    <Logo>
      <SpotifyIcon />
    </Logo>
    <Title>Spotify Profile</Title>
    <Subtitle>Visualize your Spotify listening history</Subtitle>
    <LoginButton href="http://localhost:8888/login">
      Log in with Spotify
    </LoginButton>
  </LoginContainer>
);

export default Login;
