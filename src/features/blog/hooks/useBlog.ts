import { useMutation, useQuery } from "@tanstack/react-query";
import type { BlogCreateInput } from "../types/blogType";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  createBlog,
  getBlogById,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  searchBlogs,
} from "../api/blogApi";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BlogCreateInput) => createBlog(data),
    onSuccess: () => {
      toast.success("Blog created successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs/list");
    },
    onError: () => {
      toast.error("Failed To Create Blog");
    },
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });
};

export const useUpdateBlog = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: BlogCreateInput) => updateBlog(id, data),
    onSuccess: () => {
      toast.success("Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      navigate(-1);
    },
    onError: () => {
      toast.error("Failed To Update Blog");
    },
  });
};

export const useGetBlogs = (page: number) => {
  return useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getAllBlogs(page),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      toast.error("Failed To Delete Blog");
    },
  });
};

export const useSearchBlogs = (query: string, page: number) => {
  return useQuery({
    queryKey: ["blogs", query, page],
    queryFn: () => searchBlogs(query, page),
    enabled: !!query,
  });
};
