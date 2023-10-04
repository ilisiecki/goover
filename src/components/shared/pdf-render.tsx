"use client"

import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import {Document, Page, pdfjs} from "react-pdf"
import { toast } from "sonner";
import {useResizeDetector} from "react-resize-detector"

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from "@/components/ui/button";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export function PdfRender({url}: {
  url: string
}) {
  const {width, ref} = useResizeDetector()
  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <Button variant={"ghost"} aria-label="previous page">
            <ChevronDownIcon className="h-4 w-4" />
            </Button>
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
        <Document loading={
          <div className="flex justify-center">
            <Loader2Icon className="my-24 h-6 w-6 animate-spin stroke-primary" />
          </div>
        } 
        onLoadError={() => {
          toast.error('Error loading PDF', {
            description: "Please try again"
          })
        }} file={url} className="max-h-full">
          <Page width={width ? width : 1} pageNumber={1} />
        </Document>
        </div>
        </div>
    </div>
  );
}
