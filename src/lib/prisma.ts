import { PrismaClient } from "@prisma/client";
import config from "./config";

declare let global: { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (config.NODE_ENV === "production") {
    return new PrismaClient();
  }
  // Cache client in dev to prevent exhausting connections
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  return global.prisma;
}

const prisma = getPrismaClient();
export default prisma;
