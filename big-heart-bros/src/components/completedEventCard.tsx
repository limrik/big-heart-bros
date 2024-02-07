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
import { EventType, Skills, EventStatus } from "@prisma/client";
import { useState, useEffect } from "react";

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
};

const CompletedEventCard: React.FC<CardComponentProps> = (props) => {
  const [organisationName, setOrganisationName] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/organisation/${props.organisationId}`
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
    <Card className={cn("w-full bg-white rounded-lg shadow-md mb-4")}>
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
            className="rounded-lg"
            sizes="(max-width: 30px), (max-width: 30px)"
          />
        <div className="px-4 py-2">
          <p className="text-sm text-gray-700 mb-2">{props.description}</p>
          <p className="text-sm text-gray-700">
            From:{" "}
            {new Date(props.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            <br />
            To:{" "}
            {new Date(props.endDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold mb-2">Skills Wanted:</h3>
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
    </Card>
  );
};

export default CompletedEventCard;
