/*
  Warnings:

  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `rent` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RentalRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "rent" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "RentalRequest" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "role" SET DEFAULT 'TENANT';

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_categoryId_idx" ON "Property"("categoryId");

-- CreateIndex
CREATE INDEX "Property_landlordId_idx" ON "Property"("landlordId");
