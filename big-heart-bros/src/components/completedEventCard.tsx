import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { cn } from "../lib/utils";
import Image, { StaticImageData } from "next/image";
import { EventType, Skills, EventStatus, UsersInEvents } from "@prisma/client";
import { useState, useEffect } from "react";
import { Separator } from "./ui/separator";

type CardComponentProps = {
  image: StaticImageData; // local path to image for now
  // From database
  name: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  organisationId: string;
  feedback: Feedback[];
};

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

const CompletedEventCard: React.FC<CardComponentProps> = (props) => {
  const [organisationName, setOrganisationName] = useState<string>("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/organisation/${props.organisationId}`
        );
        const data = await response.json();

        setOrganisationName(data.organisation.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className={cn("w-full bg-white rounded-none shadow-xl my-4")}>
      <CardHeader>
        <div className="flex items-center px-4 py-3">
          <div className="flex-shrink-0 mr-3">
            <Image
              className="w-12 h-12 rounded-full"
              src={props.image}
              alt="Event Image"
              width={48}
              height={48}
            />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">
              {props.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {organisationName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={props.image}
          alt="Event Image"
          className="rounded-lg object-cover h-80"
          // sizes="(max-width: 30px), (max-width: 30px)"
        />
        <div className="px-4 pt-4">
          <p className="mb-4">{props.description}</p>
          <div className="flex flex-rows gap-2 items-center">
            <div>
              <p className="text-sm text-gray-700">Start </p>
              <p className="text-sm">
                {new Date(props.startDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <Separator className="w-12" />
            <div>
              <p className="text-sm text-gray-700">End </p>{" "}
              <p className="text-sm">
                {new Date(props.endDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="px-4">
          <div className="flex flex-wrap gap-2">
            {props.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-800"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
      <Separator />
      <div className="mt-8 px-12">
        <h2 className="font-semibold mb-4">Comments</h2>
        {props.feedback.map((comment, index) => (
          <div key={index} className="bg-white rounded-md py-6 mb-2">
            <p className="text-gray-800 mb-4">{comment.message}</p>
            <div className="flex items-center justify-between text-gray-600 text-xs">
              <p className="text-end w-full">
                By {comment.organisation.name} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CompletedEventCard;
