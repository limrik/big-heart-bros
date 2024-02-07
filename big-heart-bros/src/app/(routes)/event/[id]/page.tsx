"use client";

import { useState, useEffect } from "react";
import { EventType, Skills, EventStatus } from "@prisma/client";
import Navbar from "../../../../components/navbar";
import backgroundImage from "../../../assets/bigathearts2.png";
import EventDetails from "../../../../components/event-details";

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
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

interface User {
  id: string;
  name: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/eventById/${params.id}`
        );
        const res2 = await fetch(
          `http://localhost:3000/api/usersByEventId/${params.id}`
        );
        const data = await res.json();
        const data2 = await res2.json();
        setEvent(data.event);
        setUsers(data2.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover h-[450px] w-full"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="bg-gray-900/40 absolute top-0 left-0 w-full h-[450px]">
          <Navbar />
          <div className="absolute top-[145px] w-full h-2/3 flex flex-col justify-center text-white">
            <div>
              {" "}
              <div className="flex justify-center my-4 items-center pt-64">
                <EventDetails
                  eventName={event?.name}
                  startDate={event?.startDate}
                  endDate={event?.endDate}
                  location={event?.location}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-28 mx-20">
        <p className="font-semibold text-xl underline py-4">Event Details </p>
        <p>{event?.description}</p>
      </div>
    </div>
  );
}
