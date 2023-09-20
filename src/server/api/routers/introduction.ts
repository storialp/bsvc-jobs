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
});
