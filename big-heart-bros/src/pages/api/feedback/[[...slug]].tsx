import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Feedback {
  id: string;
  message: string;
  createdAt: Date;
  // Add other properties as needed
}

type ResponseData = {
  feedback?: Feedback | null;
  error?: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { slug } = req.query;

  if (req.method === "GET" && slug && slug.length === 3) {
    // Ensure you have all parameters
    const [organisationId, userId, eventId] = slug as string[];
    try {
      const feedback = await prisma.feedback.findFirst({
        where: {
          userId: userId.toString(),
          organisationId: organisationId.toString(),
          eventId: eventId.toString(),
        },
        include: {
          user: true,
          organisation: true,
          event: true,
        },
      });

      res.status(200).json({ feedback });
    } catch (error) {
      console.error("Error retrieving feedback:", error);
      res.status(500);
    }
  } else if (req.method === "POST" && slug && slug.length === 3) {
    // Handle POST request
    const [organisationId, userId, eventId] = slug as string[];
    const { message } = req.body;

    try {
      const feedback = await prisma.feedback.create({
        data: {
          userId: userId,
          organisationId: organisationId,
          eventId: eventId,
          message: message,
        },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          feedback: {
            connect: { id: feedback.id },
          },
        },
      });

      const updatedOrganisation = await prisma.organisation.update({
        where: { id: organisationId },
        data: {
          feedbackGiven: {
            connect: { id: feedback.id },
          },
        },
      });

      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          feedbackGiven: {
            connect: { id: feedback.id },
          },
        },
      });

      res.status(201).json({ feedback });
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
