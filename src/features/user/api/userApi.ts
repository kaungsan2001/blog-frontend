import api from "@/lib/axios";
import type {
  UserProfileResponse,
  UserBlogsResponse,
} from "../types/userTypes";

export const getUserById = async (id: string) => {
  const res = await api.get<UserProfileResponse>(`/users/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
export const getUserBlogs = async (id: string) => {
  const res = await api.get<UserBlogsResponse>(`/users/${id}/blogs`, {
    withCredentials: true,
  });
  return res.data;
};
