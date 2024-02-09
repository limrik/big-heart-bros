import { PrismaClient, Feedback} from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  feedback: Feedback[];
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { userId } = req.query;

    if (req.method === "GET" && userId) {
      const feedback = await prisma.feedback.findMany({where: {
        userId: userId.toString(),
    },
    include: {
        organisation: true,
        event: true,
        user: true,
    },
  });

  res.status(200).json({ feedback, message: "Users fetched successfully" });
} else {
  res.status(405).json({ feedback: [], message: "Method Not Allowed" });
}
} catch (error) {
console.error("Error handling request:", error);
res.status(500).json({ feedback: [], message: "Internal server error" });
} finally {
await prisma.$disconnect();
}
}