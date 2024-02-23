"use client";

import React, { useEffect, useState } from "react";
import Profile from "../../../../components/profile";
import Achievements from "../../../../components/achievements";
import DashboardView from "../../../../components/dashboard-view";
import { User } from "@prisma/client";
import { useUserTypeStore, UserType } from "../../../../store/zustand";

export default function UserDashboard({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const { userType, setUserType } = useUserTypeStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/user/${params.id}`);
        const data = await response.json();

        // Now you can access the user data from 'data.user'
        console.log("User data:", data.user);
        // Do something with the data, such as setting it in state
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/eventsByUserId/${params.id}`);
        const data = await response.json();

        const completed = data.events.filter(
          (event) => event.status === "Completed"
        );

        completed.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );

        setCompletedEvents(completed);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#f7d9d9] min-h-screen flex-1">
      {userType === UserType.VOLUNTEER ? (
        <div className="w-5/6 mx-auto flex-row flex gap-12">
          <div>
            <div className="flex justify-between my-4 items-center pt-20">
              <Profile user={user} events={completedEvents} />
            </div>
            <Achievements />
          </div>
          <div>
            <div className="flex justify-between my-4 items-center pt-16">
              <DashboardView userId={params.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-5/6 mx-auto flex justify-center items-center h-full">
          <div className="text-center text-3xl font-bold mt-24">Error: Only accessible by users</div>
        </div>
      )}
    </div>
  );
}
