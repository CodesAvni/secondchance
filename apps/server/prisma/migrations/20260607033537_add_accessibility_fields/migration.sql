-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "availability" TEXT,
ADD COLUMN     "captionRequirement" BOOLEAN DEFAULT false,
ADD COLUMN     "screenReaderSupport" BOOLEAN DEFAULT false;
