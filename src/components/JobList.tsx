import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import SaveJob from "./SaveJob";

type AllJobOutput = RouterOutputs["job"]["getAll"];

export default function JobList(props: { jobData: AllJobOutput }) {
  const { jobData } = props;
  if (!jobData) return null;
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {jobData.map((job) => (
        <li
          key={job.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <Link href={`/job/${job.id}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="flex-col text-sm font-medium leading-6 text-gray-900">
                <img
                  src={job.imageUrl}
                  alt={`${job.companyName} logo`}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                {job.companyName}
              </div>
              <div className="text-md mx-auto font-medium leading-6 text-gray-900">
                {job.title}
                <p className=" text-sm text-gray-600">{job.function}</p>
              </div>
              <div className="relative ml-auto">
                <SaveJob jobId={job.id} />
              </div>
            </div>
          </Link>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <Link href={`/job/${job.id}`}>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-600">Location</dt>
                <dd className="text-gray-700">{`${job.city}, ${job.country}`}</dd>
              </div>
            </Link>
            <div>
              <Link href={`/job/${job.id}`}>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-600">Schedule</dt>
                  <dd className="text-gray-700">{job.schedule}</dd>
                </div>
              </Link>
            </div>

            {/* <div className="justify-between gap-x-4 py-3">
              <dt className=" text-gray-600">Job Description</dt>
              <dd className=" items-start gap-x-2">
                <ul className="list-disc text-gray-700">
                  {job.description.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
              </dd>
            </div> */}
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="flex items-center text-gray-600 underline hover:text-gray-500">
                <a href={job.link} target="_blank">
                  View in their website
                </a>
                <a
                  href={job.link}
                  target="_blank"
                  className="content-center text-center"
                >
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </dt>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
