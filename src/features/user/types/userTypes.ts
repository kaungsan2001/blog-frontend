import type { Blog } from "@/features/blog/types/blogType";

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
};
