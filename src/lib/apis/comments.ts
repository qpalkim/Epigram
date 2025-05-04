import axiosClientHelper from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  CommentListResponse,
  commentListResponseSchema,
  CreateCommentRequest,
  CreateCommentResponse,
  createCommentResponseSchema,
  DeleteCommentResponse,
  deleteCommentResponseSchema,
  GetCommentListParams,
  UpdateCommentRequest,
  UpdateCommentResponse,
  updateCommentResponseSchema,
} from "../types/comments";

// 댓글 작성 API
export const createComment = async (data: CreateCommentRequest) => {
  const response = await axiosClientHelper.post<CreateCommentResponse>(
    "/comments",
    data
  );
  return safeResponse(response.data, createCommentResponseSchema);
};

// 댓글 목록 조회 API
export const getCommentList = async (params: GetCommentListParams) => {
  const response = await axiosClientHelper.get<CommentListResponse>(
    "/comments",
    { params }
  );
  return safeResponse(response.data, commentListResponseSchema);
};

// 댓글 수정 API
export const updateComment = async (
  id: number,
  data: UpdateCommentRequest
): Promise<UpdateCommentResponse> => {
  const response = await axiosClientHelper.patch<UpdateCommentResponse>(
    `/comments/${id}`,
    data
  );
  return safeResponse(response.data, updateCommentResponseSchema);
};

// 댓글 삭제 API
export const deleteComment = async (id: number): Promise<void> => {
  const response = await axiosClientHelper.delete<DeleteCommentResponse>(
    `/comments/${id}`
  );
  safeResponse(response.data, deleteCommentResponseSchema);
};
