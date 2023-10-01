'use client'
import { Session } from "next-auth";
import { useSession } from 'next-auth/react';
import { usePathname } from "next/navigation";
import Account from "./(pages)/account/page";

type Props = {
  hasSession: boolean,
  sessionData?: Session
}

export default function Home({hasSession, sessionData}: Props) {
  const pathname = usePathname()
  
  if (!hasSession) return <p>Please login again!</p>

  return (
    <main className="">
      <div className="">
        { pathname == "/" ? (
          <p>Home page component. tiled list of friend dashboard?</p>
        ) : pathname == "/account" ? (
          <Account session={sessionData}/>
        ) : (
          <p>404 not found</p>
        )}
      </div>
    </main>
  )
}
