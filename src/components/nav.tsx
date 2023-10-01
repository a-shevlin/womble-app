'use client';
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link"
import { Button, ReusableLink } from "@/components";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";

type Props = {
  hasSession: boolean,
  sessionData?: Session
}


export default function Nav({hasSession, sessionData}: Props) {
  // Inside a component or a function
  const { data: session, status } = useSession();
  const pathname = usePathname()


  useEffect(() => {
    if (hasSession) {
      // console.log("authenticated");
      getSession()
        // .then(newSession => {
        //   console.log('New Session:', newSession);
        // });
    }
  }, [hasSession]);


  return (
    <div className="w-full px-4">
      {!hasSession ? (
        <Button onClick={() => signIn('spotify')} text={"Login"} />
      ) : (
        <div className="w-full flex flex-row-reverse gap-2 text-lg">
          <Button onClick={() => signOut()} text={"Logout"} />
          {pathname == "/" ? (
            <ReusableLink linkTo={"/account"} text={"Account"} />
          ) : (
            <ReusableLink linkTo={"/"} text={"Home"} />
          )}
          {/* user profile image */}
          {/* <Image src={sessionData.user.image} alt="User Profile" width={100} height={100} quality={100}/> */} 

        </div>    
      )}
    </div>
  )
}
