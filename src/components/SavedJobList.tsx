import { useUser } from "@clerk/nextjs";
import { BookmarkIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";

// TODO: abstract later so you can reuse the JobList component. Serialization maybe?

export default function SavedJobList() {
  const ctx = api.useContext();
  const { isSignedIn } = useUser();
  const { data: jobData } = api.job.getSaved.useQuery();
  const { mutate } = api.job.toggleSavedJob.useMutation({
    onSuccess: () => {
      void ctx.job.getSaved.invalidate();
    },
    onError: (e) => {
      console.error(e);
    },
  });
  if (!jobData) return null;
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {jobData.map((job) => (
        <li
          key={job.job.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className="flex-col text-sm font-medium leading-6 text-gray-900">
              <img
                src={job.job.imageUrl}
                alt={`${job.job.companyName} logo`}
                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              {job.job.companyName}
            </div>
            <div className="text-md mx-auto font-medium leading-6 text-gray-900">
              {job.job.title}
              <p className=" text-sm text-gray-600">{job.job.function}</p>
            </div>
            <div className="relative ml-auto">
              <button
                onClick={() => {
                  mutate({ jobId: job.job.id });
                }}
              >
                <BookmarkIcon
                  className="h-5 w-5 text-gray-700 hover:text-gray-500"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-600">Location</dt>
              <dd className="text-gray-700">{`${job.job.city}, ${job.job.country}`}</dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-600">Schedule</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">
                  {job.job.schedule}
                </div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="flex items-center text-gray-600 underline hover:text-gray-500">
                <a href={job.job.link}>View in their website</a>
                <a href={job.job.link} className="content-center text-center">
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
