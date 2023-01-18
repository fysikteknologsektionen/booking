import prisma from "@/lib/prisma";
import { adminProcedure, publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

const venueBodyValidator = {
  name: z.string(),
  description: z.string().nullable(),
  managers: z.array(z.number().int()),
};

export default router({
  create: adminProcedure
    .input(z.object(venueBodyValidator))
    .query(({ input }) => {
      prisma.venue.create({
        data: {
          name: input.name,
          description: input.description,
          managers: { create: input.managers.map((id) => ({ userId: id })) },
        },
      });
    }),
  list: publicProcedure.query(() => prisma.venue.findMany()),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input }) =>
      prisma.venue.findUniqueOrThrow({ where: { id: input.id } })
    ),
  update: adminProcedure
    .input(
      z.object({
        ...venueBodyValidator,
        id: z.number().int(),
      })
    )
    .query(async ({ input }) => {
      const venue = await prisma.venue.findUniqueOrThrow({
        where: { id: input.id },
        include: { managers: true },
      });
      const oldManagerIds = venue.managers.map((manager) => manager.userId);
      return prisma.venue.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          managers: {
            connect: input.managers
              .filter((id) => !oldManagerIds.includes(id))
              .map((id) => ({
                userId_venueId: { userId: id, venueId: input.id },
              })),
            disconnect: oldManagerIds
              .filter((id) => !input.managers.includes(id))
              .map((id) => ({
                userId_venueId: { userId: id, venueId: input.id },
              })),
          },
        },
      });
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
      })
    )
    .query(({ input }) => prisma.venue.delete({ where: { id: input.id } })),
});
