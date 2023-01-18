import authOptions from "./authOptions";
import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";

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
