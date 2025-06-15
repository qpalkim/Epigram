import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CommentListResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentListParams,
  UpdateCommentRequest,
} from "../types/comments";
import {
  createComment,
  deleteComment,
  getCommentList,
  updateComment,
} from "../apis/comments";

// 댓글 작성 훅
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateCommentResponse, unknown, CreateCommentRequest>({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// 댓글 목록 조회 훅
export const useCommentList = (params: GetCommentListParams) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", params],
    queryFn: () => getCommentList(params),
    placeholderData: keepPreviousData,
  });
};

// 댓글 수정 훅
export const useUpdateComment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCommentRequest) => updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// 댓글 삭제 훅
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
