"use client";

import Image from "next/image";
import ProfilePhoto from "../app/assets/profile-photo.png";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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
  return (
    <div className="p-2 px-4 bg-white relative justify-center w-[880px] h-[600px]">
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
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto"></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
