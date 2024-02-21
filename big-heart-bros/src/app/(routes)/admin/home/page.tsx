"use client";

import React from "react";
import { useUserTypeStore, UserType } from "../../../../store/zustand";
import AdminApproveDoughnut from "../../../../components/admin-approve-doughnut";
import AdminStatsCards from "../../../../components/ui/admin-stats-cards";

const UserHome: React.FC = () => {
  const { userType, setUserType } = useUserTypeStore();

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      {userType === UserType.ADMIN ? (
        <div className="w-5/6 mx-auto">
          <h1 className="pt-12 text-2xl font-semibold"> For Your Attention </h1>
          <div>
            <AdminApproveDoughnut />
          </div>
          <h1 className="pt-12 text-2xl font-semibold"> Overall Impact </h1>
          <div>
            <AdminStatsCards />
          </div>
          <br />
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

export default UserHome;
