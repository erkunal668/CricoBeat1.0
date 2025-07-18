import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cricobeat",
  description: "Premier Cricket Academy - Where Champions Are Made",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Apply the dark blue background globally */}
        <div className="bg-primary-dark-blue text-white min-h-screen">{children}</div>
      </body>
    </html>
  )
}
