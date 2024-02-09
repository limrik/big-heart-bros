"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import UserUpcomingCard from "./user-upcoming-card";
import Event2Photo from "../app/assets/volunteer-2.jpg";
import { EventType, Skills, EventStatus, UsersInEvents } from "@prisma/client";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import CompletedEventCard from "./completedEventCard";
import UserFeedback from "./user-feedback";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import OpenAIComponent from "./openaiComponent";
import logo from ".././app/assets/bigatheartslogo.png";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

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
        const response = await fetch(
          `http://localhost:3000/api/eventsByUserId/${userId}`
        );
        const data = await response.json();
        const res2 = await fetch(
          `http://localhost:3000/api/userFeedback/${userId}`
        );
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
  }, feedback);

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
    //     const response = await fetch("/api/generateTestimonial", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ prompt }),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch data: ${response.statusText}`);
    //     }

    //     const res = await response.json();
    //     console.log(res);
    //     const messageContent = res.data.choices[0].message.content;
    //     console.log("OpenAI replied...", messageContent);
        const messageContent =
          "Ben Tan's dedication to volunteerism is truly inspiring. His involvement in various community events reflects his unwavering commitment to making a positive difference in the lives of others. Through his participation in the Cuff Road Project organized by Transient Workers Count Too (TWC2), " +
          "Ben demonstrated remarkable leadership and reliability. His consistent presence and dedication to the meal program have been instrumental in ensuring its smooth execution week after week. Ben's positive attitude and enthusiasm have also contributed to creating a welcoming atmosphere at the meal stations, providing comfort to those in need." +
          "\n\n" +
          // "At Children Home Pasir Ris, Ben's passion for storytelling shone brightly during the Children's Storytelling Session. His ability to engage with the children through animated expressions and dynamic delivery captivated their imaginations and fostered a love for storytelling that will undoubtedly leave a lasting impact on their lives. " +
          // "Ben's genuine connection with the children reflects his deep empathy and compassion for vulnerable members of the community." +
          // "\n\n" +
          "Furthermore, Ben's involvement in Beyond Social's Youth Sports Day exemplifies his dedication to promoting positive youth development. " +
          "Through his encouragement and support, Ben fostered a supportive and inclusive environment where youth could actively engage in sports and develop essential skills such as teamwork, leadership, and sportsmanship. His positive attitude served as a source of inspiration for the youth, empowering them to strive for excellence both on and off the field." +
          "\n\n" +
          "Ben's multifaceted contributions to various community initiatives highlight his versatility and adaptability as a volunteer. Whether it's promoting fair treatment for migrant workers, nurturing the imaginations of children, or empowering youth through sports, Ben consistently demonstrates a genuine desire to create meaningful change. " +
          "His selflessness, compassion, and dedication serve as a beacon of hope for the community, inspiring others to join him in making the world a better place." +
          "\n\n" +
          "In recognition of Ben Tan's outstanding contributions to the community, we extend our heartfelt gratitude and appreciation. " +
          "His tireless efforts and unwavering dedication embody the values of compassion, empathy, and social responsibility that are at the heart of volunteerism. We are proud to have Ben as a valued member of our community, and we look forward to witnessing the continued impact of his work for years to come.";
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
    <div className="p-2 px-4 bg-white relative justify-center w-[880px] h-auto">
      <Tabs defaultValue="stats" className="w-full">
        <div className="flex justify-between">
          <TabsList className="rounded-2xl">
            <TabsTrigger className="bg-[#f7d1d1] ml-1 mr-2" value="stats">
              Activity
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-1 mr-2" value="next-events">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-1 mr-4" value="history">
              Historical Events
            </TabsTrigger>
            <TabsTrigger className="bg-[#f7d1d1] mr-1 mr-4" value="feedback">
              Feedback
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
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto"></div>
          </div>
        </TabsContent>
        <TabsContent value="next-events">
          <div className="flex justify-center">
            {upcomingEvents?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
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
          <div className="flex justify-center">
            {completedEvents?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 mx-auto">
                {completedEvents.map((event) => (
                  <CompletedEventCard
                    image={Event2Photo}
                    name={event.name}
                    description={event.description}
                    type={event.type}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    skills={event.skills}
                    organisationId={event.posterId}
                    // currUsersLength={2} // event.users ? event.users.length : 0}
                    // capacity={event.capacity ?? 0}
                    // location={event.location}
                    // registrationDeadline={event.registrationDeadline}
                  />
                ))}
              </div>
            ) : (
              <p className="py-8">No completed events</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="feedback">
          <div className="mb-4">
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
          <div className="flex justify-center mt-4">
            <button
              onClick={handleFilterFeedback}
              disabled={selectedInputs.length == 0}
              className="ml-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading && prompt ? "Generating..." : "Generate Testimonial"}
            </button>
          </div>
          <div className="mt-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {generatedText && (
              <div>
                <div className="rounded border bg-white h-[11.69in]" ref={contentToPrint}>
                  <div className="p-4 flex justify-center items-center">
                    <div className="flex flex-col items-center">
                      <Image src={logo} alt="logo" width={200} height={200} />
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
