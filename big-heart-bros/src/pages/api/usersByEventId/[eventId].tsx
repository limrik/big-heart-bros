import {
  PrismaClient,
  EventType,
  Skills,
  EventStatus,
  GenderType,
  CommitmentLevelType,
  Feedback,
  ResidentialStatusType,
} from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
}

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: GenderType;
  occupation?: string | null;
  dob: Date;
  canDrive: boolean;
  ownVehicle: boolean;
  commitmentLevel: CommitmentLevelType;
  skills: Skills[];
  feedback?: Feedback[];
  residentialStatus: ResidentialStatusType;
  // events: UsersInEvents[];
}

interface UsersInEvents {
  user: User;
  userId: string;
  event: Event;
  eventId: string;
  attended: boolean;
}

type ResponseData = {
  users: User[];
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const { eventId } = req.query;

    if (req.method === "GET" && eventId) {
      const usersInEvents = await prisma.usersInEvents.findMany({
        where: {
          eventId: eventId.toString(),
        },
        include: {
          user: true,
        },
      });

      // console.log("hi", usersInEvents);

      const users = usersInEvents.map((userInEvent) => ({
        ...userInEvent.user,
        attended: userInEvent.attended,
      }));
      console.log(users);

      res.status(200).json({ users, message: "Users fetched successfully" });
    } else {
      res.status(405).json({ users: [], message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ users: [], message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
