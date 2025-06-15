import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetEpigramListParams,
  EpigramListResponse,
  EpigramTodayResponse,
  EpigramDetailResponse,
  CreateEpigramResponse,
  CreateEpigramRequest,
  UpdateEpigramRequest,
  EpigramCommentListResponse,
  GetEpigramCommentListParams,
} from "../types/epigrams";
import {
  createEpigram,
  deleteEpigram,
  getEpigramCommentList,
  getEpigramList,
  getEpigramDetail,
  getEpigramToday,
  updateEpigram,
} from "../apis/epigrams";

// 에피그램 목록 조회 훅
export const useEpigramList = (params: GetEpigramListParams) => {
  return useQuery<EpigramListResponse>({
    queryKey: ["epigrams", params],
    queryFn: () => getEpigramList(params),
    placeholderData: keepPreviousData,
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
    queryKey: ["epigrams", id],
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
    onSuccess: (updatedEpigram) => {
      queryClient.setQueryData(["epigrams", id], updatedEpigram);
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

// 에피그램 댓글 목록 조회 훅
export const useEpigramCommentList = (
  id: number,
  params: GetEpigramCommentListParams
) => {
  return useQuery<EpigramCommentListResponse>({
    queryKey: ["epigrams", id, params],
    queryFn: () => getEpigramCommentList(id!, params),
    placeholderData: keepPreviousData,
  });
};
