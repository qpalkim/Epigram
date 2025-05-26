"use client";
import { useEffect, useState } from "react";
import { UpdateCommentResponse } from "@/lib/types/comments";
import { UserCommentListResponse } from "@/lib/types/users";
import Button from "@/components/Button";
import CommentItem from "@/components/CommentItem";
import Empty from "@/components/Empty";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default function MyComment({
  data,
  userId,
  handleLoadMore,
}: {
  data: UserCommentListResponse;
  userId: number;
  handleLoadMore: (e: React.MouseEvent) => void;
}) {
  const [commentList, setCommentList] = useState(data?.list || []);

  useEffect(() => {
    if (data?.list) {
      setCommentList(data.list);
    }
  }, [data]);

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

  return (
    <>
      {data?.list.length === 0 && <Empty myComment />}

      {commentList.map((comment) => (
        <div key={comment.id}>
          <CommentItem
            epigramId={comment.epigramId}
            commentId={comment.id}
            image={comment.writer.image}
            nickname={comment.writer.nickname}
            content={comment.content}
            updatedAt={comment.updatedAt}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            isMine={userId === comment.writer.id}
          />
        </div>
      ))}

      {(commentList.length ?? 0) < (data?.totalCount ?? 0) && (
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
          댓글 더보기
        </Button>
      )}
    </>
  );
}
