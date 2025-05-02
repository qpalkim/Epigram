import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetUserCommentListParams,
  UpdateUserRequest,
  UserCommentListResponse,
  UserResponse,
} from "../types/users";
import {
  getMyData,
  getUserCommentList,
  getUserData,
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
