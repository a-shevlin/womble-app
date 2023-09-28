'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotifyApi from '@/hooks/useSpotifyApi';

export default function Account() {
  const session = useSession();
  const { data: profile, loading: profileLoading, error: profileError } = useSpotifyApi("me", session);
  const { data: tracks, loading: tracksLoading, error: tracksError } = useSpotifyApi("me/top/tracks?time_range=short_term", session);
  const { data: artists, loading: artistsLoading, error: artistsError } = useSpotifyApi("me/top/artists?time_range=short_term", session);
  // const profile = await fetchProfile(token);


  // Handling loading states
  if (profileLoading ) return <p>Loading...</p>;
  
  // Handling error states
  if (profileError) return <p>Error loading profile: {profileError.message}</p>;
  if (tracksError) return <p>Error loading tracks: {tracksError.message}</p>;


  console.log("Tracks: ", tracks);
  console.log("Artists", artists);
  return (
    <div>
      <h1>Hello! 
      {profile ? (
        <div>
          <p>{profile.id}</p>
        </div>
      ) : (
        <p>Unable to load profile.</p>
      )}
      {!tracksLoading ? ( 
        <ul>
          {tracks.items.map((track, index) => (
            <li key={index}>{track.name} by {track.artists.map(((artist, artistIndex) => (
              artistIndex === 1 ? (
                <span key={artistIndex}>ft. {artist.name} </span>
                ) : (
                <span key={artistIndex}>{artist.name} </span>
              )

              
              
            )))}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
       )}
      </h1>
    </div>
  )
}
