"use client";

import { useState, useEffect } from "react";
import { EventType, Skills, EventStatus, Feedback } from "@prisma/client";
import Navbar from "../../../../components/navbar";
import backgroundImage from "../../../assets/bigathearts2.png";
import EventDetails from "../../../../components/event-details";
import EventAttendance from "../../../../components/event-attendance";

interface Organisation {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
    events: Event[];
    feedbackGiven: Feedback[];
}

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
  eventName?: string;
  organisationName?: string;
}

export default function Page({ params }: { params: 	{ id: string}}) {
  const [event, setEvent] = useState<Event>();
  const [users, setUsers] = useState<User[]>([]);
  const [organisation, setOrganisation] = useState<Organisation>();

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

  useEffect(() => {
    async function fetchOrganisation() {
      try {
        if (event) {
          const res = await fetch(
            `http://localhost:3000/api/organisation/${event.posterId}`
          );
          const data = await res.json();
          setOrganisation(data.organisation);
        }
      } catch (error) {
        console.error("Error fetching organisation:", error);
      }
    }

    fetchOrganisation();
  }, [event]);

  useEffect(() => {
    updateUsers();
  }, [organisation])

  const updateUsers = () => {
    const updatedUsers = users.map((user: User) => ({
      ...user,
      eventId: event?.id, // Assigning event name to eventName field
      organisationId: organisation?.id, // You need to replace this with the actual organisation name
    }));

    console.log(updatedUsers)
    setUsers(updatedUsers);
  }

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
                  startTime={event?.startTime}
                  endDate={event?.endDate}
                  endTime={event?.endTime}
                  location={event?.location}
                  deadline={event?.registrationDeadline}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20 bg-[#fcb6b6]">
        <div className="pt-24 px-20 grid grid-cols-2 bg-white">
          <div>
            <p className="font-semibold text-xl underline py-4">
              Event Details{" "}
            </p>
            <p>{event?.description}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-xl py-4">Attendance</p>
            <EventAttendance users={users}/>
          </div>
        </div>
      </div>
    </div>
  );
}
