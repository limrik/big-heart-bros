import { Event, Feedback } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Organisation {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  //   events: Event[];
  //   feedbackGiven: Feedback[];
}

type ResponseData = {
  organisation?: Organisation;
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const { email } = req.query;

    if (req.method === "GET" && email) {
      const organisation = await prisma.organisation.findFirst({
        where: {
          email: email.toString(),
        },
      });

      if (!organisation) {
        throw new Error("Organisation not found");
      }

      console.log("Fetched organisation:", organisation);
      res
        .status(200)
        .json({ organisation, message: "Data fetched successfully" });
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
