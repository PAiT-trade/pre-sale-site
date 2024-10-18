import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export const cleanupDatabase = async () => {
  await prisma.user.deleteMany();
  await prisma.purchase.deleteMany();
};

cleanupDatabase()
  .then(() => {
    console.log("Database cleaned up");
  })
  .catch(() => {
    console.error("Error cleaning up database");
  });
