import { api } from "~/utils/api";

export default function JobDetails() {
  const { data: jobData } = api.job.getJobDetails.useQuery({
    jobId: "clmdm5r5x0000cl84nzb1iv2w",
  });
  if (!jobData) return null;
  return (
    <>
      <div className="mx-auto h-full  w-3/4 gap-x-4 rounded-lg border border-gray-200 bg-red-200 text-gray-700">
        <div className="flex gap-x-4">
          <div>
            <img src={jobData?.imageUrl} className="h-auto w-20" />
          </div>
          <div className="flex-row">
            <div>{jobData?.title}</div>
            <div>{jobData?.function}</div>
            <div>{`${jobData?.city}, ${jobData?.country}`}</div>
          </div>
        </div>
        <div>
          <h1 className="text-lg text-gray-800">Job Description</h1>
          <ul role="list" className="list-inside list-disc">
            {jobData?.description?.map((jobDescription) => (
              <li key={jobDescription?.id}>{jobDescription?.content}</li>
            ))}
          </ul>
        </div>
        <div className="py-3">
          <h1 className="text-lg text-gray-800">Job Description</h1>
          <ul role="list" className="list-inside list-disc">
            {jobData?.qualification?.map((jobQualification) => (
              <li key={jobQualification?.id}>{jobQualification?.content}</li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <button className="rounded-full bg-yellow-500 px-2 py-2 ">
            Request intro
          </button>
        </div>
      </div>
    </>
  );
}
