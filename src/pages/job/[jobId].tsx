import Head from "next/head";
import { useRouter } from "next/router";
import JobCard from "~/components/JobCard";
import Navbar from "~/components/Navbar";

export default function Home() {
  const router = useRouter();
  const jobId = router.query.jobId;
  if (jobId instanceof Array || !jobId) return null;
  return (
    <>
      <Head>
        <title>BSVC Jobs</title>
        <meta
          name="description"
          content="The Bocconi Students for Venture Capital job board"
        />
      </Head>
      <Navbar path="/job" />
      <JobCard jobId={jobId} />
    </>
  );
}
