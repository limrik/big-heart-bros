"use client";

import React from "react";
import { useUserTypeStore, UserType } from "../../../../store/zustand";
import AdminApproveDoughnut from "../../../../components/admin-approve-doughnut";
import OrgStatsCards from "../../../../components/ui/org-stats-cards";
import OrgActivityChart from "../../../../components/ui/orgChart";

const page: React.FC = () => {
  const { userType, setUserType } = useUserTypeStore();

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <div className="w-5/6 mx-auto">
        <h1 className="pt-12 text-2xl font-semibold"> Your Activity </h1>
        <div>
          <OrgActivityChart />
        </div>
        <h1 className="pt-12 text-2xl font-semibold"> Demographic </h1>
        <div>
          <OrgStatsCards />
        </div>
        <br />
      </div>
    </div>
  );
};

export default page;
