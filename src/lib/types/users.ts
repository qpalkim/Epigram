import { z } from "zod";

// 내 정보 및 유저 정보 조회 API 타입
export const userResponseSchema = z.object({
  image: z.string().url().nullable(),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  teamId: z.string(),
  nickname: z.string().min(1).max(30),
  id: z.number().min(1),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// 내 정보 수정 요청 API 타입
export const updateUserRequestSchema = z.object({
  image: z.string().url().nullable(),
  nickname: z.string().min(1).max(30),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

// 내 정보 수정 응답 API 타입
export const updateUserResponseSchema = userResponseSchema;

export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;

// 유저 댓글 목록 조회 API 타입
export const userCommentListResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(
    z.object({
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
    })
  ),
});

export type UserCommentListResponse = z.infer<
  typeof userCommentListResponseSchema
>;

// 유저 댓글 목록 조회 파라미터 API 타입
export const getUserCommentListParams = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
});

export type GetUserCommentListParams = z.infer<typeof getUserCommentListParams>;
