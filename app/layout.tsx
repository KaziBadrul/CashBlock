import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ensureUserRow } from "@/lib/user";

import { SignedIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashBlock",
  description: "Manage Cash, Monthly.",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await ensureUserRow();
  return (
    <ClerkProvider
      appearance={{
        theme: neobrutalism,
      }}
      localization={{
        signIn: {
          start: {
            title: "Login to CashBlock",
            subtitle: "Manage your cash, monthly.",
            actionText: "Don't have an account?",
          },
        },
        signUp: {
          start: {
            title: "Join CashBlock",
            subtitle: "Manage your cash, monthly.",
            actionText: "Already have an account?",
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black`}
        >
          <SignedIn>
            <Navbar user={user} />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
