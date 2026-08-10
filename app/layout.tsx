import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs"
import { nlNL } from "@clerk/localizations"

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
        <ClerkProvider
          localization={nlNL}
          appearance={{
            variables: {
              colorPrimary: "#1e3a5f",
              colorText: "#0a0f1a",
              colorTextSecondary: "#64748b",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorInputText: "#0a0f1a",
              borderRadius: "0.5rem",
              fontFamily: "Inter, sans-serif",
            },
            elements: {
              card: "shadow-lg border border-gray-200",
              formButtonPrimary: "bg-[#1e3a5f] hover:bg-[#152d4a] text-white",
              footerActionLink: "text-[#1e3a5f] hover:text-[#152d4a]",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
              formFieldInput: "border-gray-300 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]",
              userButtonAvatarBox: "h-10 w-10",
            },
          }}
        >
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}
