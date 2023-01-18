import { router } from "../lib/trpc";
import userRouter from "./userRouter";
import venueRouter from "./venueRouter";

export const appRouter = router({
  user: userRouter,
  venue: venueRouter,
});

export type AppRouter = typeof appRouter;
