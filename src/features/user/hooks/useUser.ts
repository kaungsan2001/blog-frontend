import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserById,
  getUserBlogs,
  getAllUsers,
  updateProfile,
} from "../api/userApi";
import { toast } from "sonner";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
export const useUserBlogs = (id: string, page: number) => {
  return useQuery({
    queryKey: ["blogs", id, page],
    queryFn: () => getUserBlogs(id, page),
  });
};

export const useGetAllUsers = (query: string, page: number) => {
  return useQuery({
    queryKey: ["users", query, page],
    queryFn: () => getAllUsers(query, page),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};
