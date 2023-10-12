import { useUser } from "@clerk/nextjs";
import { makeAuthObjectSerializable } from "@clerk/nextjs/dist/types/server";
import Head from "next/head";
import { useState } from "react";
import JobList from "~/components/JobList";
import Navbar from "~/components/Navbar";
import { generateSSGHelper } from "~/server/helpers/serverHelper";
import { api } from "~/utils/api";

// This is meant for internal use and as such I won't bother much with styling

export default function Home() {
  const { isSignedIn } = useUser();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [schedule, setSchedule] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState<string[]>([]);
  const [qualification, setQualification] = useState<string[]>([]);
  const { mutate: mutation } = api.job.createJob.useMutation({
    onError: (e) => {
      console.error(e);
    },
  });
  const handleDescriptionChange = (i: number, e: string) => {
    const data = [...description];
    data[i] = e;
    setDescription(data);
  };

  const handleQualificationChange = (i: number, e: string) => {
    const data = [...qualification];
    data[i] = e;
    setDescription(data);
  };

  const addDescription = () => {
    setDescription([...description, ""]);
  };
  const addQualification = () => {
    setQualification([...qualification, ""]);
  };
  return (
    <>
      <Head>
        <title>BSVC Jobs</title>
        <meta
          name="description"
          content="The Bocconi Students for Venture Capital job board"
        />
      </Head>
      <Navbar path="/admin/save-job" isSignedIn={isSignedIn} />
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-xl font-bold">Save a Job Form</h1>
        <div className="mb-2 w-5/6 rounded-xl border border-gray-500 px-3 py-2">
          <form>
            <h1>Job title</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
            <h1>Company Name</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
            <h1>City</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <h1>Country</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
            <h1>Job Function</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setJobFunction(e.target.value)}
            ></input>
            <h1>Schedule</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setSchedule(e.target.value)}
            ></input>
            <h1>Image Url</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
            <h1>Link</h1>
            <input
              className="rounded-md border border-gray-500"
              onChange={(e) => setLink(e.target.value)}
            ></input>
            <h1>Description</h1>
            {description.map((d, i) => (
              <div key={i} className="py-1">
                <input
                  onChange={(e) => handleDescriptionChange(i, e.target.value)}
                  className="rounded-md border border-gray-500"
                  value={d}
                ></input>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md border border-gray-100 px-2 shadow"
              onClick={addDescription}
            >
              Add One
            </button>
            <h1>Qualification</h1>
            {qualification.map((d, i) => (
              <div key={i * 10 + 1} className="py-1">
                <input
                  className="rounded-md border border-gray-500"
                  onChange={(e) => handleQualificationChange(i, e.target.value)}
                  value={d}
                ></input>
              </div>
            ))}

            <button
              type="button"
              className="rounded-md border border-gray-100 px-2 shadow"
              onClick={addQualification}
            >
              Add One
            </button>
            <div className="flex w-full flex-col items-center gap-y-2">
              <button
                type="button"
                className="rounded-md border border-gray-100 bg-green-200 px-2 shadow"
                onClick={() => {
                  mutation({
                    title: jobTitle,
                    function: jobFunction,
                    city: city,
                    country: country,
                    companyName: companyName,
                    link: link,
                    schedule: schedule,
                    imageUrl: imageUrl,
                    descriptionContent: description,
                    qualificationContent: qualification,
                  });
                }}
              >
                Add One
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
