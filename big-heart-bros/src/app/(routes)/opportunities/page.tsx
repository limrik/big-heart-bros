"use client";
import React from "react";
import Navbar from "../../../components/navbar";
import { useState, useEffect } from "react";
import VolunteerCard from "../../../components/volunteer-card";
import { EventType, Skills, EventStatus, Interests } from "@prisma/client";
import Event1Photo from "../../assets/volunteer-1.jpg";
import { signIn, signOut, useSession } from "next-auth/react";
import { set } from "date-fns";

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

useEffect(() => {
    async function fetchData() {
      // if (session != null) {
      try {
        const response = await fetch(`/api/approvedEvent`);
        const data = await response.json();

        const userResponse = await fetch(`/api/checkUserByEmail/bentan@gmail.com`);
        const userData = await userResponse.json();

        console.log(userData);

        setEvents(data.events);
        // Check if data1 is not null before setting userInfo
        if (userData !== null) {
            setUserInfo(userData.user);
        } else {
            // If data1 is null, fetch default user data from the database
            const userResponse = await fetch(`/api/checkUserByEmail/bentan@gmail.com`);
            const userData = await userResponse.json();
            setUserInfo(userData.user);
        }

        console.log("reached")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  // } else {
  //   const response = await fetch(`/api/approvedEvent`);
  //   const data = await response.json();
  //   setEvents(data.events);
  // }
}

  fetchData();
}, [session]);

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  // Calculate dot product
  const dotProduct = vectorA.reduce((acc, value, index) => acc + (value * vectorB[index]), 0);
  
  // Calculate magnitude of vectors
  const magnitudeA = Math.sqrt(vectorA.reduce((acc, value) => acc + Math.pow(value, 2), 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((acc, value) => acc + Math.pow(value, 2), 0));
  console.log("Dot Product:", dotProduct);
  console.log("Magnitude A:", magnitudeA);
  console.log("Magnitude B:", magnitudeB);


  // Calculate cosine similarity
  return dotProduct / (magnitudeA * magnitudeB);
}

console.log(userInfo)
const userSkills = userInfo?.skills ?? [];

const eventsWithSkills = () => 
  events.map((event) => ({
    event: event, 
    skills: event.skills
  }));

// Calculate cosine similarity for each event
const eventSimilarities = eventsWithSkills().map(event => {
  console.log("Event:", event.event.name);
  console.log("Event Skills:", event.event.skills);
  console.log("User Skills:", userSkills);
  const userVector = userSkills.map(skill => event.skills.includes(skill) ? 0.9 : 0.1);
  const eventVector = event.skills.map(skill => userSkills.includes(skill) ? 0.9 : 0.1);
  const similarityScore = cosineSimilarity(userVector, eventVector) ?? 0;
  const similarityScoreChecked = isNaN(similarityScore) ? 0 : similarityScore;
  console.log(event.event.name + ": " + similarityScoreChecked);
  return { 
    event: event, 
    similarity: similarityScoreChecked
  };
});

// Sort events based on similarity score in descending order
eventSimilarities.sort((a, b) => b.similarity - a.similarity);

// Get top 5 events with highest similarity scores
const topEvents = eventSimilarities.slice(0, 6).map(item => item.event);

  return (
    <div className="bg-[#f7d9d9] min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto">
        <p className="font-bold text-2xl py-10">Volunteering Opportunities</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
          {topEvents.map((event, index) => (
            <VolunteerCard
              key={index}
              id={event.event.id}
              image={Event1Photo}
              name={event.event.name}
              description={event.event.description}
              startDate={event.event.startDate}
              endDate={event.event.endDate}
              skills={event.skills}
              link="/home"
              button_desc="View Event"
              posterId={event.event.posterId}
              status={event.event.status}
              currUsersLength={2}
              //{event.users ? event.users.length : 0}
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
