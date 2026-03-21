import api from "@/lib/axios";
import type {
  UserProfileResponse,
  UserBlogsResponse,
  UserListResponse,
} from "../types/userTypes";

export const getUserById = async (id: string) => {
  const res = await api.get<UserProfileResponse>(`/users/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
export const getUserBlogs = async (id: string, page: number) => {
  const res = await api.get<UserBlogsResponse>(
    `/users/${id}/blogs?page=${page}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getAllUsers = async (query: string, page: number) => {
  const res = await api.get<UserListResponse>(
    `/users?${query ? `query=${query}` : ""}&page=${page}`,
  );
  return res.data;
};

export const updateProfile = async (data: { name: string }) => {
  const res = await api.put<UserProfileResponse>(`/users/profile`, data, {
    withCredentials: true,
  });
  return res.data;
};
