"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import SigninButton from "./SignInButton";

export default function Navbar() {
  return (
    <div className="bg-[#8B0000]">
      <div className="w-5/6 h-16 flex flex-row items-center justify-center text-white mx-auto">
        <div className="mr-auto font-semibold font-poppin text-lg">
          BigHeartBros
        </div>
        <div className="flex flex-row space-x-8 items-center">
          <Link
            className="font-poppins cursor-pointer hover:text-blue-300"
            href="/home"
          >
            Home
          </Link>
          <Link
            className="font-poppins cursor-pointer hover:text-blue-300"
            href="/opportunities"
          >
            Volunteer
          </Link>
          <Link
            className="font-poppins cursor-pointer hover:text-blue-300"
            href="/profile/DEFAULT_ID"
          >
            Dashboard (user)
          </Link>

          <Link
            className="font-poppins cursor-pointer hover:text-blue-300"
            href="/org-dashboard/DEFAULT_ID"
          >
            Dashboard (org)
          </Link>
          <Link
            className="font-poppins cursor-pointer hover:text-blue-300"
            href="/admin/dashboard"
          >
            Dashboard (admin)
          </Link>
          <SigninButton />
        </div>
      </div>
    </div>
  );
}
