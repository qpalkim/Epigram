"use client";
import { useEffect, useState } from "react";
import { useEpigramList } from "@/lib/hooks/useEpigrams";
import EpigramItem from "@/components/EpigramItem";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";
import sort from "@/assets/icons/sort.svg";
import dashboard from "@/assets/icons/dashboard.svg";

export default function FeedsContainer() {
  const [limit, setLimit] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGridTwo, setIsGridTwo] = useState(false);
  const { data, isLoading, isError, refetch } = useEpigramList({
    limit: limit,
  });

  useEffect(() => {
    setIsLoaded(false);
  }, [data?.list?.length]);

  const handleLoadMore = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      !isLoaded &&
      (data?.list?.length ?? 0) < (data?.totalCount ?? Infinity)
    ) {
      setLimit((prevLimit) => prevLimit + 6);
      setIsLoaded(true);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <>
      <div className="flex justify-between items-start">
        <h2 className="text-black-600 font-semibold text-lg lg:text-xl mb-6 lg:mb-10">
          피드
        </h2>
        <Image
          src={isGridTwo ? sort : dashboard}
          alt="2열로 보기"
          width={28}
          height={24}
          className="md:hidden cursor-pointer"
          onClick={() => setIsGridTwo((prev) => !prev)}
        />
      </div>
      <div
        className={`grid md:grid-cols-2 gap-4 md:gap-8 w-full h-full ${
          isGridTwo ? "grid-cols-2" : "grid-cols-1 gap-6"
        }`}
      >
        {data?.list.map((epigram) => (
          <div key={epigram.id}>
            <EpigramItem
              id={epigram.id}
              content={epigram.content}
              author={epigram.author}
              tags={epigram.tags}
              isFeedPage
            />
          </div>
        ))}
      </div>

      {(data?.list?.length ?? 0) < (data?.totalCount ?? Infinity) && (
        <Button
          variant="outline"
          size="xl"
          isRoundedFull
          className="mx-auto mt-14 lg:mt-20 w-[152px] lg:w-[240px]"
          onClick={handleLoadMore}
        >
          <Image
            src={plus}
            alt="더보기 아이콘"
            className="lg:mr-2 w-[20px] lg:w-[24px]"
          />
          에피그램 더보기
        </Button>
      )}
    </>
  );
}
