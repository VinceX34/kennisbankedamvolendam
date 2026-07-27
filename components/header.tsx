import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-border p-4 flex items-center h-28 justify-between">
      <div className="flex-1 flex items-center gap-4">
        <Image src="/Logo_de_toegang.png" alt="De Toegang Logo" width={80} height={40} className="h-10 w-auto" />
        <Image src="/Logo_WSP.jpg" alt="WSP Logo" width={80} height={40} className="h-10 w-auto" />
      </div>
      
      <div className="flex justify-center">
        <Image src="/Kennisbank_logo.png" alt="Kennisbank Logo" width={450} height={120} className="h-48 w-auto" priority />
      </div>

      <div className="flex-1"></div>
    </header>
  );
}
