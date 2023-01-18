import prisma from "@/lib/prisma";
import { adminProcedure, publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export default router({
  list: adminProcedure.query(() => prisma.user.findMany()),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input }) =>
      prisma.user.findUniqueOrThrow({ where: { id: input.id } })
    ),
});
