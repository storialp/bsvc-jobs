import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany({
      select: {
        id: true,
        companyName: true,
        link: true,
        imageUrl: true,
        title: true,
        function: true,
        schedule: true,
        city: true,
        country: true,
      },
    });
  }),

  getAllWithSaved: privateProcedure.query(({ctx}) => {
    return ctx.prisma.job.findMany({
      include: {
        savedJob: {
        where: {
          userId: ctx.userId
        }
        }
      }
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
