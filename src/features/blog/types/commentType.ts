import * as z from "zod";

export const CommentCreateSchema = z.object({
  content: z.string().min(1, "Comment is required"),
});

export type CommentCreateInput = z.infer<typeof CommentCreateSchema>;

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  blogId: string;
  userId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CommentListResponse {
  data: CommentType[];
  message: string;
  success: boolean;
}
