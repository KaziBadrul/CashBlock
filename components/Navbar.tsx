import React from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";

interface NavbarProps {
  user: {
    fullName: string | null;
    email: string | null;
  } | null;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="fixed z-10 w-full h-16 flex items-center justify-between border-black border-b-2 bg-[#ffec00] text-black px-4 py-3 font-mono tracking-tight">
      {/* Left Side - Greeting */}
      <div className="flex items-center gap-2 text-2xl font-extrabold">
        <Image
          src="/CashBlockLogo.png"
          alt="CashBlock"
          width={50}
          height={50}
        />
        <span>CashBlock</span>
      </div>

      {/* Right Side - User Button */}
      <div className="flex items-center gap-3">
        <Link href="/settings">
          <Settings className="w-6 h-6 text-black hover:text-gray-700 cursor-pointer" />
        </Link>
        <div className="hidden sm:block font-mono font-bold bg-white border-4 border-black px-2 py-1">
          {user?.fullName ?? "user@email.com"}
        </div>
        <div className="border-4 rounded-full border-black bg-black hover:bg-white hover:text-black transition-colors">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
