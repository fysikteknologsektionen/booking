import { loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "server/routers/_app";
import env from "./env";

export default createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
      ],
    };
  },
});
