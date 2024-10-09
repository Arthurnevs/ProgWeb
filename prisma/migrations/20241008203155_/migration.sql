/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Medico` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Medico_password_key";

-- AlterTable
ALTER TABLE "Medico" ALTER COLUMN "document" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Medico_document_key" ON "Medico"("document");
