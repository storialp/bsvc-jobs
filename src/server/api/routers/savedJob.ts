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

  checkIfJobSaved: privateProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const data = { userId: userId, jobId: input.jobId };
      const existingSave = await ctx.prisma.savedJob.findUnique({
        where: { userId_jobId: data },
      });
      if (existingSave) {
        return { saved: true };
      } else {
        return { saved: false };
      }
    }),
});
