import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logout, formatDuration } from '../spotify';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileContainer = styled.div`
  padding: 60px 60px 60px;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.3s ease;
`;

const ProfileHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;
`;

const Avatar = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 28px;
  border: 3px solid #333;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultAvatar = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: var(--grey);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;

  svg {
    width: 60px;
    height: 60px;
    fill: var(--light-grey);
  }
`;

const Name = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: var(--white);
  margin-bottom: 12px;
  letter-spacing: -1px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--green);
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 28px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatNumber = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--green);
  letter-spacing: 0.5px;
`;

const StatLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--light-grey);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const LogoutButton = styled.button`
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  padding: 12px 36px;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    border-color: var(--white);
    transform: scale(1.02);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section``;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.3px;
`;

const SeeMoreLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--light-grey);
  border: 1.5px solid rgba(255,255,255,0.3);
  border-radius: 50px;
  padding: 8px 20px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--white);
    border-color: var(--white);
  }
`;

const ArtistList = styled.ul`
  list-style: none;
`;

const ArtistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.2s;
  border-radius: 4px;
  cursor: default;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255,255,255,0.03);
  }
`;

const ArtistImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--grey);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArtistName = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--white);
`;

const TrackList = styled.ul`
  list-style: none;
`;

const TrackItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: default;
  border-radius: 4px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255,255,255,0.03);
  }
`;

const TrackImage = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--grey);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtist = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const TrackDuration = styled.span`
  font-size: 1.2rem;
  color: var(--light-grey);
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--green);
  font-size: 1.6rem;
`;


const PersonIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const Profile = () => { 
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then(data => {
      setProfile(data.user);
      setTopArtists(data.topArtists);
      setTopTracks(data.topTracks);
      setPlaylists(data.playlists);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (!profile) return <ErrorMessage>Failed to load profile information.</ErrorMessage>;

  const totalFollowing = profile.following ? profile.following.total : 0;
  const totalPlaylists = playlists ? playlists.total : 0;

    
    return (
      <ProfileContainer>
        <ProfileHeader>
          {profile.images && profile.images.length > 0 ? (
          <Avatar>
            <img src={profile.images[0].url} alt={profile.display_name} />
          </Avatar>
        ) : (
          <DefaultAvatar>
            <PersonIcon />
          </DefaultAvatar>
        )}

        <Name as="a" href={profile.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
          {profile.display_name}
        </Name>

        <Stats>
          <StatItem>
            <StatNumber>{profile.followers?.total ?? 0}</StatNumber>
            <StatLabel>Followers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{totalFollowing}</StatNumber>
            <StatLabel>Following</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{totalPlaylists}</StatNumber>
            <StatLabel>Playlists</StatLabel>
          </StatItem>
        </Stats>

        <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ProfileHeader>
        <Grid>
        {/* Top Artists */}
        <Section>
          <SectionHeader>
            <SectionTitle>Top Artists of All Time</SectionTitle>
            <SeeMoreLink to="/top-artists">See More</SeeMoreLink>
          </SectionHeader>
          <ArtistList>
            {topArtists?.items?.slice(0, 10).map(artist => (
              <ArtistItem key={artist.id}>
                <ArtistImage>
                  {artist.images?.[0] && (
                    <img src={artist.images[0].url} alt={artist.name} />
                  )}
                </ArtistImage>
                <ArtistName>{artist.name}</ArtistName>
              </ArtistItem>
            ))}
          </ArtistList>
        </Section>

        {/* Top Tracks */}
        <Section>
          <SectionHeader>
            <SectionTitle>Top Tracks of All Time</SectionTitle>
            <SeeMoreLink to="/top-tracks">See More</SeeMoreLink>
          </SectionHeader>
          <TrackList>
            {topTracks?.items?.slice(0, 10).map(track => (
              <TrackItem key={track.id}>
                <TrackImage>
                  {track.album?.images?.[0] && (
                    <img src={track.album.images[0].url} alt={track.name} />
                  )}
                </TrackImage>
                <TrackInfo>
                  <TrackName>{track.name}</TrackName>
                  <TrackArtist>
                    {track.artists?.map(a => a.name).join(', ')} · {track.album?.name}
                  </TrackArtist>
                </TrackInfo>
                <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>
              </TrackItem>
            ))}
          </TrackList>
        </Section>
      </Grid>

      </ProfileContainer>
    )
}

export default Profile;