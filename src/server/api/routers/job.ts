import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany({
      include: {
        savedJob: !ctx?.userId
          ? undefined
          : {
              where: {
                userId: ctx.userId,
              },
            },
      },
    });
  }),

  toggleSavedJob: privateProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const data = { userId: userId, jobId: input.jobId };

      const existingSave = await ctx.prisma.savedJob.findUnique({
        where: { userId_jobId: data },
      });

      if (existingSave == null) {
        await ctx.prisma.savedJob.create({ data });
        return { saved: true };
      } else {
        await ctx.prisma.savedJob.delete({
          where: {
            userId_jobId: data,
          },
        });
        return { saved: false };
      }
    }),
});
