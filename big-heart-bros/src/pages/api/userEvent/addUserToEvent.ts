import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other fields relevant to the User model
}

interface Event {
  id: string;
  name: string;
  // Add any other fields relevant to the Event model
}

type ResponseData = {
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId, eventId } = req.body;

    // Check if userId and eventId are provided
    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: "User ID and Event ID are required" });
    }

    const createdUsersInEvents = await prisma.usersInEvents.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        events: {
          connect: {
            userId_eventId: {
              userId: createdUsersInEvents.userId,
              eventId: createdUsersInEvents.eventId,
            },
          },
        },
      },
    });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          users: {
            connect: {
              userId_eventId: {
                userId: createdUsersInEvents.userId,
                eventId: createdUsersInEvents.eventId,
              },
            },
          },
        },
      });

    console.log(updatedUser)
    console.log(updatedEvent)

    res.status(200).json({ message: "User added to event successfully" });
  } catch (error) {
    console.error("Error adding user to event:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
