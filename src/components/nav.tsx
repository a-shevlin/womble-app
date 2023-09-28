'use client';
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Button from "./button";
import { useEffect, useState } from "react";


export default function Nav() {
  // Inside a component or a function
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // You can call getSession here to refetch the session if needed.
      console.log("authenticated");
      getSession().then(newSession => {
        console.log('New Session:', newSession);
      });
    }
  }, [status]);
  return (
    <div className="w-full ">

      {session == null ? (
        <Button onClick={() => signIn('spotify')} text={"Login"}/>
      ) : (
        <Button onClick={() => signOut()} text={"Logout"}/>
      )}

    </div>
  )
}
