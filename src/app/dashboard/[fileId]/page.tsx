import { ChatWrapper } from "@/components/shared/chat-wrapper";
import { PdfRender } from "@/components/shared/pdf-render";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function DashboardFieldIdPage({
  params,
}: {
  params: {
    fileId: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id)
    redirect(`/auth-callback?origin=dashboard/${params.fileId}`);

  const file = await db.file.findFirst({
    where: {
      id: params.fileId,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRender url={file.url}/>
          </div>
        </div>
        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
}
