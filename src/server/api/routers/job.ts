import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany({
      include: {
        savedJob: !ctx?.userId ? undefined : {
          where: {
            userId: ctx.userId,
          },
        },
      },
    });
  }),

  saveJob: privateProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const saved = await ctx.prisma.savedJob.create({
        data: {
          userId,
          jobId: input.jobId,
        },
      });
      return saved;
    }),
});
