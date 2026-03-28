import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getDashboardStats,
  getAdminUsers,
  deleteUser,
  getAdminBlogs,
  adminDeleteBlog,
  getAdminList,
  promoteToAdmin,
  demoteToUser,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/adminApi";

// ── Dashboard ────────────────────────────────────────────────

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getDashboardStats,
  });
};

// ── Users ────────────────────────────────────────────────────

export const useGetAdminUsers = (page: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["admin", "users", page, searchQuery],
    queryFn: () => getAdminUsers(page, searchQuery),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// ── Blogs ────────────────────────────────────────────────────

export const useGetAdminBlogs = (page: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["admin", "blogs", page, searchQuery],
    queryFn: () => getAdminBlogs(page, searchQuery),
  });
};

export const useAdminDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blogId: string) => adminDeleteBlog(blogId),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// ── Admins ───────────────────────────────────────────────────

export const useGetAdminList = (page: number) => {
  return useQuery({
    queryKey: ["admin", "admins", page],
    queryFn: () => getAdminList(page),
  });
};

export const usePromoteToAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => promoteToAdmin(userId),
    onSuccess: () => {
      toast.success("User promoted to admin successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDemoteToUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => demoteToUser(userId),
    onSuccess: () => {
      toast.success("Admin demoted to user successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// ── Categories ───────────────────────────────────────────────

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
