"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  return (
    <header className="w-full bg-background border-b border-border p-4 flex items-center h-28 justify-between">
      <div className="flex-1 flex items-center gap-4">
        <Image src="/Logo_de_toegang.png" alt="De Toegang Logo" width={80} height={40} className="h-10 w-auto" />
        <Image src="/Logo_WSP.jpg" alt="WSP Logo" width={80} height={40} className="h-10 w-auto" />
      </div>
      
      <div className="flex justify-center">
        <Image src="/Kennisbank_logo.png" alt="Kennisbank Logo" width={450} height={120} className="h-48 w-auto" priority />
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <SignedOut>
          <SignInButton>
            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              Inloggen
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-[#1e3a5f] text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-[#152d4a] transition-opacity cursor-pointer">
              Registreren
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
