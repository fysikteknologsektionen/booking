import { adminProcedure, publicProcedure, router } from "../lib/trpc";
import { z } from "zod";
import prisma from "../lib/prisma";

export default router({
  /**
   * Lists existing users.
   */
  list: adminProcedure.query(() => prisma.user.findMany()),

  /**
   * Gets an existing user.
   */
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input }) =>
      prisma.user.findUniqueOrThrow({ where: { id: input.id } })
    ),
});
