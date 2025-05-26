"use client";
import { useState } from "react";
import { useDeleteComment, useUpdateComment } from "@/lib/hooks/useComments";
import { UpdateCommentResponse } from "@/lib/types/comments";
import { toast } from "react-toastify";
import formatTime from "@/lib/utils/formatTime";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import Modal from "./Modal";
import UserInfoModal from "./UserInfoModal";
import DeleteItemModal from "./DeleteItemModal";

interface CommentItemProps {
  epigramId?: number;
  commentId: number;
  image: string | null;
  nickname: string;
  updatedAt: string;
  content: string;
  isMine: boolean;
  onUpdate: (updatedComment: UpdateCommentResponse) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({
  epigramId,
  commentId,
  image,
  nickname,
  updatedAt,
  content,
  isMine,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
  const updateComment = useUpdateComment(commentId);
  const deleteComment = useDeleteComment();

  const handleSave = () => {
    if (editedContent.trim() === "") return;
    updateComment.mutate(
      { content: editedContent, isPrivate: false },
      {
        onSuccess: (updateComment) => {
          onUpdate(updateComment);
          setIsEditing(false);
          toast.success("댓글이 수정되었습니다.");
        },
      }
    );
  };

  const handleDeleteCommentItem = () => {
    deleteComment.mutate(commentId, {
      onSuccess: () => {
        onDelete?.(commentId);
        toast.success("댓글이 삭제되었습니다.");
      },
    });
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <>
      <hr className="border-line-200" />
      <div className="my-4 px-4 flex gap-4">
        <ProfileImage
          size="md"
          src={image}
          clickable
          className="w-[48px] h-[48px] aspect-square"
          onClick={() => setIsUserInfoModalOpen(true)}
        />
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-black-300 text-xs md:text-md">
              {nickname} &nbsp; {formatTime(updatedAt)}
            </p>

            {isMine && !isEditing && (
              <div className="flex gap-4 text-xs">
                <p
                  className="text-black-600 underline cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </p>
                <p
                  className="text-error-100 underline cursor-pointer"
                  onClick={() => setIsDeleteItemModalOpen(true)}
                >
                  삭제
                </p>
              </div>
            )}
          </div>

          {isMine && isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={`mt-2 w-full border rounded-md p-2 text-black-700 border-black-600 text-sm ${
                  editedContent.trim() === ""
                    ? "outline-error-100 border-error-100"
                    : "outline-black-600"
                }`}
                placeholder={`${
                  editedContent.trim() === "" ? "100자 이내로 입력하세요." : ""
                }`}
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="w-[52px] lg:w-[60px]"
                  disabled={editedContent.trim() === ""}
                >
                  저장
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-[52px] lg:w-[60px]"
                  onClick={handleCancel}
                >
                  취소
                </Button>
              </div>
            </>
          ) : epigramId ? (
            <Link href={`/epigrams/${epigramId}`}>
              <p className="mt-2 text-black-700 text-md">{content}</p>
            </Link>
          ) : (
            <p className="mt-2 text-black-700 text-md">{content}</p>
          )}

          {isUserInfoModalOpen && (
            <Modal onClose={() => setIsUserInfoModalOpen(false)}>
              <UserInfoModal
                image={image}
                nickname={nickname}
                onClose={() => setIsUserInfoModalOpen(false)}
              />
            </Modal>
          )}

          {isDeleteItemModalOpen && (
            <Modal onClose={() => setIsDeleteItemModalOpen(false)}>
              <DeleteItemModal
                onCancel={() => setIsDeleteItemModalOpen(false)}
                onDelete={handleDeleteCommentItem}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
