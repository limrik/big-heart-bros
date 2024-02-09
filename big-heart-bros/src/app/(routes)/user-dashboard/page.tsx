import React, { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "../../../components/navbar";
import Profile from "../../../components/profile";
import Achievements from "../../../components/achievements";
import DashboardView from "../../../components/dashboard-view";
import UserFeedback from "../../../components/user-feedback";



const UserDashboard: React.FC = () => {
  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto flex-row flex gap-12">
        <div>
          <div className="flex justify-between my-4 items-center pt-20">
            <Profile />
          </div>
          <Achievements />
        </div>
        <div>
          <div className="flex justify-between my-4 items-center pt-16">
            <DashboardView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
