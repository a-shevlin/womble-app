'use client'
import { Session } from "next-auth";
import { useSession } from 'next-auth/react';
import { usePathname } from "next/navigation";
import Account from "./(pages)/account/page";
import UserHome from "@/components/UserHome";

type Props = {
  hasSession: boolean,
  sessionData?: Session
}

export default function Home({hasSession, sessionData}: Props) {
  const pathname = usePathname()
  
  if (!hasSession) return <p>Error authenticating spotify. Please login again!</p>

  return (
    <main className="w-full h-full">
      <div className="w-full h-full">
        { pathname == "/" ? (
          <UserHome session={sessionData}/>
        ) : pathname == "/account" ? (
          <Account session={sessionData}/>
        ) : (
          <p>404 not found</p>
        )}
      </div>
    </main>
  )
}
