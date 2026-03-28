import { z } from "zod";

const removeHtmlTags = (value: string) => {
  return value
    .replace(/<[^>]+>/g, "") // remove HTML tags
    .replace(/&nbsp;/g, "") // remove &nbsp;
    .replace(/\s/g, ""); // remove whitespace
};

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

export const BlogCreateSchema = z.object({
  image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files: FileList | undefined) =>
        !files || files.length === 0 || files[0] instanceof File,
      "Invalid File",
    )
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "Only Jpeg, Jpg, Png are allowed")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, "File size must be less than 5MB"),

  title: z.string().min(1, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  content: z.string().refine(removeHtmlTags, "Content is required"),
  isPublished: z.boolean(),
});

export type BlogCreateInput = z.infer<typeof BlogCreateSchema>;

export interface Blog {
  id: string;
  title: string;
  image?: string;
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
