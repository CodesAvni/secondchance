/*
  Warnings:

  - Changed the type of `experienceLevel` on the `UserSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- AlterTable
ALTER TABLE "public"."UserSkill" DROP COLUMN "experienceLevel",
ADD COLUMN     "experienceLevel" "public"."SkillLevel" NOT NULL;
