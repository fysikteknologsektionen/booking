import { loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "@/server/routers/_app";
import config from "./config";

export default createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            config.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
      ],
    };
  },
});
