import api from "@/lib/axios";
import type { UserProfileResponse, UserListResponse } from "../types/userTypes";

export const getUserById = async (id: string) => {
  const res = await api.get<UserProfileResponse>(`/users/details/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getAllUsers = async (page: number) => {
  const res = await api.get<UserListResponse>(`/users?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateProfile = async (data: { name: string }) => {
  const res = await api.put<UserProfileResponse>(`/users/profile`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const searchUsers = async (query: string, page: number) => {
  const res = await api.get<UserListResponse>(
    `/users/search?q=${query}&page=${page}`,
  );
  return res.data;
};

export const followUser = async (id: string) => {
  const res = await api.post(
    `/users/follow/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const unfollowUser = async (id: string) => {
  const res = await api.delete(`/users/unfollow/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getFollowers = async (page: number) => {
  const res = await api.get<UserListResponse>(`/users/followers?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getFollowing = async (page: number) => {
  const res = await api.get<UserListResponse>(`/users/following?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
};
