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
  image: z.string().url().nullable().optional(),
  nickname: z.string().min(1).max(30).optional(),
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

// 프로필 이미지 URL 생성 API 타입
export const profileImageUrlSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/ico",
        "image/gif",
        "image/webp",
      ].includes(file.type),
    {
      message: "지원되지 않는 이미지 파일입니다.",
    }
  )
  .refine((file) => file.size < 5 * 1024 * 1024, {
    message: "5MB 이하의 파일만 등록이 가능합니다.",
  });

export type ProfileImageUrl = z.infer<typeof profileImageUrlSchema>;

// 프로필 이미지 URL 생성 요청 파라미터 API 타입
export interface CreateProfileImageParams {
  image: File;
}

// 프로필 이미지 URL 생성 응답 API 타입
export const profileImageUrlResponseSchema = z.object({
  url: z.string().url(),
});

export type ProfileImageUrlResponse = z.infer<
  typeof profileImageUrlResponseSchema
>;
