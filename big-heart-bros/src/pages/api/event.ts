// import { PrismaClient, EventType, Skills } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from "next";

// interface Event {
//   id: string;
//   name: string;
//   description: string;
//   capacity: number;
//   type: EventType;
//   registrationDeadline: Date;
//   startDate: Date;
//   endDate: Date;
//   skills: Skills[];
//   createdAt: Date;
//   // Add posterId to the Event interface
//   posterId: string;
// }

// type ResponseData = {
//   events: Event[];
//   message: string;
// };

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   try {
//     if (req.method === "GET") {
//       const events = await prisma.event.findMany();
//       console.log("Fetched events:", events);
//       res.status(200).json({ events, message: "Data fetched successfully" });
//     } else if (req.method === "POST") {
//       const { posterId, ...eventData } = req.body;

//       const newEvent = await prisma.event.create({
//         data: {
//           ...eventData,
//           posterId: posterId,
//         },
//       });

//       res
//         .status(201)
//         .json({ events: [newEvent], message: "Event created successfully" });
//     } else {
//       res.status(405).json({ events: [], message: "Method Not Allowed" });
//     }
//   } catch (error) {
//     console.error("Error handling request:", error);
//     res.status(500).json({ events: [], message: "Internal server error" });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
