"use client";
import { useEffect, useState } from "react";
import { useCommentList } from "@/lib/hooks/useComments";
import { useMyData } from "@/lib/hooks/useUsers";
import { UpdateCommentResponse } from "@/lib/types/comments";
import CommentItem from "@/components/CommentItem";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import RetryError from "@/components/RetryError";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default function LatestComment() {
  const [limit, setLimit] = useState(3);
  const { data, isLoading, isError, refetch } = useCommentList({
    limit: limit,
  });
  const { data: user } = useMyData();
  const [commentList, setCommentList] = useState(data?.list || []);

  useEffect(() => {
    if (data?.list) {
      setCommentList(data.list);
    }
  }, [data]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();

    if ((commentList.length ?? 0) < (data?.totalCount ?? Infinity)) {
      setLimit((prevLimit) => prevLimit + 3);
    }
  };

  const handleUpdateComment = (updatedComment: UpdateCommentResponse) => {
    setCommentList((prevList) =>
      prevList.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleDeleteComment = (id: number) => {
    setCommentList((prevList) =>
      prevList.filter((comment) => comment.id !== id)
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <>
      <div className="mt-10">
        {commentList.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              epigramId={comment.epigramId}
              commentId={comment.id}
              image={comment.writer.image}
              nickname={comment.writer.nickname}
              content={comment.content}
              updatedAt={comment.updatedAt}
              isMine={user?.id === comment.writer.id}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          </div>
        ))}
      </div>

      {(commentList.length ?? 0) < (data?.totalCount ?? Infinity) && (
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
          최신 댓글 더보기
        </Button>
      )}
    </>
  );
}
