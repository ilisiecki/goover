"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";
import { useForm } from "react-hook-form";
import SimpleBar from "simplebar-react";

import { cn } from "@/lib/utils";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  SearchIcon,
  RotateCwIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PdfFullScreen } from "@/components/shared/pdf-full-screen";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfRender({ url }: { url: string }) {
  const [numberOfPages, setNumberOfPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const { width, ref } = useResizeDetector();

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numberOfPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currentPage - 1));
            }}
            variant={"ghost"}
            aria-label="previous page"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "h-8 w-12",
                errors.page && "focus-visible:ring-red-500",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="space-x-1 text-sm text-neutral-700">
              <span>/</span>
              <span>{numberOfPages ?? "x"}</span>
            </p>
          </div>
          <Button
            disabled={
              numberOfPages === undefined || currentPage === numberOfPages
            }
            onClick={() => {
              setCurrentPage((prev) =>
                prev + 1 > numberOfPages! ? numberOfPages! : prev + 1,
              );
              setValue("page", String(currentPage + 1));
            }}
            variant={"ghost"}
            aria-label="next page"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                <SearchIcon className="h-4 w-4" />
                {scale * 100}%
                <ChevronDownIcon className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 deg"
          >
            <RotateCwIcon className="h-4 w-4"></RotateCwIcon>
          </Button>
          <PdfFullScreen fileUrl={url} />
        </div>
      </div>
      <div className="max-h-screen w-full flex-1">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2Icon className="my-24 h-6 w-6 animate-spin stroke-primary" />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}
              onLoadError={() => {
                toast.error("Error loading PDF", {
                  description: "Please try again",
                });
              }}
              file={url}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center">
                    <Loader2Icon className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => {
                  setRenderedScale(scale);
                }}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
