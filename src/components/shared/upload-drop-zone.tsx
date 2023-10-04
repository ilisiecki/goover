import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";
import { FileIcon, FileUpIcon, Loader2Icon } from "lucide-react";

import { useUploadThing } from "@/lib/uploadthing";
import { trpc } from "@/app/_trpc/client";

export function UploadDropZone() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  })

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        const res = await startUpload(acceptedFiles);

        if (!res) {
          return toast.error("Something went wrong while uploading", {
            description: "Please try again",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast.error("Something went wrong while uploading", {
            description: "Please try again",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });
      }}
    >
      {({ getRootProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border-4 border-dashed border-neutral-200"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-neutral-50 pb-4 hover:bg-neutral-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <FileUpIcon className="h-10 w-10 text-neutral-400 " />
                <p className="pt-2 text-neutral-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop here
                </p>
                <p className="text-xs text-neutral-400">PDF file (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center justify-center divide-x divide-neutral-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-neutral-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto w-full max-w-xs pt-4">
                  <Progress
                  indicatorColor={
                    uploadProgress === 100 ? "bg-green-500" : "" 
                  }
                    value={uploadProgress}
                    className="h-2 w-full bg-neutral-200"
                  />
                  {uploadProgress === 100 ? (<div className="flex gap-1 items-center justify-center text-sm text-neutral-700 text-center pt-2">
                    <Loader2Icon className="h-3 w-3 animate-spin" />
                    Redirecting...
                  </div>) : null}
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
