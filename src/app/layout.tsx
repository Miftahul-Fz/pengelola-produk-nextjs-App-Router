"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './componen/navbar'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Pathname = usePathname()
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        <Navbar></Navbar>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
