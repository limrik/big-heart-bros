"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import UserUpcomingCard from "./user-upcoming-card";
import Event2Photo from "../app/assets/volunteer-2.jpg";
import { EventType, Skills, EventStatus, UsersInEvents } from "@prisma/client";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import CompletedEventCard from "./completedEventCard";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import logo from ".././app/assets/bigatheartslogo.png";
import openAILogo from ".././app/assets/openai-logomark.png";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "./ui/skeleton";

Chart.register(...registerables);

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  status: EventStatus;
  users: UsersInEvents[];
}

interface Organisation {
  id: string;
  name: string;
  email: string;
  description: string;
  phoneNumber: string;
}

interface Feedback {
  id: string;
  userId: string;
  organisationId: string;
  eventId: string;
  message: string;
  createdAt: Date;
  organisation: Organisation;
  event: Event;
  user: User;
}

interface User {
  id: string;
  name: string;
}

const currentDate = new Date();
const sixMonthsAgo = new Date(currentDate);
sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

interface MonthData {
  label: string;
  hours: number;
}

const monthsData: MonthData[] = [];

for (let i = 5; i >= 0; i--) {
  const monthDate = new Date(sixMonthsAgo);
  monthDate.setMonth(sixMonthsAgo.getMonth() + i);

  const hours = Math.floor(Math.random() * 10); // Mocking hours below 10
  const monthLabel = monthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  monthsData.push({
    label: monthLabel,
    hours,
  });
}

