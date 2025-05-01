import { z } from "zod";

// 공통 감정 5개 영어 타입
export enum Emotion {
  MOVED = "MOVED",
  HAPPY = "HAPPY",
  WORRIED = "WORRIED",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

// 공통 감정 5개 한글 라벨 타입
export const EmotionLabels: Record<Emotion, string> = {
  [Emotion.MOVED]: "감동",
  [Emotion.HAPPY]: "기쁨",
  [Emotion.WORRIED]: "고민",
  [Emotion.SAD]: "슬픔",
  [Emotion.ANGRY]: "분노",
};

// 공통 감정 5개 Enum 타입
const emotionLogsSchema = z.object({
  emotion: z.enum([
    Emotion.MOVED,
    Emotion.HAPPY,
    Emotion.WORRIED,
    Emotion.SAD,
    Emotion.ANGRY,
  ]),
});

// 오늘의 감정 저장 요청 API 타입
export const createEmotionLogsTodayRequestSchema = emotionLogsSchema;

export type CreateEmotionLogsTodayRequest = z.infer<
  typeof createEmotionLogsTodayRequestSchema
>;

// 오늘의 감정 저장, 오늘의 감정 조회 응답 API 타입
export const emotionLogsResponseSchema = z.object({
  createdAt: z.string().datetime(),
  emotion: z.string(emotionLogsSchema),
  userId: z.number(),
  id: z.number(),
});

export type EmotionLogsTodayResponse = z.infer<
  typeof emotionLogsResponseSchema
>;

// 월별 감정 조회 API 타입
export const emotionLogsMonthlyResponseSchema = z.array(
  emotionLogsResponseSchema
);

export type EmotionLogsMonthlyResponse = z.infer<
  typeof emotionLogsMonthlyResponseSchema
>;

// 월별 감정 조회 파라미터 API 타입
export const getEmotionLogsMonthlyParamsShema = z.object({
  userId: z.number(),
  year: z.number(),
  month: z.number(),
});

export type GetEmotionLogsMonthlyParams = z.infer<
  typeof getEmotionLogsMonthlyParamsShema
>;
