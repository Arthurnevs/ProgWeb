/*
  Warnings:

  - Added the required column `dataConsulta` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consulta" ADD COLUMN     "dataConsulta" TIMESTAMP(3) NOT NULL;
