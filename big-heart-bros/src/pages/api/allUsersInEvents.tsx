import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const usersInEvents = await prisma.usersInEvents.findMany({
      include: {
        user: true,
        event: true,
      },
    });

    res.status(200).json(usersInEvents);
  } catch (error) {
    console.error("Error retrieving users in events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
