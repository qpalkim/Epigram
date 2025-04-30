import axiosClientHelper from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  CreateEpigramRequest,
  CreateEpigramResponse,
  createEpigramResponseSchema,
  DeleteEpigramResponse,
  deleteEpigramResponseSchema,
  DeleteLikeEpigramResponse,
  deleteLikeEpigramResponseSchema,
  EpigramCommentListResponse,
  epigramCommentListResponseSchema,
  EpigramDetailResponse,
  epigramDetailResponseSchema,
  EpigramsResponse,
  epigramsResponseSchema,
  EpigramsTodayResponse,
  epigramsTodayResponseSchema,
  GetEpigramCommentListParams,
  GetEpigramsParams,
  LikeEpigramResponse,
  likeEpigramResponseSchema,
  UpdateEpigramRequest,
  UpdateEpigramResponse,
  updateEpigramResponseSchema,
} from "../types/epigram";

// 에피그램 목록 조회 API
export const getEpigrams = async (params: GetEpigramsParams) => {
  const response = await axiosClientHelper.get<EpigramsResponse>("/epigrams", {
    params,
  });
  return safeResponse(response.data, epigramsResponseSchema);
};

// 오늘의 에피그램 조회 API
export const getEpigramsToday = async () => {
  const response = await axiosClientHelper.get<EpigramsTodayResponse>(
    "/epigrams/today"
  );
  return safeResponse(response.data, epigramsTodayResponseSchema);
};

// 에피그램 상세 조회 API
export const getEpigramsDetail = async (id: number) => {
  const response = await axiosClientHelper.get<EpigramDetailResponse>(
    `/epigrams/${id}`
  );
  return safeResponse(response.data, epigramDetailResponseSchema);
};

// 에피그램 작성 API
export const createEpigram = async (data: CreateEpigramRequest) => {
  const response = await axiosClientHelper.post<CreateEpigramResponse>(
    "/epigrams",
    data
  );
  return safeResponse(response.data, createEpigramResponseSchema);
};

// 에피그램 수정 API
export const updateEpigram = async (
  id: number,
  data: UpdateEpigramRequest
): Promise<UpdateEpigramResponse> => {
  const response = await axiosClientHelper.patch<UpdateEpigramResponse>(
    `/epigrams/${id}`,
    data
  );
  return safeResponse(response.data, updateEpigramResponseSchema);
};

// 에피그램 삭제 API
export const deleteEpigram = async (id: number): Promise<void> => {
  const response = await axiosClientHelper.delete<DeleteEpigramResponse>(
    `/epigrams/${id}`
  );
  safeResponse(response.data, deleteEpigramResponseSchema);
};

// 에피그램 좋아요 API
export const likeEpigram = async (id: number): Promise<LikeEpigramResponse> => {
  const response = await axiosClientHelper.post<LikeEpigramResponse>(
    `/epigrams/${id}/like`
  );
  return safeResponse(response.data, likeEpigramResponseSchema);
};

// 에피그램 좋아요 삭제 API
export const deleteLikeEpigram = async (
  id: number
): Promise<DeleteLikeEpigramResponse> => {
  const response = await axiosClientHelper.delete<DeleteLikeEpigramResponse>(
    `/epigrams/${id}/like`
  );
  return safeResponse(response.data, deleteLikeEpigramResponseSchema);
};

// 에피그램 댓글 목록 조회 API
export const getEpigramCommentList = async (
  id: number,
  params: GetEpigramCommentListParams
) => {
  const response = await axiosClientHelper.get<EpigramCommentListResponse>(
    `/epigrams/${id}/comments`,
    {
      params,
    }
  );
  return safeResponse(response.data, epigramCommentListResponseSchema);
};
