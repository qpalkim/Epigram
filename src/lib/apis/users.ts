import axiosClientHelper from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  UserResponse,
  userResponseSchema,
  UpdateUserRequest,
  UpdateUserResponse,
  updateUserResponseSchema,
  GetUserCommentListParams,
  UserCommentListResponse,
  userCommentListResponseSchema,
} from "../types/users";

// 내 정보 조회 API
export const getMyData = async () => {
  const response = await axiosClientHelper.get<UserResponse>("/users/me");
  return safeResponse(response.data, userResponseSchema);
};

// 내 정보 수정 API
export const updateMyData = async (data: UpdateUserRequest) => {
  const response = await axiosClientHelper.patch<UpdateUserResponse>(
    "/users/me",
    data
  );
  return safeResponse(response.data, updateUserResponseSchema);
};

// 유저 정보 조회 API
export const getUserData = async (id: number) => {
  const response = await axiosClientHelper.get<UserResponse>(`/users/${id}`);
  return safeResponse(response.data, userResponseSchema);
};

// 유저 댓글 목록 조회 API
export const getUserCommentList = async (
  id: number,
  params: GetUserCommentListParams
) => {
  const response = await axiosClientHelper.get<UserCommentListResponse>(
    `/users/${id}/comments`,
    { params }
  );
  return safeResponse(response.data, userCommentListResponseSchema);
};
