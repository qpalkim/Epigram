import { z } from "zod";

// 공통 댓글 응답 API 타입
export const commentResponseSchema = z.object({
  epigramId: z.number(),
  writer: z.object({
    image: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  isPrivate: z.boolean(),
  content: z.string().min(1),
  id: z.number(),
});

// 댓글 작성 요청 API 타입
export const createCommentRequestSchema = z.object({
  epigramId: z.number(),
  isPrivate: z.boolean(),
  content: z.string().min(1),
});

export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;

// 댓글 작성 응답 API 타입
export const createCommentResponseSchema = commentResponseSchema;

export type CreateCommentResponse = z.infer<typeof createCommentResponseSchema>;

// 댓글 목록 조회 API 타입
export const commentListResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(commentResponseSchema),
});

export type CommentListResponse = z.infer<typeof commentListResponseSchema>;

// 댓글 목록 조회 파라미터 API 타입
export const getCommentListParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
});

export type GetCommentListParams = z.infer<typeof getCommentListParamsSchema>;

// 댓글 수정 요청 API 타입
export const updateCommentRequestSchema = z.object({
  isPrivate: z.boolean(),
  content: z.string().min(1),
});

export type UpdateCommentRequest = z.infer<typeof updateCommentRequestSchema>;

// 댓글 수정 응답 API 타입
export const updateCommentResponseSchema = commentResponseSchema;

export type UpdateCommentResponse = z.infer<typeof updateCommentResponseSchema>;

// 댓글 삭제 API 타입
export const deleteCommentResponseSchema = z.object({
  id: z.number(),
});

export type DeleteCommentResponse = z.infer<typeof deleteCommentResponseSchema>;
