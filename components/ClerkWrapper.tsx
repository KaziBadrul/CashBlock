// components/ClerkWrapper.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      {children}
    </ClerkProvider>
  );
}
