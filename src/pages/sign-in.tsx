import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto pt-20 text-3xl",
          socialButtonsBlockButton: "shadow-md",
          socialButtonsBlockButtonText: "text-lg font-semibold pl-3",
          socialButtonsProviderIcon: "h-8 w-8 object-cover overflow-visible",
        },
      }}
    />
  );
}
