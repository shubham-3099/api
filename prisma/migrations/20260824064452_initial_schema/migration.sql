-- CreateEnum
CREATE TYPE "VloggerStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vlogger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "status" "VloggerStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vlogger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VloggerPlatform" (
    "id" SERIAL NOT NULL,
    "vloggerId" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VloggerPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VloggerSubmission" (
    "id" SERIAL NOT NULL,
    "vloggerId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "dishName" TEXT NOT NULL,
    "title" TEXT,
    "thumbnailUrl" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VloggerSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionVideo" (
    "id" SERIAL NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VloggerReview" (
    "id" SERIAL NOT NULL,
    "dishId" INTEGER NOT NULL,
    "vloggerId" INTEGER NOT NULL,
    "title" TEXT,
    "thumbnailUrl" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VloggerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VloggerReviewVideo" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VloggerReviewVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReview" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vlogger_email_key" ON "Vlogger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VloggerPlatform_vloggerId_platform_key" ON "VloggerPlatform"("vloggerId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_restaurantId_name_key" ON "Dish"("restaurantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionVideo_submissionId_platform_key" ON "SubmissionVideo"("submissionId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "VloggerReviewVideo_reviewId_platform_key" ON "VloggerReviewVideo"("reviewId", "platform");

-- AddForeignKey
ALTER TABLE "VloggerPlatform" ADD CONSTRAINT "VloggerPlatform_vloggerId_fkey" FOREIGN KEY ("vloggerId") REFERENCES "Vlogger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VloggerSubmission" ADD CONSTRAINT "VloggerSubmission_vloggerId_fkey" FOREIGN KEY ("vloggerId") REFERENCES "Vlogger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VloggerSubmission" ADD CONSTRAINT "VloggerSubmission_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "VloggerPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionVideo" ADD CONSTRAINT "SubmissionVideo_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "VloggerSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VloggerReview" ADD CONSTRAINT "VloggerReview_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VloggerReview" ADD CONSTRAINT "VloggerReview_vloggerId_fkey" FOREIGN KEY ("vloggerId") REFERENCES "Vlogger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VloggerReviewVideo" ADD CONSTRAINT "VloggerReviewVideo_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "VloggerReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
