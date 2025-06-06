import { z } from "zod";

// 공통 태그 API 타입
const tagSchema = z.object({
  name: z.string().min(1).max(10),
  id: z.number().min(1),
});

// 공통 에피그램 API 타입
const epigramSchema = z.object({
  likeCount: z.number(),
  tags: z.array(tagSchema),
  writerId: z.number().min(1),
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().min(1),
});

// 공통 좋아요 API 타입
const likeSchema = epigramSchema.extend({ isLiked: z.boolean().optional() });

// 에피그램 목록 조회 API 타입
export const epigramListResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(epigramSchema),
});

export type EpigramListResponse = z.infer<typeof epigramListResponseSchema>;

// 에피그램 목록 조회 파라미터 API 타입
export const getEpigramListParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
  keyword: z.string().optional(),
  writerId: z.number().optional(),
});

export type GetEpigramListParams = z.infer<typeof getEpigramListParamsSchema>;

// 오늘의 에피그램 조회 API 타입
export const epigramTodayResponseSchema = epigramSchema
  .extend({
    isLiked: z.boolean().optional(),
  })
  .nullable();

export type EpigramTodayResponse = z.infer<typeof epigramTodayResponseSchema>;

// 에피그램 상세 조회 API 타입
export const epigramDetailResponseSchema = epigramSchema.extend({
  isLiked: z.boolean().optional(),
});

export type EpigramDetailResponse = z.infer<typeof epigramDetailResponseSchema>;

// 에피그램 작성 요청 API 타입
export const createEpigramRequestSchema = z.object({
  tags: z
    .array(z.string().min(1).max(10))
    .min(1, { message: "최소 1개의 태그를 입력해 주세요." })
    .max(3),
  referenceUrl: z.string().url().or(z.literal("")).optional(),
  referenceTitle: z.string().max(100).optional(),
  author: z.string().min(1, { message: "저자를 입력해 주세요." }).max(30),
  content: z
    .string()
    .min(1, { message: "내용을 입력해 주세요." })
    .max(500, { message: "500자 이내로 입력해 주세요." }),
});

export type CreateEpigramRequest = z.infer<typeof createEpigramRequestSchema>;

// 에피그램 작성 응답 API 타입
export const createEpigramResponseSchema = epigramSchema;

export type CreateEpigramResponse = z.infer<typeof createEpigramResponseSchema>;

// 에피그램 수정 요청 API 타입
export const updateEpigramRequestSchema = z.object({
  tags: z
    .array(z.string().min(1).max(10))
    .min(1, { message: "최소 1개의 태그를 입력해 주세요." })
    .max(3),
  referenceUrl: z.string().url().or(z.literal("")).optional(),
  referenceTitle: z.string().max(100).optional(),
  author: z.string().min(1, { message: "저자를 입력해 주세요." }).max(30),
  content: z
    .string()
    .min(1, { message: "내용을 입력해 주세요." })
    .max(500, { message: "500자 이내로 입력해 주세요." }),
});

export type UpdateEpigramRequest = z.infer<typeof updateEpigramRequestSchema>;

// 에피그램 수정 응답 API 타입
export const updateEpigramResponseSchema = epigramSchema;

export type UpdateEpigramResponse = z.infer<typeof updateEpigramResponseSchema>;

// 에피그램 삭제 응답 API 타입
export const deleteEpigramResponseSchema = z.object({
  id: z.number(),
});

export type DeleteEpigramResponse = z.infer<typeof deleteEpigramResponseSchema>;

// 에피그램 댓글 목록 조회 API 타입
export const epigramCommentListResponseSchema = z.object({
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

export type EpigramCommentListResponse = z.infer<
  typeof epigramCommentListResponseSchema
>;

// 에피그램 댓글 목록 조회 파라미터 API 타입
export const getEpigramCommentListParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
});

export type GetEpigramCommentListParams = z.infer<
  typeof getEpigramCommentListParamsSchema
>;
