import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Outlet Portal",
  description: "Outlet location dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100`}
      >
        {/* NAVBAR */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="font-semibold text-lg">
              Outlet Portal
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/map" className="hover:underline">
                Map
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  )
}
