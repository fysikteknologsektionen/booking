import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "@/server/routers/_app";

export default createTRPCNext<AppRouter>({
  config: () => ({ links: [] }),
});
