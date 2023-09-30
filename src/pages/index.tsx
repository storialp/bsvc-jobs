import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import JobList from "~/components/JobList";
import Navbar from "~/components/Navbar";
import { generateSSGHelper } from "~/server/helpers/serverHelper";
import { InferGetStaticPropsType } from "next";
import { RouterOutputs, api } from "~/utils/api";

type AllJobOutput = RouterOutputs["job"]["getAll"];

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { isSignedIn } = useUser();
  const { data: jobData } = api.job.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (!jobData) return null;
  return (
    <>
      <Head>
        <title>BSVC Jobs</title>
        <meta
          name="description"
          content="The Bocconi Students for Venture Capital job board"
        />
      </Head>
      <Navbar path="/" isSignedIn={isSignedIn} />
      <div className="px-6 font-medium">
        <h1 className="ml-3 mt-5 text-2xl  text-gray-800">Jobs</h1>
        <div className="mx-auto h-auto w-full rounded-lg border-2 px-3 py-3 shadow-md">
          <JobList jobData={jobData} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const ssg = generateSSGHelper();
  await ssg.job.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
