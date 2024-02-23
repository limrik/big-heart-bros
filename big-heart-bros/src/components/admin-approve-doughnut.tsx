import { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Event } from "@prisma/client";

const getApproveBreakdown = (approved, pending) => {
  const today = new Date();

  const approvedFiltered = approved.filter(
    (event) => new Date(event.startDate) >= today,
  );
  const pendingFiltered = pending.filter(
    (event) => new Date(event.startDate) >= today,
  );

  const approvedCount = approvedFiltered.length;
  const pendingCount = pendingFiltered.length;

  const data = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        label: "Events Breakdown",
        data: [approvedCount, pendingCount],
        backgroundColor: [
          "rgba(255, 100, 0, 0.8)", // Dark shade of orange for Approved
          "rgba(255, 200, 0, 0.4)", // Light shade of orange for Pending
        ],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
        borderWidth: 1.2,
      },
    ],
  };
  return data;
};

function getFirstFivePendingEvents(pendingEvents: Event[]): Event[] {
  const sortedPendingEvents = pendingEvents.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return sortedPendingEvents.slice(0, 5);
}

export default function AdminApproveDoughnut() {
  const [data, setData] = useState([]);
  const [draftData, setDraftData] = useState([]);

  async function getData(): Promise<Event[]> {
    // Fetch data from your API here.
    try {
      const response = await fetch("/api/approvedEvent");
      const data = await response.json();
      setData(data.events);
      return data.events;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async function getDraftData(): Promise<Event[]> {
    // Fetch data from your API here.
    try {
      const response = await fetch("/api/pendingEvent");
      const data = await response.json();
      setDraftData(data.events);
      return data.events;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    getData();
    getDraftData();
  }, []);

  return (
    <div className="flex-row flex gap-8">
      <div className=" bg-gray-100 my-4 w-[350px] rounded">
        <h2 className="font-semibold mx-6 pt-4 text-gray-700">
          {" "}
          Approval Rate{" "}
        </h2>
        <div className="h-[180px] items-center flex justify-center">
          <Doughnut
            data={getApproveBreakdown(data, draftData)}
            width={50}
            height={50}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <p className="text-center pt-2 pb-4 text-sm text-gray-500">
          {getApproveBreakdown(data, draftData).datasets[0].data[1]} events yet
          to be approved
        </p>
      </div>
      <div className=" bg-gray-100 my-4 w-[650px] rounded">
        <h2 className="font-semibold mx-6 pt-4  text-gray-700">
          {" "}
          Upcoming Events Yet to be Approved
        </h2>
        <div className="mx-12">
          {getFirstFivePendingEvents(draftData).map((event, index) => (
            <div className="pt-3 font-light" key={index}>
              {index + 1}. {event.name} [
              {new Date(event.startDate).toLocaleDateString()}]
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
