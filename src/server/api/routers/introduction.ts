import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const introductionRouter = createTRPCRouter({
  createIntro: privateProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const data = { userId: userId, jobId: input.jobId };

      await ctx.prisma.introduction.create({ data });
      return { created: true };
    }),

  checkIntroductionExists: privateProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const data = { userId: userId, jobId: input.jobId };
      const existingIntro = await ctx.prisma.introduction.findUnique({
        where: { userId_jobId: data },
        select: { active: true },
      });
      if (existingIntro?.active) {
        return { activeIntro: true };
      } else {
        return { activeIntro: false };
      }
    }),
});
