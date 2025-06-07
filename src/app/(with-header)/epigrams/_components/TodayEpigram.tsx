"use client";
import { AxiosError } from "axios";
import { useEpigramToday } from "@/lib/hooks/useEpigrams";
import EpigramItem from "@/components/EpigramItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";

export default function TodayEpigram() {
  const { data, isLoading, isError, error, refetch } = useEpigramToday();

  if (isLoading) return <LoadingSpinner />;

  const is500Error =
    error instanceof AxiosError && error.response?.status === 500;
  const showEmptyMessage = is500Error || !data;

  if (showEmptyMessage) {
    return (
      <p className="text-blue-400 text-center">오늘의 에피그램이 없습니다.</p>
    );
  }

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <EpigramItem
      content={data.content}
      author={data.author}
      tags={data.tags}
      id={data.id}
    />
  );
}
