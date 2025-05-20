import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProfileImageParams,
  GetUserCommentListParams,
  profileImageUrlSchema,
  UpdateUserRequest,
  UserCommentListResponse,
  UserResponse,
} from "../types/users";
import {
  getMyData,
  getUserCommentList,
  getUserData,
  postFileImageUrl,
  updateMyData,
} from "../apis/users";

// 내 정보 조회 훅
export const useMyData = () => {
  return useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: () => getMyData(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// 내 정보 수정 훅
export const useUpdateMyData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateMyData(data),
    onError: (error) => {
      console.error("유저 정보 수정 실패:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// 유저 정보 조회 훅
export const useUserData = (id: number) => {
  return useQuery<UserResponse>({
    queryKey: ["users", id],
    queryFn: () => getUserData(id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// 유저 댓글 목록 조회 훅
export const useUserCommentList = (
  id: number,
  params: GetUserCommentListParams
) => {
  return useQuery<UserCommentListResponse>({
    queryKey: ["users", id, params],
    queryFn: () => getUserCommentList(id!, params),
  });
};

// 프로필 이미지 URL 생성 훅
export const useProfileImage = () => {
  return useMutation({
    mutationFn: async (params: CreateProfileImageParams) => {
      const { image } = params;
      profileImageUrlSchema.parse(image);
      const response = await postFileImageUrl(params);
      return response;
    },
  });
};
