import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';

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
  gap: 8px;
`;

const RangeButton = styled.button`
  background: transparent;
  color: ${({ $active }) => ($active ? 'var(--white)' : 'var(--light-grey)')};
  border: none;
  padding: 4px 0;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.2s;
  border-bottom: ${({ $active }) => ($active ? '2px solid var(--white)' : '2px solid transparent')};
  border-radius: 0;

  &:hover {
    color: var(--white);
  }

  & + & {
    margin-left: 16px;
  }
`;

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 28px;
`;

const ArtistCard = styled.div`
  text-align: center;
  cursor: default;

  &:hover .artist-img {
    filter: brightness(1.1);
  }
`;

const ArtistImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: var(--grey);
  margin-bottom: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.2s;
  }
`;

const ArtistName = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistGenre = styled.p`
  font-size: 1.2rem;
  color: var(--light-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
  text-transform: capitalize;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px;
  color: var(--green);
  font-size: 1.6rem;
`;

const TIME_RANGES = [
  { label: 'All Time', value: 'long_term', fn: getTopArtistsLong },
  { label: 'Last 6 Months', value: 'medium_term', fn: getTopArtistsMedium },
  { label: 'Last Month', value: 'short_term', fn: getTopArtistsShort },
];

const TopArtist = () => {
    const [artists, setArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('long_term');
    const [loading, setLoading] = useState(true);

    const fetchArtists = (range) => {
    setLoading(true);
    const found = TIME_RANGES.find(r => r.value === range);
    found.fn().then(({ data }) => {
      setArtists(data);
      setLoading(false);
    });
  };
  
    useEffect(() => {
        fetchArtists('long_term');
    }, []);

    const handleRangeChange = (range) => {
        setActiveRange(range);
        fetchArtists(range);
    };

    return ( 
      <Container>
        <Header>
          <Title>Top Artists</Title>
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
          <ArtistsGrid>
            {artists?.items?.map(artist => (
              <ArtistCard key={artist.id}>
                <ArtistImage className="artist-img">
                  {artist.images?.[0] && (
                    <img src={artist.images[0].url} alt={artist.name} />
                  )}
                </ArtistImage>
                <ArtistName>{artist.name}</ArtistName>
                {artist.genres?.[0] && (
                  <ArtistGenre>{artist.genres[0]}</ArtistGenre>
                )}
              </ArtistCard>
            ))}
          </ArtistsGrid>
        )}
      </Container>
    )
}

export default TopArtist;
  