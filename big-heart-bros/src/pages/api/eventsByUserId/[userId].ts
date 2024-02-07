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
  }
  
  interface UsersInEvents {
    user: User;
    userId: string;
    event: Event;
    eventId: string;
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
      const { userId } = req.query;
  
      if (req.method === "GET" && userId) {
        const events = await prisma.event.findMany({
          where: {
            users: {
              some: {
                userId: userId.toString(),
              },
            },
          },
        });
  
        res.status(200).json({ events, message: "Events fetched successfully" });
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
  