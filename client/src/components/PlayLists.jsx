import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getUserPlaylists } from '../spotify';

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
    <>
    </>
  )
}

export default Playlists;