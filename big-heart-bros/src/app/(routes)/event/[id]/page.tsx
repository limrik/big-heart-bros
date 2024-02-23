"use client";

import { useState, useEffect } from "react";
import {
  EventType,
  EventStatus,
  PrismaClient,
  Skills,
  GenderType,
  CommitmentLevelType,
  Feedback,
  ResidentialStatusType,
  Interests,
} from "@prisma/client";
import backgroundImage from "../../../assets/bigathearts2.png";
import EventDetails from "../../../../components/event-details";
import EventAttendance from "../../../../components/event-attendance";
import { Button } from "../../../../components/ui/button";

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
  email: string;
  phoneNumber: string;
  gender: GenderType;
  occupation?: string | null;
  dob: Date;
  canDrive: boolean;
  ownVehicle: boolean;
  commitmentLevel: CommitmentLevelType;
  skills: Skills[];
  feedback?: Feedback[];
  residentialStatus: ResidentialStatusType;
  interests: Interests[];
  eventId?: string;
  organisationId?: string;
  attended: boolean;
}

export default function Page({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>();
  const [users, setUsers] = useState<User[]>([]);
  const [organisation, setOrganisation] = useState<Organisation>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/eventById/${params.id}`);
        const res2 = await fetch(`/api/usersByEventId/${params.id}`);

        const data = await res.json();
        const data2 = await res2.json();
        console.log(data2);
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
          const res = await fetch(`/api/organisation/${event.posterId}`);
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
  }, [organisation]);

  const updateUsers = () => {
    const updatedUsers = users.map((user: User) => ({
      ...user,
      eventId: event?.id, // Assigning event name to eventName field
      organisationId: organisation?.id, // You need to replace this with the actual organisation name
    }));

    console.log(updatedUsers);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover h-[450px] w-full"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="bg-gray-900/40 absolute top-0 left-0 w-full h-[450px]">
          <div>
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
                  status={event?.status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-48 bg-[#fcb6b6]">
        <div className="pt-24 px-20 grid grid-cols-3 bg-gray-200 gap-8">
          <div className="bg-white shadow-lg p-8 shadow-[#fcb6b6] col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Event Details
            </h2>
            <div className="border-b border-gray-200 mb-6"></div>
            <p className="text-gray-600 mb-8">{event?.description}</p>
          </div>
          <div className="items-center justify-center flex-cols">
            <div className="bg-gradient-to-r from-[#fcb6b6] to-[#8B0000] p-8 rounded-xl shadow-lg w-3/4">
              <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {event?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center"
                  >
                    <span className="text-gray-800 font-semibold">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg shadow-[#fcb6b6] p-8 col-span-2">
            <div className="grid grid-cols-2 items-center">
              <p className="font-medium text-xl py-2 text-left">Attendance</p>
              <p className="text-gray-700 text-right pr-8">
                {" "}
                Sign-up Rate: {users.length} / {event?.capacity}
              </p>
            </div>
            {event && (
              <EventAttendance
                users={users.map((user) => ({
                  ...user,
                  startDate: new Date(
                    new Date(event?.startDate).getFullYear(),
                    new Date(event?.startDate).getMonth(),
                    new Date(event?.startDate).getDate(),
                    new Date(event?.startTime).getHours(),
                    new Date(event?.startTime).getMinutes(),
                    new Date(event?.startDate).getSeconds(),
                  ),
                }))}
                startDate={
                  new Date(
                    new Date(event?.startDate).getFullYear(),
                    new Date(event?.startDate).getMonth(),
                    new Date(event?.startDate).getDate(),
                    new Date(event?.startTime).getHours(),
                    new Date(event?.startTime).getMinutes(),
                    new Date(event?.startTime).getSeconds(),
                  )
                }
                endDate={
                  new Date(
                    new Date(event?.endDate).getFullYear(),
                    new Date(event?.endDate).getMonth(),
                    new Date(event?.endDate).getDate(),
                    new Date(event?.endTime).getHours(),
                    new Date(event?.endTime).getMinutes(),
                    new Date(event?.endTime).getSeconds(),
                  )
                }
                status={event?.status}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-36"></div>
    </div>
  );
}
