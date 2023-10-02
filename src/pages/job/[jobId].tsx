import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import JobCard from "~/components/JobCard";
import Navbar from "~/components/Navbar";
import { generateSSGHelper } from "~/server/helpers/serverHelper";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { api } from "~/utils/api";
import { createInnerTRPCContext } from "~/server/api/trpc";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { jobId } = props;
  const { isSignedIn } = useUser();
  const { data: job } = api.job.getJobDetails.useQuery(
    { jobId },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  if (!job) return null;
  return (
    <>
      <Head>
        <title>BSVC Jobs</title>
        <meta
          name="description"
          content="The Bocconi Students for Venture Capital job board"
        />
      </Head>
      <Navbar path="/job" isSignedIn={isSignedIn} />
      <JobCard jobId={jobId} job={job} />
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ jobId: string }>,
) {
  const ssg = generateSSGHelper();
  const jobId = context.params?.jobId;
  if (!jobId) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  await ssg.job.getJobDetails.prefetch({ jobId });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      jobId,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ctx = createInnerTRPCContext({ userId: null, revalidateSSG: null });
  const jobs = await ctx.prisma.job.findMany({ select: { id: true } });
  return {
    paths: jobs.map((job) => ({
      params: {
        jobId: job.id,
      },
    })),
    fallback: "blocking",
  };
};
