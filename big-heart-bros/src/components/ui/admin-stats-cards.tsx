import { UsersInEvents, Event, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

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
    userEvents.map((item) => item.event.posterId)
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
      index === self.findIndex((e) => e.eventId === event.eventId)
  );

  uniqueEventsData.sort(
    (a, b) =>
      new Date(a.event.startDate).getTime() -
      new Date(b.event.startDate).getTime()
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
    uniqueEventsData[uniqueEventsData.length - 1].event.startDate
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
      new Date(b.event.startDate).getTime()
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

export default function AdminStatsCards() {
  const [usersInEvents, setUsersInEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/allUsersInEvents");
        const data = await response.json();
        setUsersInEvents(data);
      } catch (error) {
        console.error("Error fetching users in events data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-8">
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
      <div className="flex flex-row gap-8">
        <div className=" bg-gray-100 my-4 w-[590px] rounded px-4 py-6 border border-gray-200">
          <h2 className="font-medium mb-4 text-gray-700"> Events by Month </h2>
          {usersInEvents.length > 0 ? (
            <Line
              data={EventsByDateChart(usersInEvents)}
              options={{
                scales: {
                  y: {
                    suggestedMin: 0,
                    suggestedMax: 6,
                  },
                },
              }}
            />
          ) : null}
        </div>
        <div className=" bg-gray-100 my-4 w-[590px] rounded px-4 py-6 border border-gray-200">
          <h2 className="font-medium mb-4 text-gray-700">
            {" "}
            Volunteers by Month{" "}
          </h2>
          {usersInEvents.length > 0 ? (
            <Line
              data={VolunteersByDateChart(usersInEvents)}
              options={{
                scales: {
                  y: {
                    suggestedMin: 0,
                    suggestedMax: 20,
                  },
                },
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
