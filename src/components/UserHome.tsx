'use client'

import { Session } from "next-auth"
import { Button } from "@/components/"
import useSpotifyApi from '@/hooks/useSpotifyApi';
import { IconCirclePlus } from '@tabler/icons-react'
import Image from "next/image";

type Props = {
  session: Session
}



export default function UserHome({session}: Props) {
  const curSession = session
  const { data: artists, loading: artistsLoading, error: artistsError } = useSpotifyApi("me/top/artists?time_range=short_term", curSession);

  console.log(artists);
  return (
    <div className="py-4 w-full h-full text-center grid gap-4">
      {/* if no friends/groups  */}
      <h1 className="text-2xl py-2">Welcome to Womble {curSession.user.name}!</h1>
      <div>
        <p>Enter a friend or groupcode here!:</p>
        <input className="rounded-md" type='text'/>
        <Button >
          <IconCirclePlus />
        </Button>
      </div>
      {/* click to dismiss */}
      <div className="p-4 border-womble-light border-2 rounded-md w-2/5 mx-auto">
        <h1 className="mb-4">your top artists</h1>
        <div className="grid grid-cols-4 gap-4">
          {!artistsLoading ? (
            artists.items.map((artist, index) => (
              <div>
                <p>  
                  <Image src={artist.images[2].url} width={artist.images[2].width} height={artist.images[2].height} style={{objectFit: "cover", aspectRatio: "1/1"}}/>
                  {artist.name}
                </p>
              </div>
            ))
          ) : (
            <></>
          )}
          
        </div>
      </div>
    </div>
  )
}
