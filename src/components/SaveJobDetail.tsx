import { useUser } from "@clerk/nextjs";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";

interface SaveJobProps {
  jobId: string;
}

export default function SaveJobDetails({ jobId }: SaveJobProps) {
  const ctx = api.useContext();
  const { data: saved } = api.savedJob.checkIfJobSaved.useQuery({ jobId });
  const { isSignedIn } = useUser();
  const { mutate } = api.job.toggleSavedJob.useMutation({
    onSuccess: () => {
      void ctx.savedJob.checkIfJobSaved.invalidate();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <>
      {isSignedIn ? (
        <button
          onClick={() => {
            mutate({ jobId: jobId });
          }}
        >
          {saved ? (
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
    </>
  );
}
