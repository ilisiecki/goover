import Balancer from "react-wrap-balancer";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center justify-center py-12 text-center sm:pt-24">
        <div className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-7 py-2.5 shadow-md backdrop-blur transition-all hover:border-neutral-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-neutral-700">
            Goover pdf is now public!
          </p>
        </div>
        <h1 className="max-w-4xl pt-4 text-5xl font-bold lg:text-7xl">
          <Balancer>
            <span className="text-purple-600">Go over</span> and chat with your{" "}
            <span className="text-purple-600">PDF documents</span>.
          </Balancer>
        </h1>
        <p className="max-w-prose py-5 text-neutral-700 sm:text-lg">
          <span className="text-purple-600">Goover</span> allows you to have
          conversations and analyse any PDF document. Simply upload your file
          and start asking questions.
        </p>
        <Link
          href="/dashboard"
          target="_blank"
          className={buttonVariants({ size: "lg" })}
        >
          <span className="pr-2">Get started</span>
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Gradient blob 1 */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-30 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-1rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-10rem)] sm:w-[72.1875rem] sm:opacity-30"
            />
          </div>

          {/* Image 1 */}
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flow-root pt-5 sm:pt-10">
              <div className="-p-2 lg:-p-4 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:rounded-2xl lg:p-4">
                <Image
                  src="/img/dashboard-preview.jpg"
                  alt="product preview"
                  width={1364}
                  height={866}
                  quality={100}
                  className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-neutral-900/10 sm:p-8"
                ></Image>
              </div>
            </div>
          </div>

          {/* Gradient blob 2 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-30 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+1rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%+10rem)] sm:w-[72.1875rem] sm:opacity-30"
            />
          </div>
        </div>
      </div>

      {/* After image section */}
      <div className="mx-auto max-w-5xl py-12 sm:pt-24">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
              Start chatting in minutes
            </h2>
            <p className="pt-2 text-lg text-neutral-600">
              Chatting to your PDF files has never been easier than with Gover.
            </p>
          </div>
        </div>

        {/* List */}
        <ol className="space-y-4 px-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-neutral-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-purple-600">
                Step 1
              </span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="text-neutral-700">
                Either start out with free plan or choose{" "}
                <Link
                  href="/pricing"
                  className="text-purple-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-neutral-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-purple-600">
                Step 2
              </span>
              <span className="text-xl font-semibold">
                Upload your PDF file
              </span>
              <span className="text-neutral-700">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-neutral-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-purple-600">
                Step 3
              </span>
              <span className="text-xl font-semibold">
                Start asking questions
              </span>
              <span className="text-neutral-700">
                It&apos;s that simlpe. Try out Goover today - it really takes
                less than a minute.
              </span>
            </div>
          </li>
        </ol>

        {/* Image 2 */}
        <div className="mx-auto max-w-6xl px-6 py-12 sm:pt-24 lg:px-8">
          <div className="flow-root pt-5 sm:pt-10">
            <div className="-p-2 lg:-p-4 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 lg:rounded-2xl lg:p-4">
              <Image
                src="/img/file-upload-preview.jpg"
                alt="upload file preview"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-neutral-900/10 sm:p-8"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
