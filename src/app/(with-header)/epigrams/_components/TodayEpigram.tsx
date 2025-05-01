"use client";
import EpigramItem from "@/components/EpigramItem";
import { useEpigramToday } from "@/lib/hooks/useEpigram";

export default function TodayEpigram() {
  const { data, isLoading, isError } = useEpigramToday();

  return (
    <>
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mb-6 lg:mb-10">
        오늘의 에피그램
      </h2>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>에러가 발생했습니다.</p>
      ) : !data ? (
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
