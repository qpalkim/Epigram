"use client";
import { useState } from "react";
import {
  useEpigramDetail,
  useEpigramCommentList,
} from "@/lib/hooks/useEpigrams";
import { useMyData } from "@/lib/hooks/useUsers";
import EpigramDetail from "./EpigramDetail";
import EpigramComments from "./EpigramComments";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";

export default function EpigramContainer({ id }: { id: number }) {
  const [limit, setLimit] = useState(3);
  const {
    data: comments,
    isLoading: commentLoading,
    isError: commentError,
  } = useEpigramCommentList(id, {
    limit: limit,
  });
  const {
    data: epigramDetail,
    isLoading: epigramDetailLoading,
    isError: epigramError,
    refetch,
  } = useEpigramDetail(id);
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useMyData();

  if (epigramDetailLoading || commentLoading || userLoading)
    return <LoadingSpinner />;
  if (!epigramDetail || !comments) return null;
  if (epigramError || commentError || userError)
    return <RetryError onRetry={refetch} />;

  return (
    <>
      <EpigramDetail epigramDetail={epigramDetail} user={user} />
      <EpigramComments
        id={id}
        comments={comments}
        user={user}
        setLimit={setLimit}
      />
    </>
  );
}
