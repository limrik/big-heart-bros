"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "../../../../components/navbar";
import Card from "../../../../components/user-upcoming-card";
import UserCard from "../../../../components/stat-card";
import Profile from "../../../../components/profile";
import Achievements from "../../../../components/achievements";
import DashboardView from "../../../../components/dashboard-view";
import Event1Photo from "../../assets/volunteer-1.jpg";
import Event2Photo from "../../assets/volunteer-2.jpg";
import UserFeedback from "../../../../components/user-feedback";
import { User } from "@prisma/client";

export default function UserDashboard({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);

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
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
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
    </div>
  );
}
