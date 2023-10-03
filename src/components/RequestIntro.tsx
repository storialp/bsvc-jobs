import { api } from "~/utils/api";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface RequestIntroProps {
  jobId: string;
}

export default function RequestIntro({ jobId }: RequestIntroProps) {
  const ctx = api.useContext();
  const { isSignedIn } = useUser();
  const { data: existingIntro } =
    api.introduction.checkIntroductionExists.useQuery({ jobId });
  const [successOpen, setSuccessOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const { mutate: mutation } = api.introduction.createIntro.useMutation({
    onSuccess: () => {
      void ctx.introduction.checkIntroductionExists.invalidate();
      void setSuccessOpen(true);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return (
    <>
      <div className="py-3 text-center">
        {!isSignedIn ? (
          <button
            className="text-md rounded-full bg-yellow-400 px-2 py-2 font-semibold text-gray-700"
            onClick={() => setSignInOpen(true)}
          >
            Request intro
          </button>
        ) : existingIntro?.activeIntro ? (
          <button className="text-md rounded-full bg-yellow-400 px-2 py-2 font-semibold text-gray-700">
            You already requested an Intro
          </button>
        ) : (
          <button
            className="text-md rounded-full bg-yellow-400 px-2 py-2 font-semibold text-gray-700"
            onClick={() => {
              mutation({ jobId: jobId });
            }}
          >
            Request intro
          </button>
        )}
      </div>
      <Transition.Root show={successOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setSuccessOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Intro Requested
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          We will update you on the status of your intro request
                          as soon as we can
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      onClick={() => setSuccessOpen(false)}
                    >
                      Go back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={signInOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setSignInOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full ">
                      <UserCircleIcon
                        className="h-24 w-24 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Sign In to Request Intros
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <Link
                      className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                      href="/sign-in"
                    >
                      Sign In
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
