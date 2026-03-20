import api from "@/lib/axios";
import type {
  CommentCreateInput,
  CommentListResponse,
} from "../types/commentType";

export async function createComment(data: CommentCreateInput, blogId: string) {
  const res = await api.post<CommentCreateInput>(
    `/blogs/${blogId}/comments`,
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function getComments(blogId: string) {
  const res = await api.get<CommentListResponse>(`/blogs/${blogId}/comments`);
  return res.data;
}

export async function deleteComment(blogId: string, commentId: string) {
  const res = await api.delete(`/blogs/${blogId}/comments/${commentId}`, {
    withCredentials: true,
  });
  return res.data;
}
