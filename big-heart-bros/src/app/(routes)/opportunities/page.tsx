"use client";
import React from "react";
import Navbar from "../../../components/navbar";
import { useState, useEffect } from "react";
import VolunteerCard from "../../../components/volunteer-card";
import { EventType, Skills, EventStatus, Interests } from "@prisma/client";
import Event1Photo from "../../assets/volunteer-1.jpg";
import { signIn, signOut, useSession } from "next-auth/react";
import { set } from "date-fns";
import { Skeleton } from "../../../components/ui/skeleton";

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
  interests: Interests[];
}

interface User {
  id: String;
  skills: Skills[];
  interests: Interests[];
}

function page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userInfo, setUserInfo] = useState<User>();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (session != null) {
        try {
          const response = await fetch(`/api/approvedEvent`);
          const data = await response.json();

          const userResponse = await fetch(
            `/api/checkUserByEmail/${session?.user?.email}`
          );
          const userData = await userResponse.json();

          console.log(userData);

          setEvents(data.events);
          // Check if data1 is not null before setting userInfo
          if (userData !== null) {
            setUserInfo(userData.user);
          } else {
            // If data1 is null, fetch default user data from the database
            const userResponse = await fetch(
              `/api/checkUserByEmail/bentan@gmail.com`
            );
            const userData = await userResponse.json();
            setUserInfo(userData.user);
          }

          console.log("reached");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      } else {
        const response = await fetch(`/api/approvedEvent`);
        const data = await response.json();
        setEvents(data.events);
        const userResponse = await fetch(
          `/api/checkUserByEmail/bentan@gmail.com`
        );
        const userData = await userResponse.json();
        setUserInfo(userData.user);
      }
    }

    fetchData();
  }, [session]);

  const userSkills = userInfo?.skills ?? [];
  const userInterests = userInfo?.interests ?? [];

  const eventsWithSkills = () =>
    events.map((event) => ({
      event: event,
      skills: event.skills,
      interests: event.interests,
    }));

  const SKILLS_WEIGHTAGE = 0.6;
  const INTERESTS_WEIGHTAGE = 1 - SKILLS_WEIGHTAGE;

  const eventSimilarities = eventsWithSkills().map((event) => {
    const similarityScoreChecked =
      SKILLS_WEIGHTAGE *
        userSkills.reduce(
          (acc, skill) => acc + (event.skills.includes(skill) ? 0.9 : 0.1),
          0
        ) +
      INTERESTS_WEIGHTAGE *
        userInterests.reduce(
          (acc, interest) =>
            acc + (event.interests.includes(interest) ? 0.9 : 0.1),
          0
        );
    console.log(event.event.name + ": " + similarityScoreChecked);
    return {
      event: event,
      similarity: similarityScoreChecked,
    };
  });

  // Sort events based on similarity score in descending order
  eventSimilarities.sort((a, b) => b.similarity - a.similarity);

  // Get top 5 events with highest similarity scores
  const topEvents = eventSimilarities.slice(0, 6).map((item) => item.event);

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <p className="font-bold text-2xl pt-10 pb-4">
          Volunteering Opportunities
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
          {loading // Check if data is loading
            ? // If loading, display skeleton loader for each card
              [1, 2, 3].map(
                (
                  index // Render 3 skeleton loaders
                ) => (
                  <div className="flex flex-col space-y-3 mt-6 items-center">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-100" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-slate-100" />
                      <Skeleton className="h-4 w-[200px] bg-slate-100" />
                    </div>
                  </div>
                )
              )
            : // If not loading, display VolunteerCard components
              topEvents.map((event, index) => (
                <VolunteerCard
                  key={index}
                  id={event.event.id}
                  image={Event1Photo}
                  name={event.event.name}
                  description={event.event.description}
                  startDate={event.event.startDate}
                  endDate={event.event.endDate}
                  skills={event.skills}
                  link="/"
                  button_desc="View Event"
                  posterId={event.event.posterId}
                  status={event.event.status}
                  currUsersLength={2}
                  capacity={event.event.capacity ?? 0}
                  location={event.event.location}
                  registrationDeadline={event.event.registrationDeadline}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default page;
