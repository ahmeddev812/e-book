import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-pacifico text-4xl text-primary mb-8">BookHaven</h1>
      <SignIn
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
        signUpUrl="/sign-up"
      />
    </div>
  );
}
