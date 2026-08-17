import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-4 py-8 sm:py-12">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  )
}
