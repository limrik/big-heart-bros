import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const userEmail = req.query.userEmail as string;
      const userData = req.body;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      console.log(existingUser)
      if (existingUser != null) {
        console.log("here")
        res.status(400).json({ message: 'User with this email already exists' });
      } else {
        const createdUser = await prisma.user.create({
          data: {
            ...userData,
          },
        });

        res.status(201).json(createdUser);
      }
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        console.log("p2002 error")
        console.error("User with this email already exists");
        res.status(400).json({ message: 'User with this email already exists' });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } finally {
      await prisma.$disconnect(); 
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
