"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons"

const SigninButton = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn(); 
  };

  return (
<div className="flex gap-4 ml-auto">
  {session && session.user ? (
    <>
      <Button className="bg-[#ff5656] rounded-2xl hover:bg-[#ff8585]" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  ) : (
    <>
      {/* Placeholder for Sign In button on the server side */}
      <button style={{ visibility: 'hidden' }}></button>
      {/* Actual Sign In button on the client side */}
      <Button className="test" onClick={handleSignIn}>
        Sign In
      </Button>
    </>
  )}
</div>

  );
};

export default SigninButton;