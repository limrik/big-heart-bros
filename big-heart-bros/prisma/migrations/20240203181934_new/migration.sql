-- CreateEnum
CREATE TYPE "Skills" AS ENUM ('OnGroundVolunteering', 'Photography', 'Videography', 'ArtsAndCraft', 'PerformingSkills', 'Sports', 'Teaching', 'Leadership', 'DigitalMarketing');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Volunteering', 'Training', 'Workshop');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" "GenderType" NOT NULL,
    "occupation" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "canDrive" BOOLEAN NOT NULL,
    "ownVehicle" BOOLEAN NOT NULL,
    "commitmentLevel" "CommitmentLevelType" NOT NULL,
    "skills" "Skills"[],
    "residentialStatus" "ResidentialStatusType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "type" "EventType" NOT NULL,
    "registrationDeadline" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "skills" "Skills"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
