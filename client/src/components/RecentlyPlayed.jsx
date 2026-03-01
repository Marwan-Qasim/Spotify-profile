import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getRecentlyPlayed, formatDuration } from '../spotify';

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

const TrackList = styled.ul`
  list-style: none;
`;

const TrackItem = styled.li`
  list-style: none;
`;

const TrackLink = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: background 0.15s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const AlbumArt = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
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

const TrackMeta = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Duration = styled.span`
  font-size: 1.3rem;
  color: var(--light-grey);
  flex-shrink: 0;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: var(--green);
  font-size: 1.6rem;
`;


const RecentlyPlayed = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecentlyPlayed().then(({ data }) => {
            setTracks(data);
            setLoading(false);
        });
    }, []);

    return( 
        <Container>
        <Title>Recently Played</Title>

        {loading ? (
            <LoadingText>Loading...</LoadingText>
        ) : (
            <TrackList>
            {tracks?.items?.map(({ track, played_at }) => (
                <TrackItem key={`${track.id}-${played_at}`}>
                  <TrackLink href={track.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                    <AlbumArt>
                        {track.album?.images?.[0] && (
                        <img src={track.album.images[0].url} alt={track.album.name} />
                        )}
                    </AlbumArt>
                    <TrackInfo>
                        <TrackName>{track.name}</TrackName>
                        <TrackMeta>
                        {track.artists?.map(a => a.name).join(', ')} · {track.album?.name}
                        </TrackMeta>
                    </TrackInfo>
                    <Duration>{formatDuration(track.duration_ms)}</Duration>
                  </TrackLink>
                </TrackItem>
            ))}
            </TrackList>
        )}
        </Container>
    )

}

export default RecentlyPlayed;
