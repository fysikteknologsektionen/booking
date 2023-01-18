import prisma from "../lib/prisma";
import { adminProcedure, publicProcedure, router } from "../lib/trpc";
import { z } from "zod";

const venueIdValidator = z.object({
  id: z.number().int(),
});

const venueBodyValidator = z.object({
  name: z.string(),
  description: z.string().nullable(),
  managers: z.array(z.number().int()),
});

const venueValidator = z.intersection(venueBodyValidator, venueIdValidator);

/**
 * Venue router
 */
export default router({
  /**
   * Creates a new venue.
   */
  create: adminProcedure.input(venueBodyValidator).query(({ input }) => {
    prisma.venue.create({
      data: {
        name: input.name,
        description: input.description,
        managers: { create: input.managers.map((id) => ({ userId: id })) },
      },
    });
  }),

  /**
   * Lists existing venues.
   */
  list: publicProcedure.query(() => prisma.venue.findMany()),

  /**
   * Gets an existing venue.
   */
  get: publicProcedure
    .input(venueIdValidator)
    .query(({ input }) =>
      prisma.venue.findUniqueOrThrow({ where: { id: input.id } })
    ),

  /**
   * Updates an existing venue.
   */
  update: adminProcedure.input(venueValidator).query(async ({ input }) => {
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
            .filter((id) => !oldManagerIds.includes(id)) // Get added managers
            .map((id) => ({
              userId_venueId: { userId: id, venueId: input.id },
            })),
          disconnect: oldManagerIds
            .filter((id) => !input.managers.includes(id)) // Get deleted managers
            .map((id) => ({
              userId_venueId: { userId: id, venueId: input.id },
            })),
        },
      },
    });
  }),

  /**
   * Delete an existing venue.
   */
  delete: adminProcedure
    .input(venueIdValidator)
    .query(({ input }) => prisma.venue.delete({ where: { id: input.id } })),
});
