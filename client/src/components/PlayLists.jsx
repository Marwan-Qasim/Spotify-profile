import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getUserPlaylists } from '../spotify';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 60px;
  animation: ${fadeIn} 0.5s ease;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 40px;
`;

const PlaylistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px;
`;

const PlaylistCard = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const PlaylistArt = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: var(--grey);
  margin-bottom: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaylistName = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackCount = styled.p`
  font-size: 1.1rem;
  color: var(--light-grey);
  margin-top: 4px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: var(--green);
  font-size: 1.6rem;
`;

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPlaylists().then(({ data }) => {
      setPlaylists(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Title>Your Playlists</Title>

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <PlaylistsGrid>
          {playlists?.items?.map(playlist => (
            <PlaylistCard
              key={playlist.id}
              href={playlist.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlaylistArt>
                {playlist.images?.[0] && (
                  <img src={playlist.images[0].url} alt={playlist.name} />
                )}
              </PlaylistArt>
              <PlaylistName>{playlist.name}</PlaylistName>
              <TrackCount>{playlist.tracks?.total} tracks</TrackCount>
            </PlaylistCard>
          ))}
        </PlaylistsGrid>
      )}
    </Container>
  )
}

export default Playlists;