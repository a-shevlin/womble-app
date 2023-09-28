import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface SpotifyData {
  id?: string;
  // ... other properties of the Spotify data
  [key: string]: any;
}

export default function useSpotifyApi(endpoint: string, session: Session) {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const url = `/api/getSpotifyReq?url=${endpoint}`;
        const response = await fetch(url, {
          credentials: 'include',
        });

        if (response.status !== 200) {
          throw new Error(`Failed to fetch Spotify data: ${response.statusText}`);
        } else {
          const result: SpotifyData = await response.json();
          setData(result);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, endpoint]);

  return { data, loading, error };
}
