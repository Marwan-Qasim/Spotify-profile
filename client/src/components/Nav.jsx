import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 70px;
  background-color: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  z-index: 100;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.a`
  position: fixed;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 101;

  svg {
    width: 32px;
    height: 32px;
    fill: var(--white);
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: rgba(29, 185, 84, 0.15);
    transform: scale(1.1);
    
    svg {
      fill: var(--green);
    }
  }
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
`;

const NavItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--light-grey);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 50%;

  span {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    transition: all 0.3s ease;
  }

  /* Profile - Green */
  &:nth-of-type(1) {
    &:hover {
      background-color: rgba(29, 185, 84, 0.15);
      color: #1db954;
      transform: scale(1.1);
    }

    &.active {
      background-color: rgba(29, 185, 84, 0.2);
      color: #1db954;
    }
  }

  /* Top Artists - Purple */
  &:nth-of-type(2) {
    &:hover {
      background-color: rgba(138, 43, 226, 0.15);
      color: #8a2be2;
      transform: scale(1.1);
    }

    &.active {
      background-color: rgba(138, 43, 226, 0.2);
      color: #8a2be2;
    }
  }

  /* Top Tracks - Blue */
  &:nth-of-type(3) {
    &:hover {
      background-color: rgba(30, 144, 255, 0.15);
      color: #1e90ff;
      transform: scale(1.1);
    }

    &.active {
      background-color: rgba(30, 144, 255, 0.2);
      color: #1e90ff;
    }
  }

  /* Recent - Orange */
  &:nth-of-type(4) {
    &:hover {
      background-color: rgba(255, 140, 0, 0.15);
      color: #ff8c00;
      transform: scale(1.1);
    }

    &.active {
      background-color: rgba(255, 140, 0, 0.2);
      color: #ff8c00;
    }
  }

  /* Playlists - Pink */
  &:nth-of-type(5) {
    &:hover {
      background-color: rgba(255, 20, 147, 0.15);
      color: #ff1493;
      transform: scale(1.1);
    }

    &.active {
      background-color: rgba(255, 20, 147, 0.2);
      color: #ff1493;
    }
  }
`;

const GithubLink = styled.a`
  position: fixed;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--light-grey);
  transition: all 0.3s ease;
  border-radius: 50%;
  z-index: 101;

  svg {
    width: 28px;
    height: 28px;
    fill: currentColor;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: var(--white);
    transform: scale(1.1);
  }
`;

// Icons
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3s3-1.3 3-3V6c0-1.7-1.3-3-3-3zm-1 14.9V21h2v-3.1c3.4-.5 6-3.4 6-6.9h-2c0 2.8-2.2 5-5 5s-5-2.2-5-5H5c0 3.5 2.6 6.4 6 6.9z"/>
  </svg>
);

const MusicIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const Nav = () => (
  <>
    <Logo href="/">
      <SpotifyIcon />
    </Logo>

    <NavContainer>
      <NavItems>
        <NavItem>
          <StyledNavLink to="/" end>
            <UserIcon />
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/top-artists">
            <MicIcon />
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/top-tracks">
            <MusicIcon />
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/recent">
            <HistoryIcon />
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/playlists">
            <ListIcon />
          </StyledNavLink>
        </NavItem>
      </NavItems>
    </NavContainer>

    <GithubLink href="https://github.com/Marwan-Qasim/Spotify-profile" target="_blank" rel="noopener noreferrer">
      <GithubIcon />
    </GithubLink>
  </>
);

export default Nav;