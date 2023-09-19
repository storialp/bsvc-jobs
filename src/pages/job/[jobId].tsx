import Head from "next/head";
import JobDetails from "~/components/JobDetails";
import Navbar from "~/components/Navbar";

export default function Home() {
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
      <JobDetails />
    </>
  );
}
