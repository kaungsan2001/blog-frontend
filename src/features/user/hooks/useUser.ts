import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserBlogs } from "../api/userApi";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
export const useUserBlogs = (id: string) => {
  return useQuery({
    queryKey: ["user-blogs", id],
    queryFn: () => getUserBlogs(id),
  });
};
