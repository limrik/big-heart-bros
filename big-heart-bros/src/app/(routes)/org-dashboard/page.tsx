"use client"

import React from "react";
import Navbar from "../../../components/navbar";
import Card from "../../../components/card";
import Image from "next/image";
import ProfilePhoto from "../../assets/profile-photo.png";
import Event1Photo from "../../assets/volunteer-1.jpg";
import Event2Photo from "../../assets/volunteer-2.jpg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { EventForm } from "../../../components/event-form";
import { useState, useEffect } from "react";
import { EventType, Skills } from "@prisma/client";


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
}

const UserDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

const organizationId = "DEFAULT_ID";

useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/events/${organizationId}`);
        const data = await response.json();
        console.log(data.events);

        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="bg-[#f7d9d9]">
      <Navbar></Navbar>
      <div className="w-5/6 mx-auto">
        <div className="flex justify-between my-4 items-center">
          <p className="text-2xl font-semibold">Organisation Dashboard</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex bg-black rounded-md text-white hover:bg-slate-800">
                Create new event
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col bg-white ">
              <DialogHeader>
                <DialogTitle>Create new event</DialogTitle>
              </DialogHeader>
              <div className="flex w-full h-[400px] overflow-y-auto bg-white">
                <EventForm />
              </div>
            </DialogContent>
          </Dialog>
          <div className="rounded-md p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
            <div className="text-right">
              <p className="text-xl font-semibold ">Omar Apollo</p>
              <p className="text-sm">+65 9300 2100</p>
              <p className="text-md">Beneficiary</p>
            </div>
            <Image
              className="rounded-full mx-4"
              src={ProfilePhoto}
              alt="profile-photo"
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="text-xl font-semibold">Approved Events</p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
            
            {/* {events.map((event, index) => (
              <Card
                key={index}
                image={Event1Photo}
                title={event.name}
                desc={event.description}
                time={event.startDate}
                skills_wanted={event[0].skills_wanted}
                link={event.onClick}
                button_desc={event.button_desc}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
