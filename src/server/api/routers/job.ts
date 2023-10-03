import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany({});
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

  getSaved: privateProcedure.query(({ ctx }) => {
    const userId = ctx.userId;
    return ctx.prisma.savedJob.findMany({
      where: {
        userId: userId,
      },
      include: {
        job: true,
      },
    });
  }),

  getSavedIds: privateProcedure.query(({ ctx }) => {
    const userId = ctx.userId;
    return ctx.prisma.savedJob.findMany({
      select: { jobId: true },
      where: { userId: userId },
    });
  }),

  getJobDetails: publicProcedure
    .input(
      z.object({
        jobId: z.string().min(8).max(100),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.job.findUnique({
        where: {
          id: input.jobId,
        },
        include: {
          qualification: true,
          description: true,
        },
      });
    }),

  createJob: privateProcedure
    .input(
      z.object({
        title: z.string().min(4).max(75),
        companyName: z.string().min(1).max(150),
        city: z.string().min(1).max(30),
        country: z.string().min(1).max(30),
        function: z.string().min(1).max(75),
        schedule: z.string().min(1).max(40),
        imageUrl: z.string().min(1).max(200),
        link: z.string().min(1).max(200),
        descriptionContent: z.string().array().min(0).max(10),
        qualificationContent: z.string().array().min(0).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      if (userId !== "user_2Uu9aGWBSR23pFvjxqDObRHihhn")
        return { unauthorized: true };
      const descriptionArray: { content: string }[] = [];
      const qualificationArray: { content: string }[] = [];
      if (input.descriptionContent.length > 0) {
        input.descriptionContent.forEach((description) => {
          descriptionArray.push({ content: description });
        });
      }
      if (input.qualificationContent.length > 0) {
        input.descriptionContent.forEach((qualification) => {
          qualificationArray.push({ content: qualification });
        });
      }

      const job = {
        title: input.title,
        companyName: input.companyName,
        city: input.city,
        country: input.country,
        function: input.function,
        schedule: input.schedule,
        imageUrl: input.imageUrl,
        link: input.link,
        description: {
          create: descriptionArray,
        },
        qualification: {
          create: qualificationArray,
        },
      };
      await ctx.prisma.job.create({ data: job });
      return { jobCreated: true };
    }),
});
