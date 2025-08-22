"use client";
import { useTRPC } from "@/trcp/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

interface ClientProps {
  initialParams: { text: string };
}

const Client = ({ initialParams }: ClientProps) => {
  const trpc = useTRPC();
  const { data, error } = useSuspenseQuery(
    trpc.hello.queryOptions(initialParams)
  );

  if (error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Client;
