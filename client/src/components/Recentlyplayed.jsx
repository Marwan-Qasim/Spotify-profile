import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getRecentlyPlayed, formatDuration } from '../spotify';

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
        <>

        </>
    )

export default RecentlyPlayed;
