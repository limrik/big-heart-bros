import { PrismaClient, EventType, Skills, EventStatus } from "@prisma/client";
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

type ResponseData = {
  event?: Event;
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
      const event = await prisma.event.findUnique({
        where: {
          id: eventId.toString(),
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      console.log("Fetched event:", event);
      res.status(200).json({ event, message: "Data fetched successfully" });
    } else {
      throw new Error("Method Not Allowed");
    }
  } catch (error) {
    console.error("Error handling request:", error.message);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
