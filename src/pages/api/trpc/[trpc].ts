import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "@/server/lib/trpc";
import { appRouter } from "@/server/routers/_app";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
