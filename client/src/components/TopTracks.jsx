import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong, formatDuration } from '../spotify';

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
        <>
        </>
    );
}

export default Tracks;