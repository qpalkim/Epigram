import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateEmotionLogsTodayRequest,
  EmotionLogsMonthlyResponse,
  EmotionLogsTodayResponse,
  GetEmotionLogsMonthlyParams,
} from "../types/emotionLogs";
import {
  createEmotionLogsToday,
  getEmotionLogs,
  getEmotionLogsMonthly,
} from "../apis/emotionLogs";

// 오늘의 감정 저장 훅
export const useCreateEmotionLogsToday = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EmotionLogsTodayResponse,
    unknown,
    CreateEmotionLogsTodayRequest
  >({
    mutationFn: createEmotionLogsToday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emotionLogs"] });
    },
  });
};

// 오늘의 감정 조회 훅
export const useEmotionLogsToday = (userId: number) => {
  return useQuery<EmotionLogsTodayResponse>({
    queryKey: ["emotionLogs", userId],
    queryFn: () => getEmotionLogs(userId!),
  });
};

// 감정 월별 조회 훅
export const useEmotionLogsMonthly = (params: GetEmotionLogsMonthlyParams) => {
  return useQuery<EmotionLogsMonthlyResponse>({
    queryKey: ["emotionLogs", params],
    queryFn: () => getEmotionLogsMonthly(params),
  });
};
