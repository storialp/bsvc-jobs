import { api } from "~/utils/api";

export default function JobDetails() {
  const { data: jobData } = api.job.getJobDetails.useQuery({
    jobId: "clmdm5r5x0000cl84nzb1iv2w",
  });
  return (
    <>
      <div>JobDetails</div>
      <h1>hello</h1>
    </>
  );
}
