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
  saveBlog,
  unsaveBlog,
  getSavedBlogs,
  getUserBlogs,
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
  });
};

export const useUserBlogs = (
  id: string,
  page: number,
  isPublished: boolean,
) => {
  return useQuery({
    queryKey: ["blogs", id, page, isPublished],
    queryFn: () => getUserBlogs(id, page, isPublished),
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blogs", id],
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
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate(-1);
    },
  });
};

export const useGetBlogs = (page: number, categoryId?: string | null) => {
  return useQuery({
    queryKey: ["blogs", page, categoryId],
    queryFn: () => getAllBlogs(page, categoryId),
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
  });
};

export const useSearchBlogs = (query: string, page: number) => {
  return useQuery({
    queryKey: ["blogs", query, page],
    queryFn: () => searchBlogs(query, page),
    enabled: !!query,
  });
};

export const useSaveBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId: string) => saveBlog(blogId),
    onSuccess: () => {
      toast.success("Blog saved successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUnsaveBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId: string) => unsaveBlog(blogId),
    onSuccess: () => {
      toast.success("Blog unsaved successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useGetSavedBlogs = (page: number) => {
  return useQuery({
    queryKey: ["blogs", "saved", page],
    queryFn: () => getSavedBlogs(page),
  });
};
