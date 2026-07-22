import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kennisbank Edam-Volendam",
  description: "Netwerkpartners en A.I.-assistent voor gemeente Edam-Volendam",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="h-full light">
      <body className={`${inter.className} h-full`}>
        <div className="flex flex-col h-full">
          <Header />
          <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  )
}
