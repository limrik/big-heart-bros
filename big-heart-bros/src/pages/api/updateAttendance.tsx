// pages/api/updateAttendance.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface ResponseData {
  message: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { attendedUserIds, eventId } = req.body;

    // Check if attendedUserIds and eventId are provided
    if (!attendedUserIds || !eventId) {
      return res
        .status(400)
        .json({ message: "User IDs and Event ID are required" });
    }

    // Update UsersInEvents model for attended users
    await Promise.all(
      attendedUserIds.map(async (userId: string) => {
        await prisma.usersInEvents.upsert({
          where: { userId_eventId: { userId, eventId } },
          update: { attended: true },
          create: { userId, eventId, attended: true },
        });
      })
    );

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
