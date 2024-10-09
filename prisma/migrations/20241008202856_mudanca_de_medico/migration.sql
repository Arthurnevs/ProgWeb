/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Medico` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Medico" ALTER COLUMN "password" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Medico_password_key" ON "Medico"("password");
