import { getQueryClient, trpc } from "@/trcp/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Client from "./Client";
import { QUERY_KEYS } from "@/utils/query-constants";
import { error } from "console";

interface PageProps {
  searchParams?: { text?: string };
}

const page = async ({ searchParams }: PageProps) => {
  const queryClient = getQueryClient();
  const queryParams = QUERY_KEYS.hello(searchParams?.text ?? "Query Hello12");

  try {
    void queryClient.prefetchQuery(trpc.hello.queryOptions(queryParams));
  } catch {
    console.error("Prefetched failed: ", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Client initialParams={queryParams} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
