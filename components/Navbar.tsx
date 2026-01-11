"use client"

import Link from "next/link"

export default function Navbar() {
  return (
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
          {/* <Link href="/import" className="hover:underline">
            Import
          </Link> */}
        </nav>
      </div>
    </header>
  )
}
