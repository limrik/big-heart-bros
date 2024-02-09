import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { cn } from "../lib/utils";
import Image, { StaticImageData } from "next/image";
import { EventType, Skills, EventStatus } from "@prisma/client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type CardComponentProps = {
  image: StaticImageData; // local path to image for now
  link: string;
  button_desc: string;

  // From database
  id: string;
  name: string;
  description: string;
  location: string;
  capacity?: number;
  type?: EventType;
  registrationDeadline?: Date;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  createdAt?: Date;
  posterId: String;
  status: EventStatus;
  organisationId: string;
};

const PendingEventCard: React.FC<CardComponentProps> = (props) => {
  const [organisationName, setOrganisationName] = useState<string>("");

  // @dayn to link to event page
  const nav = () => {
    console.log("Go to event page");
  };

  return (
    <Card className={cn("w-full bg-white rounded-lg shadow-md my-2")}>
      <CardHeader>
        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="flex items-center px-4">
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
                  <p className="text-sm text-gray-700 mb-2">
                    {props.description}
                  </p>
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="flex px-4 w-1/2 justify-between">
            <div>
              <p className="text-sm text-gray-700">
                From:{" "}
                {new Date(props.startDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                to{" "}
                {new Date(props.endDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm">Location: {props.location} </p>
            </div>
            <div>
              <Button
                onClick={nav}
                className="w-full my-1 bg-red-400 rounded-2xl text-white hover:bg-gray-400"
              >
                View Event
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PendingEventCard;
