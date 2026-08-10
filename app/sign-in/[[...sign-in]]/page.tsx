import { SignIn } from "@clerk/nextjs"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Image
          src="/Kennisbank_logo.png"
          alt="Kennisbank Edam-Volendam Logo"
          width={420}
          height={112}
          className="h-36 w-auto sm:h-40"
          priority
        />
      </div>
      <SignIn />
    </div>
  )
}
