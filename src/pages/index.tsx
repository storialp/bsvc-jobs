import Head from "next/head";
import Link from "next/link";
import JobsList from "~/components/JobList";
import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";

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
      <JobsList />
    </>
  );
}
