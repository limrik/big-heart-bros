"use client";
import Link from "next/link";
import SigninButton from "./SignInButton";
import { useUserTypeStore, UserType } from "../store/zustand";
import { User } from "lucide-react";
import { Building2 } from "lucide-react";
import { Heart } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Navbar() {
  const { userType, setUserType } = useUserTypeStore();
  return (
    <div className="bg-[#8B0000]">
      <div className="w-5/6 h-16 flex flex-row items-center text-white mx-auto">
        <div className="mr-auto font-semibold font-poppin text-lg">
          BigHeartBros
        </div>
        <div className="flex-grow ml-4 font-poppin">
          <Tabs defaultValue={userType} className="w-[400px]">
            <TabsList>
              <TabsTrigger
                className="rounded"
                value="volunteer"
                onClick={() => {
                  setUserType(UserType.VOLUNTEER);
                }}
              >
                <User className="mr-2" />
                User
              </TabsTrigger>
              <TabsTrigger
                className="rounded"
                value="organisation"
                onClick={() => {
                  setUserType(UserType.ORGANISATION);
                }}
              >
                <Building2 className="mr-2" />
                Organisation
              </TabsTrigger>
              <TabsTrigger
                className="rounded"
                value="admin"
                onClick={() => {
                  setUserType(UserType.ADMIN);
                }}
              >
                <Heart className="mr-2" />
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* if user */}
        {userType === UserType.VOLUNTEER && (
          <div className="flex flex-row space-x-8 items-center">
            <Link
              className="font-poppins cursor-pointer hover:text-blue-300"
              href="/"
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
              Profile
            </Link>
            <SigninButton />
          </div>
        )}

        {userType === UserType.ORGANISATION && (
          <div className="flex flex-row space-x-8 items-center">
            <Link
              className="font-poppins cursor-pointer hover:text-blue-300"
              href="/"
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
              href="/org-dashboard/DEFAULT_ID"
            >
              Dashboard
            </Link>
            <SigninButton />
          </div>
        )}

        {userType === UserType.ADMIN && (
          <div className="flex flex-row space-x-8 items-center">
            <Link
              className="font-poppins cursor-pointer hover:text-blue-300"
              href="/"
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
              href="/admin/dashboard"
            >
              Dashboard
            </Link>
            <SigninButton />
          </div>
        )}
      </div>
    </div>
  );
}
