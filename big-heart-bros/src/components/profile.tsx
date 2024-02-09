"use client";
import Image from "next/image";
import ProfilePhoto from "../app/assets/profile-photo.png";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
import { profile } from "console";
import { User } from "@prisma/client";

const Profile = ({ user }) => {
  return (
    <div className="p-2 px-4 flex items-center bg-white relative justify-center w-80">
      <Image
        className="rounded-full absolute left-1/2 transform -translate-y-24 -translate-x-1/2"
        src={ProfilePhoto}
        alt="profile-photo"
        width={100}
        height={100}
      />
      <div className="mt-20 items-center text-center">
        {" "}
        <p className="text-xl font-semibold mb-2">{user?.name}</p>
        <div className="text-center w-60 flex flex-row items-center justify-center">
          <div>
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-lg">5</p>
          </div>
          <Separator orientation="vertical" className="mx-2" />
          <div>
            <p className="text-sm text-gray-600">Total Hours</p>
            <p className="text-lg">{user?.totalHours}</p>
          </div>
        </div>{" "}
        <Separator className="my-2" />
        <div className="text-left">
          <p className="text-sm text-gray-600">Latest Activity</p>
          <p className="text-sm">Handicraft Workshop</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
