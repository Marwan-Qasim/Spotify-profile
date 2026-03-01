import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong, formatDuration } from '../spotify';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 60px;
  animation: ${fadeIn} 0.5s ease;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--white);
`;

const TimeRangeButtons = styled.div`
  display: flex;
`;

const RangeButton = styled.button`
  background: transparent;
  color: ${({ $active }) => ($active ? 'var(--white)' : 'var(--light-grey)')};
  border: none;
  padding: 4px 0;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  border-bottom: ${({ $active }) => ($active ? '2px solid var(--white)' : '2px solid transparent')};

  & + & {
    margin-left: 20px;
  }

  &:hover {
    color: var(--white);
  }
`;

const TrackList = styled.ul`
  list-style: none;
`;

const TrackItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: background 0.15s;
  cursor: default;

  &:hover {
    background: rgba(255, 255, 255, 0.05);

    .play-btn {
      opacity: 1;
    }
  }
`;

const TrackNumber = styled.span`
  font-size: 1.4rem;
  color: var(--light-grey);
  min-width: 20px;
  text-align: right;
  flex-shrink: 0;
`;

const AlbumArt = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background: var(--grey);
  position: relative;

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

const TrackName = styled.a`
  display: block;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--green);
    text-decoration: underline;
  }
`;

const TrackArtist = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;
`;

const TrackAlbum = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Duration = styled.span`
  font-size: 1.3rem;
  color: var(--light-grey);
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: var(--green);
  font-size: 1.6rem;
`;

const TIME_RANGES = [
  { label: 'All Time', value: 'long_term', fn: getTopTracksLong },
  { label: 'Last 6 Months', value: 'medium_term', fn: getTopTracksMedium },
  { label: 'Last Month', value: 'short_term', fn: getTopTracksShort },
];

const Tracks = () => {
    const [tracks, setTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('long_term');
    const [loading, setLoading] = useState(true);

    const fetchTracks = (range) => {
    setLoading(true);
    const found = TIME_RANGES.find(r => r.value === range);
    found.fn().then(({ data }) => {
      setTracks(data);
      setLoading(false);
    });
  };
    
    useEffect(() => {
        fetchTracks('long_term');
    }, []);

    const handleRangeChange = (range) => {
        setActiveRange(range);
        fetchTracks(range);
    };

    return (
      <Container>
        <Header>
        <Title>Top Tracks</Title>
        <TimeRangeButtons>
          {TIME_RANGES.map(({ label, value }) => (
            <RangeButton
              key={value}
              $active={activeRange === value}
              onClick={() => handleRangeChange(value)}
            >
              {label}
            </RangeButton>
          ))}
        </TimeRangeButtons>
      </Header>

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <TrackList>
          {tracks?.items?.map((track, i) => (
            <TrackItem key={track.id}>
              <TrackNumber>{i + 1}</TrackNumber>
              <AlbumArt>
                {track.album?.images?.[0] && (
                  <img src={track.album.images[0].url} alt={track.album.name} />
                )}
              </AlbumArt>
              <TrackInfo>
                <TrackName href={track.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  {track.name}
                </TrackName>
                <TrackArtist>{track.artists?.map(a => a.name).join(', ')}</TrackArtist>
              </TrackInfo>
              <TrackAlbum>{track.album?.name}</TrackAlbum>
              <Duration>{formatDuration(track.duration_ms)}</Duration>
            </TrackItem>
          ))}
        </TrackList>
      )}
      </Container>
    );
}

export default Tracks;