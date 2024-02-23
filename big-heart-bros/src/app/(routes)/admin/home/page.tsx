"use client";

import React from "react";
import Image from "next/image";
import ProfilePhoto from "../../../assets/bigatheartslogo.png";
import AdminTable from "../../../../components/admin-table/page";
import { useUserTypeStore, UserType } from "../../../../store/zustand";

const UserDashboard: React.FC = () => {
  const { userType, setUserType } = useUserTypeStore();

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      {userType === UserType.ADMIN ? (
        <div className="w-5/6 mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">All Events</p>
            <div className="my-4 p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
              <div className="text-right">
                <p className="text-xl font-semibold ">Admin User</p>
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
      ) : (
        <div className="w-5/6 mx-auto flex justify-center items-center h-full">
          <div className="text-center text-3xl font-bold mt-24">
            Error: Only accessible by administrators
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
