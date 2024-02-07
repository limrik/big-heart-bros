"use client"

import { useState, useEffect } from "react";
import { EventType, Skills, EventStatus } from "@prisma/client";

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
  const [users, setUsers] = useState<User[]>();


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/eventById/${params.id}`);
        const data = await res.json();
        setEvent(data.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return <div>My Post: {event?.name}</div>;
}
