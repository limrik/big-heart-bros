import { PrismaClient, EventType, Skills, EventStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  status: EventStatus;
}

type ResponseData = {
  events: Event[];
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { organizationId } = req.query;

    if (req.method === "GET" && organizationId) {
      const events = await prisma.event.findMany({
        where: {
          status: EventStatus.Approved,
          posterId: organizationId.toString(),
        },
      });

      console.log("Fetched events for organization:", events);
      res.status(200).json({ events, message: "Data fetched successfully" });
    } else if (req.method === "POST") {
      const { posterId, ...eventData } = req.body;

      const newEvent = await prisma.event.create({
        data: {
          ...eventData,
          posterId: posterId,
        },
      });

      res
        .status(201)
        .json({ events: [newEvent], message: "Event created successfully" });
    } else {
      res.status(405).json({ events: [], message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ events: [], message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
