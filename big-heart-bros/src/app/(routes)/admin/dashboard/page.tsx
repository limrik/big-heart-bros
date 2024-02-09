import React from "react";
import Navbar from "../../../../components/navbar";
import Image from "next/image";
import ProfilePhoto from "../../../assets/profile-photo.png";
import { EventType, Skills } from "@prisma/client";
import AdminTable from "../../../../components/admin-table/page";
import AdminCard from "../../../../components/admin-card";

const UserDashboard: React.FC = () => {
  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <div className="flex justify-between my-4 items-center">
          <p className="text-2xl font-semibold">Admin Dashboard</p>
          <div className="rounded-md p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
            <div className="text-right">
              <p className="text-xl font-semibold ">Omar Apollo</p>
              <p className="text-sm">+65 9100 2100</p>
              <p className="text-md">Big At Heart</p>
            </div>
            <Image
              className="rounded-full mx-4"
              src={ProfilePhoto}
              alt="profile-photo"
              width={100}
              height={100}
            />
          </div>
        </div>
        <AdminTable />
      </div>
    </div>
  );
};

export default UserDashboard;
