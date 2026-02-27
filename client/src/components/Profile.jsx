import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logout, formatDuration } from '../spotify';
import styled, { keyframes } from 'styled-components';

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

        </ProfileHeader>

      </ProfileContainer>
    )
}

export default Profile;