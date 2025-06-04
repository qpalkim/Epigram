"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEpigramList } from "@/lib/hooks/useEpigrams";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";
import EpigramItem from "@/components/EpigramItem";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";

export default function LatestEpigram() {
  const [limit, setLimit] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, isLoading, isError, refetch } = useEpigramList({
    limit: limit,
  });

  const router = useRouter();

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      setLimit((prevLimit) => prevLimit + 3);
      setIsLoaded(true);
    } else {
      router.push("/feeds");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <>
      {data?.list.map((epigram) => (
        <div key={epigram.id} className="mb-4 lg:mb-8">
          <EpigramItem
            content={epigram.content}
            author={epigram.author}
            tags={epigram.tags}
            id={epigram.id}
          />
        </div>
      ))}

      <Button
        variant="outline"
        size="xl"
        isRoundedFull
        className="mx-auto mt-14 w-[152px] lg:w-[240px]"
        onClick={handleLoadMore}
      >
        <Image
          src={plus}
          alt="더보기 아이콘"
          className="lg:mr-2 w-[20px] lg:w-[24px]"
        />
        에피그램 더보기
      </Button>
    </>
  );
}
