import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Feedback {
    id: string;
    message: string;
    createdAt: Date;
    // Add other properties as needed
}

type ResponseData = {
    feedback: Feedback | null;
};

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { slug } = req.query;

    if (req.method === "GET" && slug && slug.length === 3) { // Ensure you have all parameters
        const [organisationId, userId, eventId] = slug as string[];
        try {
            const feedback = await prisma.feedback.findFirst({
                where: {
                    userId: userId.toString(),
                    organisationId: organisationId.toString(),
                    eventId: eventId.toString()
                },
                include: {
                    user: true,
                    organisation: true,
                    event: true
                },
            });

            res.status(200).json({ feedback });
        } catch (error) {
            console.error("Error retrieving feedback:", error);
            res.status(500);
        }
    } else {
        res.status(400);
    }
}
