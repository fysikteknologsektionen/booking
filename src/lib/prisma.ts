import { PrismaClient } from "@prisma/client";
import env from "utils/env";

declare let global: { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (env.NODE_ENV === "production") {
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
