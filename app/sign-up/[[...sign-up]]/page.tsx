import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-4 py-8 sm:py-12">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  )
}
