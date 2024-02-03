/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `canDrive` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commitmentLevel` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownVehicle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residentialStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ResidentialStatusType" AS ENUM ('SingaporeCitizen', 'SingaporePR');

-- CreateEnum
CREATE TYPE "CommitmentLevelType" AS ENUM ('AdHoc', 'Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "Skills" AS ENUM ('OnGroundVolunteering', 'Photography', 'Videography', 'ArtsAndCraft', 'PerformingSkills', 'Sports', 'Teaching', 'Leadership', 'DigitalMarketing');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Volunteering', 'Training', 'Workshop');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canDrive" BOOLEAN NOT NULL,
ADD COLUMN     "commitmentLevel" "CommitmentLevelType" NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" "GenderType" NOT NULL,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "ownVehicle" BOOLEAN NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "residentialStatus" "ResidentialStatusType" NOT NULL,
ADD COLUMN     "skills" "Skills"[],
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "skills" "Skills"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
