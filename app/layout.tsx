import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import { SidebarLayout } from "@/components/sidebar-layout"
import "./globals.css"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3D Scanner Control System",
  description: "IoT-based 3D photogrammetry scanner with Raspberry Pi and PC integration",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-black text-white antialiased`}>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  )
}

