import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-pacifico text-4xl text-primary mb-8">BookHaven</h1>
      <SignUp
        appearance={{
          elements: {
            card: "shadow-lg rounded-xl",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
            formButtonPrimary: "bg-primary hover:bg-blue-700",
            footerActionLink: "text-primary hover:text-blue-700",
          },
        }}
        signInUrl="/sign-in"
      />
    </div>
  );
}
