import { PrismaClient, EventStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "PATCH") {
      const { eventId } = req.query;

      if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
      }
      const updatedEvent = await prisma.event.update({
        where: { id: String(eventId) },
        data: { status: EventStatus.Approved },
      });

      res.status(200).json({
        event: updatedEvent,
        message: "Event approval status updated successfully",
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
