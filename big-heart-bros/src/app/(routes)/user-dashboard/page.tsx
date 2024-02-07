import React, { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "../../../components/navbar";
import Card from "../../../components/user-card";
import UserCard from "../../../components/stat-card";
import Profile from "../../../components/profile";
import Achievements from "../../../components/achievements";
import DashboardView from "../../../components/dashboard-view";
import Event1Photo from "../../assets/volunteer-1.jpg";
import Event2Photo from "../../assets/volunteer-2.jpg";


const UserDashboard: React.FC = () => {


  return (
    <div className="bg-[#f7d9d9] h-screen">
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
          {/* <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-4 my-4">
            {stats.map((stat, index) => (
              <UserCard
                key={index}
                title={stat.title}
                number={stat.number}
                icon={stat.icon}
                desc={stat.desc}
                hasButton={stat.hasButton}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