const data = {
  labels: monthsData.map((month) => month.label),
  datasets: [
    {
      label: "Number of Hours Volunteered",
      data: monthsData.map((month) => month.hours),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

export default function DashboardView({ userId }) {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [uniqueOrganisationNames, setUniqueOrganisationNames] = useState<
    Set<string>
  >(new Set<string>());
  const [uniqueOrganisationNamesArray, setUniqueOrganisationNamesArray] =
    useState<string[]>([]);
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const contentToPrint = useRef(null);

  // const userId = "DEFAULT_ID";

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "Print This Document",
    removeAfterPrint: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/eventsByUserId/${userId}`);
        const data = await response.json();
        const res2 = await fetch(`/api/userFeedback/${userId}`);
        const data2 = await res2.json();

        const approved = data.events.filter(
          (event) => event.status === "Approved"
        );
        const completed = data.events.filter(
          (event) => event.status === "Completed"
        );

        setUpcomingEvents(approved);
        setCompletedEvents(completed);

        setFeedback(data2.feedback);

        const uniqueNames = new Set<string>(
          data2.feedback.map((item) => item.organisation.name)
        );
        setUniqueOrganisationNames(uniqueNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setUniqueOrganisationNamesArray(Array.from(uniqueOrganisationNames));
    console.log("feedback: " + feedback);
  }, [uniqueOrganisationNames]);

  const handleCheckboxChange = (name: string) => {
    setSelectedInputs((prevInputs) => {
      const updatedInputs = prevInputs.includes(name)
        ? prevInputs.filter((input) => input !== name)
        : [...prevInputs, name];
      return updatedInputs;
    });
  };

  const handleFilterFeedback = () => {
    let filteredFeedback = feedback.filter((item) =>
      selectedInputs.includes(item.organisation.name)
    );

    if (filteredFeedback.length > 5) {
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = filteredFeedback.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredFeedback[i], filteredFeedback[j]] = [
          filteredFeedback[j],
          filteredFeedback[i],
        ];
      }
      // Slice the first 5 items
      filteredFeedback = filteredFeedback.slice(0, 5);
    }

    let formattedFeedbackString =
      `Generate a testimonial for ${filteredFeedback[0].user.name}, ` +
      "a dedicated volunteer, verified by Big At Heart, an esteemed organization known for recognizing outstanding community contributions. " +
      `Below are the volunteering events attended by ${filteredFeedback[0].user.name}:\n\n`;

    // Initialize a set to keep track of unique organization IDs
    const uniqueOrganisationIds = new Set();

    // Iterate over the filtered feedback array and add information to the string
    filteredFeedback.forEach((item, index) => {
      // Check if the organization ID is already processed
      if (!uniqueOrganisationIds.has(item.organisation.id)) {
        formattedFeedbackString += `Organisation Name: ${item.organisation.name}\n`;
        formattedFeedbackString += `Organisation Description: ${item.organisation.description}\n\n`;
        // Add the organization ID to the set to mark it as processed
        uniqueOrganisationIds.add(item.organisation.id);
      }

      formattedFeedbackString += `Event ${index + 1}:\n`;
      formattedFeedbackString += `Event Name: ${item.event.name}\n`;
      formattedFeedbackString += `Description: ${item.event.description}\n`;
      formattedFeedbackString += `Skills: ${item.event.skills.join(", ")}\n`;
      formattedFeedbackString += `Feedback Message: ${item.message}\n\n`;
    });

    formattedFeedbackString +=
      "The testimonial generated should be 300 - 500 words long. Do not include the phrase 'testimonial' or 'verified by.'";

    // Use the formattedFeedbackString as needed, such as displaying it in a prompt
    console.log(formattedFeedbackString);
    setPrompt(formattedFeedbackString);
  };

  const fetchGeneratedText = async () => {
    setIsLoading(true);
    if (isLoading) {
      setError("");
      console.log(prompt);

      try {
        const response = await fetch("/api/generateTestimonial", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const res = await response.json();
        console.log(res);
        const messageContent = res.data.choices[0].message.content;
        console.log("OpenAI replied...", messageContent);
        // const messageContent =
        //   "Ben Tan's dedication to volunteerism is truly inspiring. His involvement in various community events reflects his unwavering commitment to making a positive difference in the lives of others. Through his participation in the Cuff Road Project organized by Transient Workers Count Too (TWC2), " +
        //   "Ben demonstrated remarkable leadership and reliability. His consistent presence and dedication to the meal program have been instrumental in ensuring its smooth execution week after week. Ben's positive attitude and enthusiasm have also contributed to creating a welcoming atmosphere at the meal stations, providing comfort to those in need." +
        //   "\n\n" +
        //   // "At Children Home Pasir Ris, Ben's passion for storytelling shone brightly during the Children's Storytelling Session. His ability to engage with the children through animated expressions and dynamic delivery captivated their imaginations and fostered a love for storytelling that will undoubtedly leave a lasting impact on their lives. " +
        //   // "Ben's genuine connection with the children reflects his deep empathy and compassion for vulnerable members of the community." +
        //   // "\n\n" +
        //   "Furthermore, Ben's involvement in Beyond Social's Youth Sports Day exemplifies his dedication to promoting positive youth development. " +
        //   "Through his encouragement and support, Ben fostered a supportive and inclusive environment where youth could actively engage in sports and develop essential skills such as teamwork, leadership, and sportsmanship. His positive attitude served as a source of inspiration for the youth, empowering them to strive for excellence both on and off the field." +
        //   "\n\n" +
        //   "Ben's multifaceted contributions to various community initiatives highlight his versatility and adaptability as a volunteer. Whether it's promoting fair treatment for migrant workers, nurturing the imaginations of children, or empowering youth through sports, Ben consistently demonstrates a genuine desire to create meaningful change. " +
        //   "His selflessness, compassion, and dedication serve as a beacon of hope for the community, inspiring others to join him in making the world a better place." +
        //   "\n\n" +
        //   "In recognition of Ben Tan's outstanding contributions to the community, we extend our heartfelt gratitude and appreciation. " +
        //   "His tireless efforts and unwavering dedication embody the values of compassion, empathy, and social responsibility that are at the heart of volunteerism. We are proud to have Ben as a valued member of our community, and we look forward to witnessing the continued impact of his work for years to come.";
        setGeneratedText(messageContent);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to generate text. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchGeneratedText();
  }, [prompt]);

  return (
    <div className="p-2 px-8 bg-white relative justify-center w-[880px] h-auto">
      <Tabs defaultValue="stats" className="w-full">
        <div className="flex justify-between">
          <TabsList className="rounded-2xl">
            <TabsTrigger className="bg-[#f7d1d1] mr-2" value="stats">
              Activity
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-2" value="next-events">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-2" value="history">
              Historical Events
            </TabsTrigger>
            <TabsTrigger className="mr-1 mr-4  bg-[#f7d1d1]" value="feedback">
              Feedback
              <Image
                src={openAILogo}
                alt="OpenAI Logo"
                width={20}
                height={20}
                className="relative z-10 ml-2"
              />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="stats">
          <div className="flex justify-center h-[300px] w-full mb-16">
            {" "}
            <div>
              <h2 className="text-lg font-semibold ml-6 my-2">Monthly Hours</h2>
              <Bar
                data={data}
                width={800}
                height={80}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 mx-auto"></div>
          </div>
        </TabsContent>
        <TabsContent value="next-events">
          <div className="flex justify-center items-center">
            {upcomingEvents?.length > 0 ? (
              <div className="">
                {upcomingEvents.map((event, index) => (
                  <UserUpcomingCard
                    key={index}
                    id={event.id}
                    image={Event2Photo}
                    name={event.name}
                    description={event.description}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    skills={event.skills}
                    link="/home"
                    button_desc="View Event"
                    posterId={event.posterId}
                    status={event.status}
                    currUsersLength={event.users ? event.users.length : 0}
                    capacity={event.capacity ?? 0}
                    location={event.location}
                    registrationDeadline={event.registrationDeadline}
                  />
                ))}
              </div>
            ) : (
              <p className="py-8">You have no upcoming volunteering events!</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="flex justify-center items-center">
            {completedEvents?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 mx-auto">
                {completedEvents.map((event, index) => (
                  <div>
                    <CompletedEventCard
                      key={index}
                      image={Event2Photo}
                      name={event.name}
                      description={event.description}
                      type={event.type}
                      startDate={event.startDate}
                      endDate={event.endDate}
                      skills={event.skills}
                      organisationId={event.posterId}
                      feedback={feedback.filter(
                        (fb) =>
                          fb.eventId === event.id &&
                          fb.organisationId === event.posterId
                      )}
                      // currUsersLength={2} // event.users ? event.users.length : 0}
                      // capacity={event.capacity ?? 0}
                      // location={event.location}
                      // registrationDeadline={event.registrationDeadline}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8">No completed events</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="feedback">
          <div className="my-4">
            Feedback from organisations to include in testimonial
          </div>
          <div className="flex">
            {feedback?.length > 0 ? (
              <div>
                {uniqueOrganisationNamesArray.map((name, index) => (
                  <div key={index} className="flex items-center">
                    <div>
                      <Checkbox
                        id={`terms-${index}`}
                        onClick={() => handleCheckboxChange(name)}
                        className="mr-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`terms-${index}`}>{name}</Label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8">No feedback received</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleFilterFeedback}
              disabled={selectedInputs.length === 0}
              className="ml-4 mb-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading && prompt ? "Generating..." : "Generate Testimonial"}
            </button>
            <div className="flex items-center">
              <svg
                viewBox="0 0 280 54"
                className="w-40 h-auto flex ml-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m279.99 11.4c0-.41 0-.83 0-1.24-.02-.91-.1-1.81-.25-2.7s-.43-1.76-.84-2.57c-.83-1.62-2.15-2.95-3.78-3.78-.81-.41-1.68-.69-2.58-.85-.89-.15-1.8-.23-2.7-.24-.41 0-.83-.01-1.24-.02-.49 0-.98 0-1.46 0s-254.27-0-254.27-0c-.49 0-.98 0-1.48 0-.41 0-.82.01-1.24.02-.91.01-1.81.09-2.71.24-.89.15-1.76.44-2.57.85s-1.54.95-2.19 1.59c-.64.64-1.18 1.38-1.59 2.19s-.69 1.68-.84 2.57-.23 1.8-.24 2.7c-.01.41-.01.83-.02 1.24v31.2c0 .42 0 .83.02 1.24.01.91.09 1.81.24 2.7s.43 1.76.84 2.57.95 1.54 1.59 2.18 1.38 1.18 2.19 1.59 1.67.7 2.57.85c.89.15 1.8.23 2.71.24.42 0 .83.01 1.24.01h1.48 254.26 1.46c.41 0 .83 0 1.24-.01.9-.01 1.81-.09 2.7-.24.9-.15 1.76-.44 2.58-.85.81-.41 1.55-.95 2.18-1.59.64-.64 1.18-1.37 1.6-2.18.41-.81.69-1.68.84-2.57s.23-1.8.25-2.7c0-.42 0-.83 0-1.24.01-.49.01-.98.01-1.48v-28.25c0-.49 0-.98-.01-1.47zm-1.53 29.53c0 .48 0 .96-.01 1.43v1.24c-.02.83-.09 1.65-.23 2.47-.12.77-.37 1.52-.72 2.22-.35.68-.81 1.3-1.35 1.84-.54.55-1.17 1.01-1.86 1.36-.7.35-1.45.6-2.22.73-.82.13-1.65.21-2.49.22-.39 0-.8.01-1.19.01h-1.44s-255.32 0-255.32 0c-.41 0-.8 0-1.2-.01-.83-.01-1.67-.08-2.49-.22-.77-.13-1.51-.38-2.21-.73-.69-.35-1.32-.81-1.86-1.35-.55-.54-1.01-1.17-1.36-1.86s-.6-1.44-.72-2.21c-.14-.83-.21-1.66-.22-2.5 0-.28-.02-1.22-.02-1.22v-30.73s.01-.92.02-1.19c.01-.84.08-1.67.22-2.49.13-.77.37-1.52.72-2.21s.8-1.32 1.35-1.86c.55-.55 1.18-1.01 1.87-1.36s1.43-.59 2.2-.72c.83-.14 1.66-.21 2.5-.22l1.2-.02h256.75l1.22.02c.83 0 1.66.08 2.47.22.77.13 1.52.38 2.22.73 1.38.71 2.51 1.84 3.21 3.22.35.69.59 1.43.71 2.19.14.83.22 1.67.23 2.51v1.18c.01.5.01.97.01 1.45v27.86z" />
                <path d="m182.74 26.38c0-5.23 3.36-8.88 8.02-8.88s8.02 3.65 8.02 8.88-3.36 8.88-8.02 8.88-8.02-3.65-8.02-8.88zm12.96 0c0-3.74-2.04-6.17-4.94-6.17s-4.94 2.42-4.94 6.17 2.04 6.17 4.94 6.17 4.94-2.42 4.94-6.17zm11.72 8.88c-1.63 0-2.83-.65-3.62-1.58v5.64h-2.88v-16.92h2.88v1.34c.79-.94 1.99-1.58 3.62-1.58 3.53 0 5.54 2.98 5.54 6.55s-2.02 6.55-5.54 6.55zm-3.7-6.91v.74c0 2.33 1.34 3.65 3.12 3.65 2.09 0 3.22-1.63 3.22-4.03s-1.13-4.03-3.22-4.03c-1.78 0-3.12 1.3-3.12 3.67zm17.03 6.91c-3.6 0-6.12-2.66-6.12-6.55s2.5-6.55 6-6.55 5.59 2.76 5.59 6.22v.96h-8.83c.22 2.16 1.51 3.48 3.36 3.48 1.42 0 2.54-.72 2.93-2.02l2.47.94c-.89 2.21-2.88 3.53-5.4 3.53zm-.14-10.68c-1.49 0-2.64.89-3.07 2.59h5.78c-.02-1.39-.89-2.59-2.71-2.59zm7.78 10.42v-12.6h2.88v1.34c.72-.84 1.85-1.58 3.48-1.58 2.64 0 4.22 1.82 4.22 4.54v8.3h-2.88v-7.46c0-1.56-.62-2.69-2.21-2.69-1.3 0-2.62.96-2.62 2.76v7.39h-2.88zm19.02-17.23h3.48l6.53 17.23h-3.1l-1.49-3.94h-7.44l-1.46 3.94h-3.05zm1.68 3.41-2.69 7.2h5.42l-2.74-7.2zm13.27-3.41v17.23h-3.07v-17.23z" />
                <path d="m175.7 24.09c.36-1.08.48-2.22.37-3.35s-.48-2.22-1.05-3.2c-.85-1.48-2.15-2.65-3.71-3.35s-3.3-.88-4.97-.52c-.75-.85-1.68-1.53-2.72-1.99s-2.16-.7-3.3-.69c-1.71 0-3.37.53-4.76 1.54-1.38 1-2.41 2.42-2.94 4.04-1.11.23-2.16.69-3.08 1.36s-1.69 1.52-2.25 2.51c-.86 1.48-1.22 3.19-1.04 4.89s.89 3.3 2.04 4.57c-.36 1.08-.48 2.22-.37 3.35.12 1.13.48 2.22 1.05 3.2.85 1.48 2.15 2.65 3.71 3.35s3.3.88 4.97.52c.75.85 1.68 1.53 2.72 1.99s2.16.7 3.3.69c1.71 0 3.38-.53 4.76-1.54 1.38-1 2.41-2.42 2.94-4.05 1.11-.23 2.16-.69 3.08-1.36s1.68-1.52 2.25-2.51c.86-1.48 1.22-3.19 1.04-4.89s-.89-3.3-2.04-4.56zm-11.96 16.81c-1.59 0-2.83-.49-3.9-1.39.05-.03.13-.07.19-.11l6.37-3.68c.16-.09.29-.22.38-.38s.14-.34.14-.52v-8.98l2.69 1.56s.03.02.04.03c0 .01.01.03.02.04v7.44c0 3.37-2.81 6-5.93 6zm-12.95-5.5c-.7-1.21-.96-2.64-.71-4.02.05.03.13.08.19.11l6.37 3.68c.16.09.34.14.52.14s.36-.05.52-.14l7.78-4.49v3.11s0 .03 0 .05c0 .01-.02.03-.03.04l-6.44 3.72c-1.38.79-3.01 1.01-4.55.6s-2.85-1.42-3.64-2.79zm-1.68-13.91c.7-1.22 1.81-2.15 3.12-2.63v7.58c0 .18.05.36.14.52s.22.29.38.38l7.78 4.49-2.69 1.56s-.03.01-.04.02c-.02 0-.03 0-.05 0l-6.44-3.72c-1.38-.8-2.38-2.11-2.79-3.64-.41-1.54-.2-3.17.59-4.55zm22.13 5.15-7.78-4.49 2.69-1.55s.03-.01.04-.02h.05l6.44 3.72c.99.57 1.79 1.41 2.32 2.42s.75 2.15.66 3.28c-.1 1.14-.52 2.22-1.21 3.12-.69.91-1.62 1.6-2.69 1.99v-7.58c0-.18-.05-.36-.14-.52s-.22-.29-.38-.38zm2.68-4.04s-.13-.08-.19-.11l-6.37-3.68c-.16-.09-.34-.14-.52-.14s-.37.05-.52.14l-7.78 4.49v-3.11s0-.03 0-.05c0-.01.02-.03.03-.04l6.44-3.72c.99-.57 2.11-.85 3.25-.8s2.24.42 3.17 1.07 1.66 1.56 2.1 2.61.57 2.21.38 3.33zm-16.85 5.55-2.69-1.56s-.03-.02-.04-.03c0-.01-.01-.03-.02-.04v-7.44c0-1.14.33-2.25.94-3.22.61-.96 1.48-1.73 2.52-2.21 1.03-.48 2.18-.66 3.31-.52 1.13.15 2.2.61 3.07 1.34-.05.03-.13.07-.19.11l-6.37 3.68c-.16.09-.29.22-.38.38s-.14.34-.14.52v8.98zm1.46-3.15 3.46-2 3.46 2v4l-3.46 2-3.46-2z" />
                <path d="m20.7 28.33v6.67h-3.07v-17.23h6.89c3.84 0 6.24 1.8 6.24 5.28s-2.4 5.28-6.24 5.28zm0-2.64h3.65c2.21 0 3.38-.96 3.38-2.64s-1.18-2.64-3.38-2.64h-3.65zm22.59 3.02c0 3.91-2.52 6.55-6.07 6.55s-6.07-2.64-6.07-6.55 2.52-6.55 6.07-6.55 6.07 2.64 6.07 6.55zm-9.24 0c0 2.57 1.22 4.13 3.17 4.13s3.17-1.56 3.17-4.13-1.22-4.13-3.17-4.13-3.17 1.56-3.17 4.13zm17.13-6.31h2.38l2.26 8.35 2.23-8.35h2.86l-3.79 12.6h-2.5l-2.3-8.26-2.3 8.26h-2.5l-3.79-12.6h2.95l2.28 8.35 2.23-8.35zm16.25 12.86c-3.6 0-6.12-2.66-6.12-6.55s2.5-6.55 6-6.55 5.59 2.76 5.59 6.22v.96h-8.83c.22 2.16 1.51 3.48 3.36 3.48 1.42 0 2.54-.72 2.93-2.02l2.47.94c-.89 2.21-2.88 3.53-5.4 3.53zm-.14-10.68c-1.49 0-2.64.89-3.07 2.59h5.78c-.02-1.39-.89-2.59-2.71-2.59zm14.81-2.21v2.88c-.36-.05-.65-.07-1.06-.07-1.82 0-3.22 1.18-3.22 3.19v6.62h-2.88v-12.6h2.88v1.87c.55-1.18 1.85-1.94 3.46-1.94.34 0 .6.02.82.05zm6.59 12.89c-3.6 0-6.12-2.66-6.12-6.55s2.5-6.55 6-6.55 5.59 2.76 5.59 6.22v.96h-8.83c.22 2.16 1.51 3.48 3.36 3.48 1.42 0 2.54-.72 2.93-2.02l2.47.94c-.89 2.21-2.88 3.53-5.4 3.53zm-.14-10.68c-1.49 0-2.64.89-3.07 2.59h5.78c-.02-1.39-.89-2.59-2.71-2.59zm12.41 10.68c-3.53 0-5.54-2.98-5.54-6.55s2.02-6.55 5.54-6.55c1.63 0 2.83.65 3.62 1.58v-5.98h2.88v17.23h-2.88v-1.32c-.79.94-1.99 1.58-3.62 1.58zm3.7-6.91c0-2.38-1.34-3.67-3.12-3.67-2.09 0-3.22 1.63-3.22 4.03s1.13 4.03 3.22 4.03c1.78 0 3.12-1.32 3.12-3.65zm17.39 6.91c-1.63 0-2.83-.65-3.62-1.58v1.32h-2.88v-17.23h2.88v5.98c.79-.94 1.99-1.58 3.62-1.58 3.53 0 5.54 2.98 5.54 6.55s-2.02 6.55-5.54 6.55zm-3.7-6.91v.74c0 2.33 1.34 3.65 3.12 3.65 2.09 0 3.22-1.63 3.22-4.03s-1.13-4.03-3.22-4.03c-1.78 0-3.12 1.3-3.12 3.67zm16.58 7.82c-.72 1.92-1.82 3.24-4.44 3.24-.6 0-.77-.02-1.18-.07v-2.42c.38.05.6.07.96.07.96 0 1.42-.26 1.82-1.27l.48-1.18-4.58-12.14h3.02l3.1 8.83 3.02-8.83h2.98l-5.18 13.78z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            {isLoading && prompt ? (
              <div className="flex flex-col space-y-3 mt-6 items-center">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-100" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-slate-100" />
                  <Skeleton className="h-4 w-[200px] bg-slate-100" />
                </div>
              </div>
            ) : (
              <>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {generatedText && (
                  <div>
                    <div
                      className="rounded border bg-white h-[11.69in]"
                      ref={contentToPrint}
                    >
                      <div className="p-4 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                          <Image
                            src={logo}
                            alt="logo"
                            width={200}
                            height={200}
                          />
                          <hr className="border-t border-gray-200 w-full my-4" />
                          <p className="whitespace-pre-wrap text-justify bg-white p-4 rounded-lg">
                            {generatedText}
                          </p>
                        </div>
                      </div>
                      <div className="my-4 mx-4 text-left ">
                        <hr className="border-t border-gray-200 w-full my-4" />
                        <p className="text-gray-600 font-serif">
                          With sincerest regards,
                        </p>
                        <p className="text-lg font-semibold tracking-wide text-indigo-800 uppercase">
                          Big At Heart
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 flex"
                        onClick={handlePrint}
                      >
                        Save as PDF
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
