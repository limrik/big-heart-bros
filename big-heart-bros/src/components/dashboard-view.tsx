"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfilePhoto from "../app/assets/profile-photo.png";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

import Card from "./user-card";
import Event2Photo from "../app/assets/volunteer-2.jpg";
import { EventType, Skills, EventStatus } from "@prisma/client";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import CompletedEventCard from "./completedEventCard";
Chart.register(...registerables);

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  status: EventStatus;
}

const currentDate = new Date();
const sixMonthsAgo = new Date(currentDate);
sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

interface MonthData {
  label: string;
  hours: number;
}

const monthsData: MonthData[] = [];

for (let i = 5; i >= 0; i--) {
  const monthDate = new Date(sixMonthsAgo);
  monthDate.setMonth(sixMonthsAgo.getMonth() + i);

  const hours = Math.floor(Math.random() * 10); // Mocking hours below 10
  const monthLabel = monthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  monthsData.push({
    label: monthLabel,
    hours,
  });
}

const data = {
  labels: monthsData.map((month) => month.label),
  datasets: [
    {
      label: "Number of Hours Volunteered",
      data: monthsData.map((month) => month.hours),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

export default function DashboardView() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);

  const userId = "DEFAULT_ID";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/eventsByUserId/${userId}`);
        const data = await response.json();

        const approved = data.events.filter(event => event.status === "Approved");
        const completed = data.events.filter(event => event.status === "Completed");

        setUpcomingEvents(approved);
        setCompletedEvents(completed);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-2 px-4 bg-white relative justify-center w-[880px] h-auto">
      <Tabs defaultValue="stats" className="w-full">
        <div className="flex justify-between">
          <TabsList className="rounded-2xl">
            <TabsTrigger className="bg-[#f7d1d1] ml-1 mr-2" value="stats">
              Activity
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-1 mr-2" value="next-events">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-1 mr-4" value="history">
              Historical Events
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="stats">
          <div className="flex justify-center h-[300px] w-full">
            {" "}
            <div>
              <h2 className="text-lg font-semibold ml-6 my-2">Monthly Hours</h2>
              <Bar
                data={data}
                width={800}
                height={80}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto"></div>
          </div>
        </TabsContent>
        <TabsContent value="next-events">
          <div className="flex justify-center">
          {upcomingEvents?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={index}
                  id={event.id}
                  image={Event2Photo}
                  name={event.name}
                  description={event.description}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  skills={event.skills}
                  link="/home"
                  button_desc="View Event"
                  posterId={event.posterId}
                  status={event.status}
                />
              ))}
            </div>
          ) : (
            <p className="py-8">You have no upcoming volunteering events!</p>
          )}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="flex justify-center">
          {completedEvents?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 mx-auto">
              {completedEvents.map((event) => (
                <CompletedEventCard
                  image={Event2Photo}
                  name={event.name}
                  description={event.description}
                  type={event.type}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  skills={event.skills}
                  organisationId={event.posterId}
                />
              ))}
            </div>
          ) : (
            <p className="py-8">No completed events</p>
          )}
          </div>
          </TabsContent>
      </Tabs>
    </div>
  );
}
