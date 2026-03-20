import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createComment, getComments, deleteComment } from "../api/commentApi";
import type { CommentCreateInput } from "../types/commentType";

export const useCreateComment = (blogId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentCreateInput) => createComment(data, blogId),
    onSuccess: () => {
      toast.success("Comment created successfully");
      queryClient.invalidateQueries({ queryKey: ["comments", blogId] });
    },
    onError: () => {
      toast.error("Failed To Create Comment");
    },
  });
};

export const useGetComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getComments(blogId),
  });
};

export const useDeleteComment = (blogId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(blogId, commentId),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["comments", blogId] });
    },
    onError: () => {
      toast.error("Failed To Delete Comment");
    },
  });
};
