import { useEffect, useState, ComponentType } from "react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import SessionProvider from "@/app/SessionProvider";
import RootLayout from "@/app/layout";

interface WombleAppProps {
  Component: ComponentType,
  pageProps: any
}

export default function WombleApp({ Component, pageProps }: WombleAppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getServerSession(authOptions);
        setSession(session);
      } catch (error) {
        console.error("Error fetching session", error);
      }
    };
    fetchSession();
  }, []);
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}

