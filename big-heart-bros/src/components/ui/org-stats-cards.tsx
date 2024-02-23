import { UsersInEvents, Event, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function getEventsWithOrg2Poster(userEvents: any[]): any[] {
  const filteredEvents = userEvents.filter(
    (item) => item.event.posterId === "org_2",
  );
  return filteredEvents;
}

function getTotalEvents(userEvents: any[]): number {
  const uniqueEvents = new Set(userEvents.map((item) => item.eventId));
  return uniqueEvents.size;
}

function getTotalUniqueIndividuals(userEvents: any[]): number {
  const uniqueIndividuals = new Set(userEvents.map((item) => item.userId));
  return uniqueIndividuals.size;
}

function getTotalUniquePosterIds(userEvents: any[]): number {
  const uniquePosterIds = new Set(
    userEvents.map((item) => item.event.posterId),
  );
  return uniquePosterIds.size;
}

function getTotalHoursOfImpact(userEvents) {
  let totalHours = 0;

  userEvents.forEach((entry) => {
    const startDate = new Date(entry.event.startDate);
    const endDate = new Date(entry.event.endDate);
    const durationInMillis = endDate.getTime() - startDate.getTime();
    const durationInHours = durationInMillis / (1000 * 60 * 60); // Convert milliseconds to hours
    totalHours += durationInHours;
  });

  return totalHours;
}

function EventsByDateChart(eventsData) {
  const uniqueEventsData = eventsData.filter(
    (event, index, self) =>
      index === self.findIndex((e) => e.eventId === event.eventId),
  );

  uniqueEventsData.sort(
    (a, b) =>
      new Date(a.event.startDate).getTime() -
      new Date(b.event.startDate).getTime(),
  );
  const eventMonths: { [key: string]: number } = {};

  uniqueEventsData.forEach((event) => {
    const date = new Date(event.event.startDate);
    const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
    const year = date.getFullYear().toString().slice(-2);
    const key = `${month} ${year}`;
    eventMonths[key] = (eventMonths[key] || 0) + 1;
  });

  const startDate = new Date(uniqueEventsData[0].event.startDate);
  const endDate = new Date(
    uniqueEventsData[uniqueEventsData.length - 1].event.startDate,
  );
  const labels: string[] = [];
  const data: number[] = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate
      .toLocaleString("default", { month: "long" })
      .slice(0, 3);
    const year = currentDate.getFullYear().toString().slice(-2);
    const key = `${month} ${year}`;
    labels.push(key);
    data.push(eventMonths[key] || 0);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Events",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return chartData;
}

function VolunteersByDateChart(eventsData) {
  eventsData.sort(
    (a, b) =>
      new Date(a.event.startDate).getTime() -
      new Date(b.event.startDate).getTime(),
  );
  const volunteerCountsByDate = {};

  eventsData.forEach((event) => {
    const date = new Date(event.event.startDate);
    const month = date.toLocaleString("default", { month: "long" }).slice(0, 3); // Short month name
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits of the year
    const key = `${month} ${year}`;
    volunteerCountsByDate[key] = (volunteerCountsByDate[key] || 0) + 1;
  });

  const startDate = new Date(eventsData[0].event.startDate);
  const endDate = new Date(eventsData[eventsData.length - 1].event.startDate);
  const labels: string[] = [];
  const data: number[] = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate
      .toLocaleString("default", { month: "long" })
      .slice(0, 3);
    const year = currentDate.getFullYear().toString().slice(-2);
    const key = `${month} ${year}`;
    labels.push(key);
    data.push(volunteerCountsByDate[key] || 0);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Volunteers",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return chartData;
}

export default function stats() {
  const [usersInEvents, setUsersInEvents] = useState([]);
  const [doughnutData, setDoughnutData] = useState({
    datasets: [
      {
        data: [], // This can now hold numbers
        backgroundColor: [], // This can now hold strings
        borderColor: [], // This can now hold strings
        borderWidth: 1,
      },
    ],
    labels: [], // This can now hold strings
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/allUsersInEvents");
        const data = await response.json();
        setUsersInEvents(data);

        const chartData = getGenderRatio(data);
        setDoughnutData(chartData);
      } catch (error) {
        console.error("Error fetching users in events data:", error);
      }
    }

    fetchData();
  }, []);

  const getGenderRatio = (usersData) => {
    const genderCounts = { male: 0, female: 0, other: 0 };
    usersData.forEach((user) => {
      console.log(user.gender);
      if (user.gender === "male") genderCounts.male += 1;
      else if (user.gender === "female") genderCounts.female += 1;
      else genderCounts.other += 1;
    });

    return {
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          label: "Gender Ratio",
          data: [genderCounts.male, genderCounts.female, genderCounts.other],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255,99,132,1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <div className="flex flex-row gap-8">
        <div className=" bg-gray-100 my-4 w-[280px] rounded px-4 py-6 border border-gray-200">
          {" "}
          <h2 className="font-medium text-gray-700"> Gender Ratio </h2>
          <h1 className="text-3xl text-center font-semibold mt-1">
            <Doughnut data={doughnutData} />
          </h1>
        </div>

        <div className=" bg-gray-100 my-4 w-[280px] rounded px-4 py-6 border border-gray-200">
          {" "}
          <h2 className="font-medium text-gray-700"> Total Events </h2>
          <h1 className="text-3xl text-center font-semibold mt-1">
            {" "}
            {usersInEvents.length > 0 ? getTotalEvents(usersInEvents) : ""}{" "}
          </h1>
        </div>
        <div className=" bg-gray-100 my-4 w-[280px] rounded px-4 py-6 border border-gray-200">
          {" "}
          <h2 className="font-medium text-gray-700">
            {" "}
            Total Unique Volunteers{" "}
          </h2>
          <h1 className="text-3xl text-center font-semibold mt-1">
            {" "}
            {usersInEvents.length > 0
              ? getTotalUniqueIndividuals(usersInEvents)
              : ""}
          </h1>
        </div>
        <div className=" bg-gray-100 my-4 w-[280px] rounded px-4 py-6 border border-gray-200">
          {" "}
          <h2 className="font-medium text-gray-700">
            {" "}
            Total Hours of Engagement{" "}
          </h2>
          <h1 className="text-3xl text-center font-semibold mt-1">
            {" "}
            {usersInEvents.length > 0
              ? getTotalHoursOfImpact(usersInEvents)
              : ""}{" "}
          </h1>
        </div>

        <div className=" bg-gray-100 my-4 w-[280px] rounded px-4 py-6 border border-gray-200">
          {" "}
          <h2 className="font-medium text-gray-700"> Total Organisations </h2>
          <h1 className="text-3xl text-center font-semibold mt-1">
            {" "}
            {usersInEvents.length > 0
              ? getTotalUniquePosterIds(usersInEvents)
              : ""}{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
