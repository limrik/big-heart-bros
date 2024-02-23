import {
  PrismaClient,
  Skills,
  GenderType,
  CommitmentLevelType,
  Feedback,
  ResidentialStatusType,
  Interests,
} from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
  interests: Interests[];
  // events: UsersInEvents[];
}

type ResponseData = {
  user?: User | null; // Make it optional since it may not exist
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const { userId } = req.query;

    if (req.method === "GET" && userId) {
      const userWithId = await prisma.user.findUnique({
        where: {
          id: userId.toString(),
        },
      });

      if (userWithId) {
        const userResponse: ResponseData = {
          user: userWithId,
          message: "user fetched successfully",
        };

        res.status(200).json(userResponse);
      } else {
        res.status(404).json({ user: null, message: "User not found" });
      }
    } else {
      res.status(405).json({ user: null, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ user: null, message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
