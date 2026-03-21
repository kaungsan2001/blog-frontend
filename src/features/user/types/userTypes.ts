import type { Blog } from "@/features/blog/types/blogType";
import z from "zod";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    blogs: number;
  };
};

export type UserProfileResponse = {
  data: UserProfile;
  message: string;
  statusCode: number;
};

export type UserBlogsResponse = {
  data: Blog[];
  message: string;
  statusCode: number;
  meta: {
    totalBlogs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export type UserListResponse = {
  data: UserProfile[];
  message: string;
  statusCode: number;
  meta: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters long"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
