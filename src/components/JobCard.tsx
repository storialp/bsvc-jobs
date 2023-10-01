import { RouterOutputs, api } from "~/utils/api";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import SaveJobDetails from "./SaveJobDetail";

type JobDetailOutput = RouterOutputs["job"]["getJobDetails"];

interface JobCardProps {
  jobId: string;
  job: JobDetailOutput;
}

export default function JobCard({ jobId, job }: JobCardProps) {
  const ctx = api.useContext();
  const { mutate: mutation } = api.introduction.createIntro.useMutation({
    onSuccess: () => {
      void ctx.job.getJobDetails.invalidate();
    },
    onError: (e) => {
      console.error(e);
    },
  });
  if (!job) return null;
  return (
    <div className="mx-auto mt-5 w-5/6 overflow-hidden rounded-xl border border-gray-200 shadow-sm md:w-3/4 lg:w-1/2">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex-col text-sm font-medium leading-6 text-gray-900">
          <img
            src={job.imageUrl}
            alt={`${job.companyName} logo`}
            className="h-16 w-16 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          {job.companyName}
        </div>
        <div className="text-md mx-auto font-medium leading-6 text-gray-900">
          {job.title}
          <p className=" text-sm text-gray-600">{job.function}</p>
        </div>
        <div className="relative ml-auto">
          <SaveJobDetails jobId={jobId} />
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-600">Location</dt>
          <dd className="font-medium text-gray-900">{`${job.city}, ${job.country}`}</dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-600">Schedule</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">{job.schedule}</div>
          </dd>
        </div>
        {job.description[0] && (
          <div className="justify-between gap-x-4 py-3">
            <dt className=" text-gray-600">Job Description</dt>
            <dd className=" items-start gap-x-2">
              <ul className="list-inside list-disc font-[450] text-gray-700">
                {job.description.map((description) => (
                  <li key={description.id}>{description.content}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        {job.qualification[0] && (
          <div className="justify-between gap-x-4 py-3">
            <dt className=" text-gray-600">Job Qualifications</dt>
            <dd className=" items-start gap-x-2">
              <ul className="list-inside list-disc font-[450] text-gray-700">
                {job.qualification.map((qualification) => (
                  <li key={qualification.id}>{qualification.content}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="flex items-center text-gray-600 underline hover:text-gray-500">
            <a href={job.link}>View in their website</a>
            <a href={job.link} className="content-center text-center">
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </dt>
        </div>
      </dl>
      <div className="py-3 text-center">
        <button
          className="text-md rounded-full bg-yellow-400 px-2 py-2 font-semibold text-gray-700"
          onClick={() => mutation({ jobId: job.id })}
        >
          Request intro
        </button>
      </div>
    </div>
  );
}
