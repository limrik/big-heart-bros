/*
  Warnings:

  - Added the required column `attended` to the `UsersInEvents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Interests" AS ENUM ('CommunityService', 'EnvironmentalProtection', 'HealthcareSupport', 'EducationSupport', 'YouthMentoring', 'ElderlySupport', 'ArtsAndCulture', 'SportsAndRecreation', 'TechnologyAssistance', 'FundraisingEvents', 'FoodBankAssistance', 'HomelessnessSupport');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ResidentialStatusType" ADD VALUE 'DP';
ALTER TYPE "ResidentialStatusType" ADD VALUE 'EP';
ALTER TYPE "ResidentialStatusType" ADD VALUE 'LTVP';
ALTER TYPE "ResidentialStatusType" ADD VALUE 'SP';
ALTER TYPE "ResidentialStatusType" ADD VALUE 'VV';

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "interests" "Interests"[] DEFAULT ARRAY[]::"Interests"[];

-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interests" "Interests"[] DEFAULT ARRAY[]::"Interests"[];

-- AlterTable
ALTER TABLE "UsersInEvents" ADD COLUMN     "attended" BOOLEAN NOT NULL;
