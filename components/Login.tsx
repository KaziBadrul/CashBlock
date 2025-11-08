import React from "react";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <SignedOut>
      <Link href="/sign-up">
        <Button className="w-20 py-5 mx-2 px-25 font-extrabold text-black border-4 border-black bg-chart-4 shadow-[8px_8px_0px_0px_black] hover:bg-yellow-400">
          Sign Up
        </Button>
      </Link>
      <Link href="/sign-in">
        <Button className="w-20 py-5 mx-2 px-25 font-extrabold text-black border-4 border-black bg-chart-2 shadow-[8px_8px_0px_0px_black] hover:bg-red-400">
          Sign In
        </Button>
      </Link>
    </SignedOut>
  );
};

export default Login;
