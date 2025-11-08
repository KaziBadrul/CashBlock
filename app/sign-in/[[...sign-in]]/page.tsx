// app/signin/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen border-8 border-black bg-chart-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] transition-all">
      <SignIn />
    </div>
  );
}
