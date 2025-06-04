"use client";
import { useState } from "react";
import { useMyData, useUserCommentList } from "@/lib/hooks/useUsers";
import { useEpigramList } from "@/lib/hooks/useEpigrams";
import MyEpigram from "./MyEpigram";
import MyComment from "./MyComment";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";

export default function MyItems() {
  const [activeTab, setActiveTab] = useState<"epigram" | "comment">("epigram");
  const [limit, setLimit] = useState(3);
  const { data: user } = useMyData();
  const {
    data: myEpigram,
    isLoading: isLoadingEpigram,
    isError: isErrorEpigram,
    refetch,
  } = useEpigramList({
    limit: limit,
    writerId: user?.id,
  });
  const {
    data: myComment,
    isLoading: isLoadingComment,
    isError: isErrorComment,
  } = useUserCommentList(user?.id, {
    limit,
  });

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setLimit((prevLimit) => prevLimit + 3);
  };

  if (isLoadingEpigram || isLoadingComment) return <LoadingSpinner />;
  if (isErrorEpigram || isErrorComment) return <RetryError onRetry={refetch} />;
  if (!user || !myEpigram || !myComment)
    return <RetryError onRetry={refetch} />;

  return (
    <div className="max-w-[640px] w-full mx-auto px-6 md:px-0 mt-14">
      <div className="flex gap-4 mb-12">
        <button
          className={`font-semibold  text-lg lg:text-2lg cursor-pointer ${
            activeTab === "epigram" ? "text-black-600" : "text-gray-300"
          }`}
          onClick={() => setActiveTab("epigram")}
        >
          내 에피그램 ({myEpigram?.totalCount ?? 0})
        </button>

        <button
          className={`font-semibold  text-lg lg:text-2lg cursor-pointer ${
            activeTab === "comment" ? "text-black-600" : "text-gray-300"
          }`}
          onClick={() => setActiveTab("comment")}
        >
          내 댓글 ({myComment?.totalCount ?? 0})
        </button>
      </div>

      {activeTab === "epigram" && (
        <MyEpigram data={myEpigram} handleLoadMore={handleLoadMore} />
      )}
      {activeTab === "comment" && (
        <MyComment
          data={myComment}
          userId={user?.id}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
