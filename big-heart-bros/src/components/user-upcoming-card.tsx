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

import { Button } from "./ui/button";

import Image, { StaticImageData } from "next/image";

import { EventType, Skills, EventStatus } from "@prisma/client";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

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
  registrationDeadline?: Date;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  createdAt?: Date;
  posterId: String;
  status: EventStatus;
  currUsersLength: number;
  location: String;
};

const UserUpcomingCard: React.FC<CardComponentProps> = (props) => {
  console.log(props);
  return (
    <Card className={cn("bg-[#ffffff] my-4 w-full shadow-xl rounded-none")}>
      <CardHeader>
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <CardTitle className="text-xl">{props.name}</CardTitle>
            <CardDescription className="text-justify">
              {props.description}
            </CardDescription>{" "}
          </div>
          <div>
            <div className="text-center flex flex-col items-end justify-center">
              <div>
                <p className="text-xs text-left text-gray-600">Start</p>
                <p className="text-sm">
                  {" "}
                  {new Date(props.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Separator orientation="vertical" className="my-1 mr-9" />
              <div>
                <p className="text-xs text-left text-gray-600">End</p>
                <p className="text-sm">
                  {" "}
                  {new Date(props.endDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center h-80">
          <Image
            className="py-4 object-cover w-full"
            src={props.image}
            alt="Event Image"
          />
        </div>
      </CardHeader>
      <CardFooter>
        <div className="grid grid-cols-auto-1fr gap-2">
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
      </CardFooter>
      <CardFooter className="flex justify-center">
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
                <DialogDescription>
                  <span className="font-bold">Contact: </span>
                </DialogDescription>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose className="flex">
                <Button className="w-full my-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md duration-300">
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

export default UserUpcomingCard;
