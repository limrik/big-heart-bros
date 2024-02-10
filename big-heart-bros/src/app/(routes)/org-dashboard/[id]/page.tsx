"use client";

import React from "react";
import Navbar from "../../../../components/navbar";
import OrgApprovedCard from "../../../../components/org-approved-card";
import OrgPendingCard from "../../../../components/org-pending-card";
import Image from "next/image";
import ProfilePhoto from "../../../assets/defaultorglogo.png";
import Event1Photo from "../../../assets/volunteer-1.jpg";
import Event2Photo from "../../../assets/volunteer-2.jpg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { EventForm } from "../../../../components/event-form";
import { useState, useEffect } from "react";
import { EventType, Skills, EventStatus } from "@prisma/client";
import { Skeleton } from "../../../../components/ui/skeleton";

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
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

interface Organisation {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  //   events: Event[];
  //   feedbackGiven: Feedback[];
}

export default function Page({ params }: { params: { id: string } }) {
  const [approvedEvents, setApprovedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [organisation, setOrganisation] = useState<Organisation>();

  const organizationId = "DEFAULT_ID";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/approvedEvents/${params.id}`);
        const data = await response.json();

        const res2 = await fetch(`/api/pendingEvents/${params.id}`);
        const data2 = await res2.json();

        setApprovedEvents(data.events);
        setEvents(data2.events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/organisation/${params.id}`);
        const data = await response.json();

        // Now you can access the organisation data from 'data.organisation'
        console.log("Organisation data:", data.organisation);
        // Do something with the data, such as setting it in state
        setOrganisation(data.organisation);
      } catch (error) {
        console.error("Error fetching organisation data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <div className="flex justify-between my-4 items-center">
          <p className="text-3xl font-semibold">Organisation Dashboard</p>
          <div className="rounded-md p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
            <div className="text-right">
              <p className="text-xl font-semibold ">{organisation?.name}</p>
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
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Approved Events</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex bg-black rounded-xl text-white hover:bg-slate-800">
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
        </div>
        <div className="my-4">
          {loading ? (
            <div className="flex flex-row space-y-3 mt-6 items-center">
              <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-100" />
              <div className="space-y-2 ml-8">
              <Skeleton className="h-4 w-[300px] bg-slate-100" />
                <Skeleton className="h-4 w-[250px] bg-slate-100" />
                <Skeleton className="h-4 w-[250px] bg-slate-100" />
                <Skeleton className="h-4 w-[200px] bg-slate-100" />
              </div>
            </div>
          ) : (
            <div>
              {approvedEvents.length > 0 ? (
                <div>
                  {approvedEvents.map((event, index) => (
                    <OrgApprovedCard
                      key={index}
                      id={event.id}
                      image={Event1Photo}
                      name={event.name}
                      description={event.description}
                      startDate={event.startDate}
                      endDate={event.endDate}
                      skills={event.skills}
                      link="/home"
                      button_desc="Join Event"
                      posterId={event.posterId}
                      status={event.status}
                      organisationId={organizationId}
                      location={event.location}
                    />
                  ))}
                </div>
              ) : (
                <p className="py-8">No approved events</p>
              )}
            </div>
          )}
        </div>

        <p className="text-xl font-semibold">Pending Events</p>
        <div className="my-4">
          {loading ? (
            <div className="flex flex-row space-y-3 mt-6 items-center">
            <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-100" />
            <div className="space-y-2 ml-8">
            <Skeleton className="h-4 w-[300px] bg-slate-100" />
              <Skeleton className="h-4 w-[250px] bg-slate-100" />
              <Skeleton className="h-4 w-[250px] bg-slate-100" />
              <Skeleton className="h-4 w-[200px] bg-slate-100" />
            </div>
          </div>
          ) : (
            <>
              <div className="my-4">
                {events.length > 0 ? (
                  <div>
                    {events.map((event, index) => (
                      <OrgPendingCard
                        key={index}
                        id={event.id}
                        image={Event1Photo}
                        name={event.name}
                        description={event.description}
                        location={event.location}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        skills={event.skills}
                        link="/home"
                        button_desc="Join Event"
                        posterId={event.posterId}
                        status={event.status}
                        organisationId={organizationId}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="py-8">No pending events</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
