"use client";
import Image from "next/image";
import ProfilePhoto from "../app/assets/profile-photo.png";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
import { profile } from "console";
import { User } from "@prisma/client";

const Profile = ({ user, events }) => {
  return (
    <div className="p-2 px-4 flex items-center bg-white relative justify-center w-80">
      <Image
        className="rounded-full absolute left-1/2 transform -translate-y-24 -translate-x-1/2"
        src={ProfilePhoto}
        alt="profile-photo"
        width={100}
        height={100}
      />
      <div className="mt-20 items-center text-center flex flex-col">
        {" "}
        <p className="text-xl font-semibold mb-2">{user?.name}</p>
        <div className="text-center w-64 flex flex-row items-center justify-center">
          <div>
            <p className="text-sm text-gray-600 w-32">Completed Events</p>
            <p className="text-lg"> {events.length} </p>
          </div>
          <Separator orientation="vertical" className="mx-2" />
          <div>
            <p className="text-sm text-gray-600 w-32">Total Hours</p>
            <p className="text-lg">{user?.totalHours}</p>
          </div>
        </div>{" "}
        <Separator className="my-2" />
        <div className="text-left">
          <p className="text-sm text-gray-600">Latest Activity</p>
          <p className="text-sm">
            {" "}
            {events.length > 0 && <p className="text-sm">{events[0].name}</p>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
