import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import { cn } from "../lib/utils";

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

import Image, { StaticImageData } from "next/image";

import { EventType, Skills, EventStatus } from "@prisma/client";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import React from "react";
import { FaClock } from "react-icons/fa6";

type CardComponentProps = {
  image: StaticImageData; // local path to image for now
  link: string;
  button_desc: string;

  // From database
  id: string;
  name: string;
  description: string;
  capacity: number;
  type?: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  createdAt?: Date;
  posterId: String;
  status: EventStatus;
  currUsersLength: number;
  location: String;
  recommend: boolean;
};

const handleView = async (userId, eventId) => {
  console.log(userId);
  console.log(eventId);
};

const handleClick = async (userId, eventId) => {
  try {
    const response = await fetch("/api/userEvent/addUserToEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add user to event");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error adding user to event:", error.message);
  }
};

const CardComponent: React.FC<CardComponentProps> = (props) => {
  console.log(props);

  return (
    <Card className={cn("w-[360px] bg-[#ffffff] rounded-none my-4")}>
      <div className="relative">
        {/* Your card content */}
        {props.recommend && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md">
            <p className="text-xs font-semibold">Recommended for you</p>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-center">
          <Image className="pb-4 w-full" src={props.image} alt="Event Image" />
        </div>
        <CardTitle className="font-semibold">{props.name}</CardTitle>
        {/* <CardDescription className="text-justify">
          {props.description}
        </CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-row gap-4 items-center">
          {" "}
          <FaClock color="gray" />
          <div>
            <p className="text-sm text-gray-500"> Start </p>
            <p className="text-sm">
              {`${new Date(props.startDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })} ${new Date(props.startDate).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}{" "}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500"> End </p>
            <p className="text-sm">
              {`${new Date(props.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })} ${new Date(props.endDate).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-auto-1fr gap-2">
          <div className="grid grid-cols-2 gap-2">
            {props.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-300 px-2 rounded-3xl text-sm text-center transition hover:bg-[#fcb6b6]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
      <CardFooter className="flex justify-centre">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-red-400 rounded-2xl text-white hover:bg-gray-400 duration-300">
              View Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{props.name}</DialogTitle>
              <DialogDescription>{props.description}</DialogDescription>
            </DialogHeader>
            <hr />
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                {props.registrationDeadline ? (
                  <DialogDescription>
                    <p>
                      <span className="font-bold">Registration Deadline: </span>
                      {new Date(props.registrationDeadline).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </DialogDescription>
                ) : null}
                {props.startDate && props.endDate ? (
                  <DialogDescription>
                    <p>
                      <span className="font-bold">Current Capacity: </span>
                      {props.currUsersLength} / {props.capacity}
                    </p>
                    <progress
                      className="w-1/2"
                      value={props.currUsersLength / props.capacity}
                    />
                    <p>
                      <span className="font-bold">Location: </span>
                      {props.location}
                    </p>
                    <p>
                      <span className="font-bold">From: </span>
                      {`${new Date(props.startDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )} ${new Date(props.startDate).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`}{" "}
                      to{" "}
                      {`${new Date(props.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })} ${new Date(props.endDate).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`}
                    </p>
                  </DialogDescription>
                ) : null}
                <DialogDescription>
                  <div className="grid grid-cols-auto-1fr gap-2">
                    <div className="col-span-full">
                      <h3 className="font-bold">Skills Wanted:</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {props.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-gray-300 p-2 rounded-xl text-sm text-center transition hover:bg-[#fcb6b6]"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogDescription>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose className="flex">
                <Button
                  className="w-full my-1 bg-red-400 rounded-2xl text-white hover:bg-red-600"
                  type="button"
                >
                  Join Event
                </Button>
                <Button
                  className="w-full my-1 bg-gray-400 rounded-2xl text-white ml-4 hover:bg-gray-600"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
