import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const savedJobRouter = createTRPCRouter({
  getSavedWithoutJob: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.savedJob.findMany({
      select: {
        jobId: true,
      },
      where: {
        userId: ctx.userId,
      },
    });
  }),
});
