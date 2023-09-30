import { jobRouter } from "~/server/api/routers/job";
import { createTRPCRouter } from "~/server/api/trpc";
import { introductionRouter } from "./routers/introduction";
import { savedJobRouter } from "./routers/savedJob";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  job: jobRouter,
  introduction: introductionRouter,
  savedJob: savedJobRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
