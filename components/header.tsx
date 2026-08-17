"use client";

import Image from "next/image";
import { UserButton, Show } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-border p-4 flex items-center h-20">
      <div className="flex-1 flex items-center gap-4">
        <Image src="/Logo_de_toegang.png" alt="De Toegang Logo" width={80} height={40} className="h-10 w-auto" />
        <Image src="/Logo_WSP.jpg" alt="WSP Logo" width={80} height={40} className="h-10 w-auto" />
      </div>
      
      <div className="flex justify-center">
        <Image src="/Kennisbank_logo.png" alt="Kennisbank Logo" width={300} height={80} className="h-32 w-auto" priority />
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
