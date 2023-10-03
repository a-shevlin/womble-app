'use client';
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link"
import { Button, ReusableLink } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import { IconLogout2, IconSettings } from '@tabler/icons-react';
// import { useRouter } from "next/router";

type Props = {
  hasSession: boolean,
  sessionData?: Session
}


export default function Nav({hasSession, sessionData}: Props) {
  const pathname = usePathname()
  const [oldPathname, setOldPathname] = useState("/");
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);

  useEffect(() => {
    let curPathname = pathname || "";
    if (curPathname != oldPathname) {
      setOpen(!isOpen);
      setOldPathname(curPathname);
    }
  }, [pathname, oldPathname, isOpen]);


  return (
    <div className="w-full">
      {!hasSession ? (
        <Button onClick={() => signIn('spotify')} text={"Login"} >
          <IconLogout2 />
        </Button>
      ) : (
        <div className="w-full flex flex-row">

          <ReusableLink linkTo={"/"} classes="text-xl text-womble-accent">womble</ReusableLink>
          <div className="w-full text-lg flex flex-row-reverse">

              <Image onClick={() => toggleMenu()} src={sessionData.user.image} alt="Spotify Profile Image" style={{objectFit: "cover", aspectRatio: "1/1", borderRadius: "100%", borderWidth: "3px", borderColor: "#494949a2"}} width={40} height={40} quality={100}/> 
            
            {!isOpen ? (
              <div></div>
              ) : (
                <div className="absolute flex flex-col-reverse w-8 justify-items-center gap-2 top-[4.2rem]">
                <Button onClick={() => signOut()}>
                  <IconLogout2 />
                </Button>
                {pathname == "/" ? (
                  <ReusableLink linkTo={"/account"} classes="px-[0.20rem]">
                    <IconSettings />
                  </ReusableLink>
                ) : (
                  <div></div>
                  )}
              </div>
            )}
          </div>    
        </div>
      )}
    </div>
  )
}
