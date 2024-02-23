import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, EventStatus } from "@prisma/client";

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
    const { eventId } = req.body;

    // Check if eventId is provided
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Update the status of the event to "Completed"
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { status: EventStatus.Completed },
    });

    console.log("Event status updated successfully:", updatedEvent);

    res.status(200).json({ message: "Event status updated successfully" });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
