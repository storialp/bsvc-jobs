import Head from "next/head";
import JobsList from "~/components/JobList";
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
      <Navbar />
      <div className="px-6 font-medium">
        <h1 className="ml-3 mt-5 text-2xl  text-gray-800">Jobs</h1>
        <div className="mx-auto h-auto w-full rounded-lg border-2 px-3 py-3 shadow-md">
          <JobsList />
        </div>
      </div>
    </>
  );
}
