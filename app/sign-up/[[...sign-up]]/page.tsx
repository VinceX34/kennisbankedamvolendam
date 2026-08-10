import { SignUp } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
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
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      <div className="mt-8 flex gap-4 text-sm text-gray-500">
        <Link href="/gebruiksvoorwaarden" className="hover:text-gray-700 transition-colors">
          Gebruiksvoorwaarden
        </Link>
        <span>·</span>
        <Link href="/privacyvoorwaarden" className="hover:text-gray-700 transition-colors">
          Privacyvoorwaarden
        </Link>
      </div>
    </div>
  )
}
