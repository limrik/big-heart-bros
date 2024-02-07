"use client";

import { useState, useEffect } from "react";
import { EventType, Skills, EventStatus } from "@prisma/client";
import Navbar from "../../../../components/navbar";

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
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
      <Navbar></Navbar>
      <div>Event Name: {event?.name}</div>
      <div>
        Users
      </div>
      {users.map((user, index) => (
        <div key={user.id}>{index + 1}. {user.name}</div>
      ))}
    </div>
  );
}
