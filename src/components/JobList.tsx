import { useUser } from "@clerk/nextjs";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";

export default function JobsList() {
  const ctx = api.useContext();
  const { isSignedIn } = useUser();
  const { data: jobData } = api.job.getAll.useQuery();
  // const { data: jobDataWithoutSaved } = api.job.getAll.useQuery(opts?: {enabled: false});
  const { mutate } = api.job.saveJob.useMutation({
    onSuccess: () => {
      void ctx.job.getAll.invalidate();
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
          key={job.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
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
              {isSignedIn ? (
                <button
                  onClick={() => {
                    mutate({ jobId: job.id });
                  }}
                >
                  {job?.savedJob[0] ? (
                    <BookmarkIcon
                      className="h-5 w-5 text-gray-700 hover:text-gray-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <BookmarkIcon
                      className="h-5 w-5 text-gray-400 hover:text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ) : (
                <button>
                  <BookmarkIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-600">Location</dt>
              <dd className="text-gray-700">{`${job.city}, ${job.country}`}</dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-600">Schedule</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{job.schedule}</div>
              </dd>
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
              <dt className="text-gray-600 hover:text-gray-500">
                <a href={job.link}>View in website</a>
              </dt>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
