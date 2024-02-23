import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  hoursToAdd: number;
  userIds: string[];
}

interface ResponseData {
  message: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { hoursToAdd, userIds }: RequestBody = req.body;

    // Check if hoursToAdd and userIds are provided
    if (!hoursToAdd || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Update the total hours for each user
    await Promise.all(
      userIds.map(async (userId: string) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: userId },
            data: { totalHours: user.totalHours + hoursToAdd },
          });
        }
      }),
    );

    res.status(200).json({ message: "Hours updated successfully" });
  } catch (error) {
    console.error("Error updating hours:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
