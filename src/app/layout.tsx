import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { authOptions } from '../../pages/api/auth/[...nextauth].js'
import { getServerSession } from 'next-auth';
import SessionProvider from './SessionProvider';
import Home from './page';
import Auth from './(pages)/auth/page';
import Nav from '@/components/nav';
import Account from './(pages)/account/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  themeColor: [
    {
      color: "#0a2c41",
      media: "dark"
    },
    {
      color: "#f7dee5",
      media: "light"
    }
  ],
  title: { default: "Womable", template: "%s | Womable" },
  description: "Check out you and your friends current listening scores!",
  applicationName: "Womable",
  icons: {
    icon: [
      "/favicon.ico"
    ],
  },
  viewport: { width: "device-width", initialScale: 1 },
  manifest: '/manifest.webmanifest'
  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`color-scheme ${inter.className}`}>
        <SessionProvider session={session}>
          <main>
          <Nav />
          {!session? (
            <Auth/>
          ) : (
            <Account/>
          )}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
