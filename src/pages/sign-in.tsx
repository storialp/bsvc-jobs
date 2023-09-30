import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto pt-20",
        },
      }}
    />
  );
}
