import { Role } from "@prisma/client";
import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import getServerSession from "lib/getServerSession";

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res);
  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const { router } = t;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

const isManager = t.middleware(({ next, ctx }) => {
  if (!ctx.session || ctx.session.user.role < Role.MANAGER) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const managerProcedure = protectedProcedure.use(isManager);

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.session || ctx.session.user.role < Role.ADMIN) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const adminProcedure = protectedProcedure.use(isAdmin);
