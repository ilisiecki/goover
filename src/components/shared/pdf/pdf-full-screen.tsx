import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExpandIcon, Loader2Icon } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page } from "react-pdf";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";

export function PdfFullScreen({ fileUrl }: { fileUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState<number>();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button variant="ghost" aria-label="fullscreen pdf" className="gap-1.5">
          <ExpandIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-7xl">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] pt-6">
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
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numberOfPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
}
