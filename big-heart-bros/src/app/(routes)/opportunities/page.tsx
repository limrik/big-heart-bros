"use client"
import React from 'react'
import Navbar from '../../../components/navbar'
import { useState, useEffect } from "react";
import VolunteerCard from "../../../components/volunteer-card";
import { EventType, Skills, EventStatus } from "@prisma/client";
import Event1Photo from "../../assets/volunteer-1.jpg";

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

function page() {
const [events, setEvents] = useState<Event[]>([]);

useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/approvedEvent`);
        const data = await response.json();

        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
        <Navbar/>
        <div className="flex justify-center">
          <p>Volunteering Opportunities</p>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
            {events.map((event, index) => (
              <VolunteerCard
                key={index}
                id={event.id}
                image={Event1Photo}
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
        </div>
    </div>
  )
}

export default page