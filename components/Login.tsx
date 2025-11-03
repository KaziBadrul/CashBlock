import React from "react";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <SignedOut>
      <SignUpButton>
        <Button className="w-20 py-5 mx-2 px-25 font-extrabold text-black border-4 border-black bg-chart-4 shadow-[8px_8px_0px_0px_black] hover:bg-yellow-400">
          Sign Up
        </Button>
      </SignUpButton>
      <SignInButton>
        <Button className="w-20 py-5 mx-2 px-25 font-extrabold text-black border-4 border-black bg-chart-2 shadow-[8px_8px_0px_0px_black] hover:bg-red-400">
          Sign In
        </Button>
      </SignInButton>
    </SignedOut>
  );
};

export default Login;
