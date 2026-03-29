import api from "@/lib/axios";
import type {
  DashboardStatsResponse,
  AdminUserListResponse,
  AdminBlogListResponse,
  AdminListResponse,
  AdminCategoryResponse,
} from "../types/adminTypes";

// Dashboard
export async function getDashboardStats() {
  const res = await api.get<DashboardStatsResponse>("/admin/stats", {
    withCredentials: true,
  });
  return res.data;
}

// Users
export async function getAdminUsers(page: number, searchQuery: string) {
  const res = await api.get<AdminUserListResponse>(
    `/admin/users?page=${page}&search=${searchQuery}`,
    { withCredentials: true },
  );
  return res.data;
}

export async function deleteUser(userId: string) {
  const res = await api.delete(`/admin/users/${userId}`, {
    withCredentials: true,
  });
  return res.data;
}

// Blogs
export async function getAdminBlogs(page: number, searchQuery: string) {
  const res = await api.get<AdminBlogListResponse>(
    `/admin/blogs?page=${page}&search=${searchQuery}`,
    { withCredentials: true },
  );
  return res.data;
}

export async function adminDeleteBlog(blogId: string) {
  const res = await api.delete(`/admin/blogs/${blogId}`, {
    withCredentials: true,
  });
  return res.data;
}

// Admins
export async function getAdminList(page: number, search: string) {
  const res = await api.get<AdminListResponse>(
    `/admin/admins?page=${page}&search=${search}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function promoteToAdmin(userId: string) {
  const res = await api.put(
    `/admin/admins/promote/${userId}`,
    {},
    { withCredentials: true },
  );
  return res.data;
}

export async function demoteToUser(userId: string) {
  const res = await api.put(
    `/admin/admins/demote/${userId}`,
    {},
    { withCredentials: true },
  );
  return res.data;
}

// Categories
export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post<AdminCategoryResponse>("/admin/categories", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateCategory(
  categoryId: string,
  data: { name: string; description?: string },
) {
  const res = await api.put<AdminCategoryResponse>(
    `/admin/categories/${categoryId}`,
    data,
    { withCredentials: true },
  );
  return res.data;
}

export async function deleteCategory(categoryId: string) {
  const res = await api.delete<AdminCategoryResponse>(
    `/admin/categories/${categoryId}`,
    { withCredentials: true },
  );
  return res.data;
}
