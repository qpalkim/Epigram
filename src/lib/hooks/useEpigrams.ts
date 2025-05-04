import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetEpigramListParams,
  EpigramListResponse,
  EpigramTodayResponse,
  EpigramDetailResponse,
  CreateEpigramResponse,
  CreateEpigramRequest,
  UpdateEpigramRequest,
  LikeEpigramResponse,
  DeleteLikeEpigramResponse,
  EpigramCommentListResponse,
  GetEpigramCommentListParams,
} from "../types/epigrams";
import {
  createEpigram,
  deleteEpigram,
  deleteLikeEpigram,
  getEpigramCommentList,
  getEpigramList,
  getEpigramDetail,
  getEpigramToday,
  likeEpigram,
  updateEpigram,
} from "../apis/epigrams";

// 에피그램 목록 조회 훅
export const useEpigramList = (params: GetEpigramListParams) => {
  return useQuery<EpigramListResponse>({
    queryKey: ["epigrams", params],
    queryFn: () => getEpigramList(params),
  });
};

// 오늘의 에피그램 조회 훅
export const useEpigramToday = () => {
  return useQuery<EpigramTodayResponse>({
    queryKey: ["epigramToday"],
    queryFn: () => getEpigramToday(),
  });
};

// 에피그램 상세 조회 훅
export const useEpigramDetail = (id: number) => {
  return useQuery<EpigramDetailResponse>({
    queryKey: ["epigramDetail", id],
    queryFn: () => getEpigramDetail(id!),
  });
};

// 에피그램 작성 훅
export const useCreateEpigram = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateEpigramResponse, unknown, CreateEpigramRequest>({
    mutationFn: createEpigram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["epigrams"] });
    },
  });
};

// 에피그램 수정 훅
export const useUpdateEpigram = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateEpigramRequest) => updateEpigram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["epigrams"] });
    },
  });
};

// 에피그램 삭제 훅
export const useDeleteEpigram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEpigram(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["epigrams"] });
    },
  });
};

// 에피그램 좋아요 훅
export const useLikeEpigram = () => {
  return useMutation<LikeEpigramResponse, unknown, number>({
    mutationFn: (id: number) => likeEpigram(id),
  });
};

// 에피그램 좋아요 삭제 훅
export const useDeleteLikeEpigram = () => {
  return useMutation<DeleteLikeEpigramResponse, unknown, number>({
    mutationFn: (id: number) => deleteLikeEpigram(id),
  });
};

// 에피그램 댓글 목록 조회 훅
export const useEpigramCommentList = (
  id: number,
  params: GetEpigramCommentListParams
) => {
  return useQuery<EpigramCommentListResponse>({
    queryKey: ["epigrams", id, params],
    queryFn: () => getEpigramCommentList(id!, params),
  });
};
