"use client";

import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";

import {
  GhostIcon,
  Loader2Icon,
  MessageSquareIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import { UploadButton } from "@/components/shared/upload-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Dashboard() {
  const [deletingFie, setDeletetingFile] = useState<string | null>();

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setDeletetingFile(id);
    },
    onSettled: () => {
      setDeletetingFile(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-2 md:px-20">
      <div className="flex flex-row items-center justify-between border-b border-neutral-200 pb-5 pt-8">
        <h1 className="mb-3 text-4xl font-bold text-neutral-900">My Files</h1>
        <UploadButton />
      </div>

      {/* display user files */}
      {files && files?.length !== 0 ? (
        <ul className="grid-col-1 grid gap-6 divide-y divide-neutral-200 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-neutral-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    {format(new Date(file.createdAt), "MMM yyyy")}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquareIcon className="h-4 w-4" />
                    mocked
                  </div>

                  <Button
                    size="sm"
                    variant={"destructive"}
                    onClick={() => {
                      deleteFile({ id: file.id });
                    }}
                    className="w-full"
                  >
                    {deletingFie === file.id ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <TrashIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="mt-2" count={3} />
      ) : (
        <div className="flex flex-col items-center gap-2 pt-16">
          <GhostIcon className="h-8 w-8 text-neutral-800" />
          <h3 className="text-xl font-semibold">Pretty empty around here</h3>
          <p>Just upload your first PDF.</p>
        </div>
      )}
    </main>
  );
}
