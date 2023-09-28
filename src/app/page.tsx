import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center pb-12 pt-28 text-center sm:pt-40">
      <div className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-7 py-2.5 shadow-md backdrop-blur transition-all hover:border-neutral-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-neutral-700">
          Goover pdf is now public!
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
