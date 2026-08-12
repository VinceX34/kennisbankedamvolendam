import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-4 py-8 sm:py-12">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
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
