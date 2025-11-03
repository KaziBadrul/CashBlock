import React from "react";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <SignedOut>
      <SignUpButton>
        <Button className="w-20 py-5 mx-2 px-25">Sign Up</Button>
      </SignUpButton>
      <SignInButton>
        <Button className="w-20 py-5 mx-2 bg-blue-500 px-25">Sign In</Button>
      </SignInButton>
    </SignedOut>
  );
};

export default Login;
