import { z } from "zod";

const removeHtmlTags = (value: string) => {
  return value
    .replace(/<[^>]+>/g, "") // remove HTML tags
    .replace(/&nbsp;/g, "") // remove &nbsp;
    .replace(/\s/g, ""); // remove whitespace
};

export const BlogCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  content: z.string().refine(removeHtmlTags, "Content is required"),
  isPublished: z.boolean(),
});

export type BlogCreateInput = z.infer<typeof BlogCreateSchema>;

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  isPublished: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  isSaved: boolean;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}
export type UserBlogsResponse = {
  data: Blog[];
  message: string;
  meta: {
    totalBlogs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export type BlogListResponse = {
  success: boolean;
  message: string;
  data: Blog[];
  meta: {
    totalBlogs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};
