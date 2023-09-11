import { BookmarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { api } from "~/utils/api";

const jobs = [
  {
    id: 1,
    companyName: "Earlybird",
    title: "Analyst Intern Digital West",
    function: "Internship",
    imageUrl:
      "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/emh0mv7ca0jllswzl9rm",
    country: "Germany",
    city: "Berlin",
    schedule: "Full-time",
    description: [
      "Working on deals with the Earlybird Investment team and taking responsibility for sourcing, initial deal assessments, preparing investment decisions and subsequent due diligences",
      "Developing your own industry expertise through deep dives, while providing the Investment team with extensive insights",
      "Actively expanding your network in the European venture capital ecosystem including startups, founders, investors, entrepreneurs and of course the companies that shape the world of tomorrow!",
      "Supporting the Earlybird Investment team in all aspects of creating value for our portfolio companies and investors",
    ],
    qualifications: [
      "Academic studies (completed Bachelor's degree & possibly a Master's degree or more!) with very strong grades in any direction",
      "Analytical rigor, business acumen, project management, relationship-building, and emotional intelligence skills",
      "Passion and interest for the European startup ecosystem and a growing understanding of the Venture Capital industry",
      "Curiosity, team-player, open-mindedness, global mindset, and networking skills",
      "The ability to work with us full-time for 3 months in one of our Earlybird offices",
    ],
    link: "https://earlybirdvc-gmbh.jobs.personio.de/job/499894?language=en&display=en",
  },
];

export default function JobsList() {
  const { data: jobData } = api.job.getAll.useQuery();
  const [selectedJob, setSelectedJob] = useState("");
  if (!jobData) return null;
  const { mutate, isLoading: isSaving} = api.job.saveJob.useMutation({
    onSuccess: () => {
      setSelectedJob("");
    },
    onError: (e) => {
      console.error(e)
    }
  })
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
              <button>
                <BookmarkIcon
                  className="h-5 w-5 text-gray-400 hover:text-gray-500"
                  aria-hidden="true"
                />
              </button>
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
