import { useUser } from "@clerk/nextjs";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";

interface SaveJobProps {
  jobId: string;
}

export default function SaveJob({ jobId }: SaveJobProps) {
  const ctx = api.useContext();
  const { data: savedIds } = api.job.getSavedIds.useQuery();
  const { isSignedIn } = useUser();
  const { mutate } = api.job.toggleSavedJob.useMutation({
    onSuccess: () => {
      void ctx.job.getSavedIds.invalidate();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <>
      {isSignedIn ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            mutate({ jobId: jobId });
          }}
        >
          {savedIds?.find((saved) => saved.jobId === jobId) ? (
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
        <button onClick={(e) => e.preventDefault()}>
          <BookmarkIcon
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
}
