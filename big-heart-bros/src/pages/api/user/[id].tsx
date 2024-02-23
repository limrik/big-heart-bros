import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (!id) {
        throw new Error("User ID is required");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: id.toString(),
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      console.log("Fetched user:", user);
      res.status(200).json({ user, message: "User fetched successfully" });
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
