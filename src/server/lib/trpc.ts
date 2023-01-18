import authOptions from "./authOptions";
import { initTRPC, TRPCError } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { Role } from "@prisma/client";

export async function createContext(opts: CreateNextContextOptions) {
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions
  );
  return {
    session,
  };
}

const t = initTRPC.context<typeof createContext>().create();

export const { router, procedure: publicProcedure } = t;

const requireRole = (role: Role) =>
  t.middleware(({ next, ctx }) => {
    if (!ctx.session || ctx.session.user.role < role) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({
      ctx: {
        session: ctx.session,
      },
    });
  });

export const managerProcedure = publicProcedure.use(requireRole("MANAGER"));
export const adminProcedure = publicProcedure.use(requireRole("ADMIN"));
