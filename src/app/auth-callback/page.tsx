"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2Icon } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data } = trpc.test.useQuery();

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ succuess }) => {
      if (succuess) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="h-8 w-8 animate-spin text-neutral-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
