import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserById,
  getUserBlogs,
  getAllUsers,
  updateProfile,
  searchUsers,
} from "../api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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

export const useGetAllUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers(page),
  });
};

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
      navigate(-1);
    },
  });
};

export const useSearchUsers = (query: string, page: number) => {
  return useQuery({
    queryKey: ["users", query, page],
    queryFn: () => searchUsers(query, page),
    enabled: !!query,
  });
};
