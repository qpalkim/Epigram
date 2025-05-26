"use client";
import { EpigramListResponse } from "@/lib/types/epigrams";
import Button from "@/components/Button";
import EpigramItem from "@/components/EpigramItem";
import Empty from "@/components/Empty";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default function MyEpigram({
  data,
  handleLoadMore,
}: {
  data: EpigramListResponse;
  handleLoadMore: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      {data?.list.length === 0 && <Empty myEpigram />}

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

      {(data?.list?.length ?? 0) < (data?.totalCount ?? 0) && (
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
      )}
    </>
  );
}
