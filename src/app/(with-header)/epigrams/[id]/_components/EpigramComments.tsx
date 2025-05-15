"use client";
import { useEffect, useState } from "react";
import { useCreateComment } from "@/lib/hooks/useComments";
import { useEpigramCommentList } from "@/lib/hooks/useEpigrams";
import { useMyData } from "@/lib/hooks/useUsers";
import { UpdateCommentResponse } from "@/lib/types/comments";
import Button from "@/components/Button";
import ProfileImage from "@/components/ProfileImage";
import Empty from "@/components/Empty";
import CommentItem from "@/components/CommentItem";
import Image from "next/image";
import plus from "@/assets/icons/plus.svg";

export default function EpigramComments({ id }: { id: number }) {
  const [limit, setLimit] = useState(3);
  const [addContent, setAddContent] = useState("");
  const { data, isLoading, isError } = useEpigramCommentList(id, {
    limit: limit,
  });
  const { data: user } = useMyData();
  const [isPrivate, setIsPrivate] = useState(false);
  const [commentList, setCommentList] = useState(data?.list || []);
  const [totalCount, setTotalCount] = useState(data?.totalCount || 0);
  const createComment = useCreateComment();

  useEffect(() => {
    if (data?.list) {
      setCommentList(data.list);
      setTotalCount(data.totalCount);
    }
  }, [data]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();

    if ((commentList.length ?? 0) < (data?.totalCount ?? Infinity))
      setLimit((prev) => prev + 3);
  };

  const handleCreateComment = () => {
    createComment.mutate(
      {
        epigramId: id,
        content: addContent.trim(),
        isPrivate,
      },
      {
        onSuccess: (newComment) => {
          setCommentList((prev) => [newComment, ...prev]);
          setTotalCount((prev) => prev + 1);
          setAddContent("");
        },
      }
    );
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
    setTotalCount((prev) => Math.max(prev - 1, 0));
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <div className="mt-12 max-w-[640px] mx-auto mb-40 px-6 md:px-0">
      <h2 className="font-semibold text-black-600 text-lg lg:text-2lg mb-4">
        댓글 ({totalCount})
      </h2>
      <div className="flex gap-6">
        {user && (
          <ProfileImage
            size="md"
            src={user.image}
            className="w-[48px] h-[48px] aspect-square"
          />
        )}
        <div className="w-full">
          <textarea
            value={addContent}
            onChange={(e) => setAddContent(e.target.value)}
            className="w-full border rounded-md p-2 text-black-700 border-line-200 text-sm outline-black-600"
            placeholder="100자 이내로 입력하세요."
            rows={3}
          />
          <div className="flex justify-between mt-2 mb-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-xs lg:text-md text-gray-400">
                공개
              </p>
              <label
                htmlFor="toggle"
                className="relative inline-flex items-center cursor-pointer w-[32px] h-[16px]"
              >
                <input
                  id="toggle"
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="w-full h-full peer-checked:bg-blue-300 bg-black-600 rounded-full transition-all" />
                <span className="absolute left-4.5 top-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-white rounded-full transition-transform peer-checked:-translate-x-3.5" />
              </label>
            </div>
            <Button
              size="sm"
              onClick={handleCreateComment}
              className="w-[52px] lg:w-[60px]"
              disabled={addContent.trim() === "" || addContent.length > 100}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
      {commentList.length === 0 ? (
        <Empty />
      ) : (
        <>
          {commentList.map((comment) => (
            <CommentItem
              key={comment.id}
              image={comment.writer.image}
              commentId={comment.id}
              nickname={comment.writer.nickname}
              content={comment.content}
              updatedAt={comment.updatedAt}
              isMine={user?.id === comment.writer.id}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))}

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
              댓글 더보기
            </Button>
          )}
        </>
      )}
    </div>
  );
}
