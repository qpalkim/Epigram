"use client";
import { useEpigramToday } from "@/lib/hooks/useEpigrams";
import EpigramItem from "@/components/EpigramItem";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function TodayEpigram() {
  const { data, isLoading, isError } = useEpigramToday();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>에러가 발생했습니다...</p>;

  return (
    <>
      {!data ? (
        <p className="text-blue-400 text-center">오늘의 에피그램이 없습니다.</p>
      ) : (
        <EpigramItem
          content={data.content}
          author={data.author}
          tags={data.tags}
          id={data.id}
        />
      )}
    </>
  );
}
