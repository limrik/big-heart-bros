"use client";
import React from "react";
import Navbar from "../../../components/navbar";
import { useState, useEffect } from "react";
import VolunteerCard from "../../../components/volunteer-card";
import { EventType, Skills, EventStatus, Interests } from "@prisma/client";
import Event1Photo from "../../assets/volunteer-1.jpg";
import { signIn, signOut, useSession } from "next-auth/react";
import { set } from "date-fns";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../components/ui/toggle-group";
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = Object.values(Skills);

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
        setLoading(false);
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

  // const topEvents = eventSimilarities.slice(0, 6).map((item) => item.event);

  // Get top 5 events with highest similarity scores
  const topEvents = eventSimilarities.slice(0, 6).map((item) => ({
    ...item.event,
    recommend: true,
  }));

  // Update recommend field for the rest of the events
  const updatedEvents = [...topEvents];
  for (let i = 6; i < eventSimilarities.length; i++) {
    updatedEvents.push({
      ...eventSimilarities[i].event,
      recommend: false,
    });
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = updatedEvents.filter((event) => {
    // Check if event name or description matches the search query
    const nameMatch =
      event.event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const noTagsSelected = selectedTags.length === 0;

    const tagMatches = selectedTags.some((tag) =>
      event.event.skills.includes(tag as Skills)
    );

    // Return true if both name/description match and at least one tag matches
    return nameMatch && (noTagsSelected || tagMatches);
  });

  const handleClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.includes(tag)
        ? prevTags.filter((prevTag) => prevTag !== tag)
        : [...prevTags, tag];
      return updatedTags;
    });
  };

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <p className="font-semibold text-3xl pt-10 pb-4">
          Volunteering Opportunities
        </p>
        <div className="relative justify-center h-full">
          <FaMagnifyingGlass
            size={28}
            className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for events.."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-14 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 px-3 py-2 w-full border rounded-md bg-white"
          />
        </div>

        {/* Multi-select dropdown for selecting tags */}
        <div className="flex justify-center my-4">
          <ToggleGroup type="multiple">
            {tags.map((tag) => (
              <ToggleGroupItem
                key={tag}
                value={tag}
                onClick={() => handleClick(tag)}
              >
                {tag}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
          {loading // Check if data is loading
            ? // If loading, display skeleton loader for each card
              [1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-3 mt-6 items-center"
                >
                  <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-100" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-slate-100" />
                    <Skeleton className="h-4 w-[200px] bg-slate-100" />
                  </div>
                </div>
              ))
            : // If not loading, display VolunteerCard components
              filteredEvents.map((event, index) => (
                <VolunteerCard
                  key={index}
                  id={event.event.id}
                  image={Event1Photo}
                  name={event.event.name}
                  description={event.event.description}
                  startDate={new Date(event.event.startDate)}
                  endDate={new Date(event.event.endDate)}
                  skills={event.skills}
                  link="/home"
                  button_desc="View Event"
                  posterId={event.event.posterId}
                  status={event.event.status}
                  currUsersLength={2}
                  capacity={event.event.capacity ?? 0}
                  location={event.event.location}
                  registrationDeadline={event.event.registrationDeadline}
                  recommend={event.recommend}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default page;
