/*
  Warnings:

  - A unique constraint covering the columns `[id_interno]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_interno]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "id_interno" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "id_interno" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_id_interno_key" ON "public"."products"("id_interno");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_interno_key" ON "public"."users"("id_interno");
