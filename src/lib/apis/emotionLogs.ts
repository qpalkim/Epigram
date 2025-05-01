import axiosClientHelper from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  EmotionLogsMonthlyResponse,
  emotionLogsMonthlyResponseSchema,
  emotionLogsResponseSchema,
  CreateEmotionLogsTodayRequest,
  EmotionLogsTodayResponse,
  GetEmotionLogsMonthlyParams,
} from "../types/emotionLogs";

// 오늘의 감정 저장 API
export const createEmotionLogsToday = async (
  data: CreateEmotionLogsTodayRequest
) => {
  const response = await axiosClientHelper.post<EmotionLogsTodayResponse>(
    "/emotionLogs/today",
    data
  );
  return safeResponse(response.data, emotionLogsResponseSchema);
};

// 오늘의 감정 조회 API
export const getEmotionLogs = async (userId: number) => {
  const response = await axiosClientHelper.get<EmotionLogsTodayResponse>(
    `/emotionLogs/today?userId=${userId}`
  );
  return safeResponse(response.data, emotionLogsResponseSchema);
};

// 월별 감정 조회 API
export const getEmotionLogsMonthly = async (
  params: GetEmotionLogsMonthlyParams
) => {
  const response = await axiosClientHelper.get<EmotionLogsMonthlyResponse>(
    "/emotionLogs/monthly",
    { params }
  );
  return safeResponse(response.data, emotionLogsMonthlyResponseSchema);
};
