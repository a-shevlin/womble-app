import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
  manifest: '/manifest.webmanifest'
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
