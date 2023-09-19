import { UserButton } from "@clerk/nextjs";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BsvcLogo from "./BsvcLogo";

interface NavBarProps {
  path: string;
}

export default function Navbar({ path }: NavBarProps) {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center justify-center">
                  <Link href="/">
                    <BsvcLogo className="w-30 h-10" aria-hidden="true" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="/"
                    className={
                      path === "/"
                        ? "text-md inline-flex items-center border-b-2 border-yellow-500 px-1 pt-1 font-medium text-gray-900"
                        : "text-md inline-flex items-center border-b-2 border-transparent px-1 pt-1 font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    VC Jobs
                  </Link>
                  <Link
                    href="/saved"
                    className={
                      path === "/saved"
                        ? "text-md inline-flex items-center border-b-2 border-yellow-500 px-1 pt-1 font-medium text-gray-900"
                        : "text-md inline-flex items-center border-b-2 border-transparent px-1 pt-1 font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Saved Jobs
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="relative ml-3">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-yellow-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                VC Jobs
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/saved"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Saved Jobs
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
