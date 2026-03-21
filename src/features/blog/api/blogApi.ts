import api from "@/lib/axios";
import type {
  BlogCreateInput,
  BlogListResponse,
  BlogResponse,
} from "../types/blogType";

export async function getAllBlogs(page: number, query: string) {
  const res = await api.get<BlogListResponse>(
    `/blog?page=${page}&query=${query}`,
  );
  return res.data;
}

export async function createBlog(data: BlogCreateInput) {
  const res = await api.post<BlogResponse>("/blog/create", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function getBlogById(id: string) {
  const res = await api.get<BlogResponse>(`/blog/${id}`);
  return res.data;
}

export async function updateBlog(id: string, data: BlogCreateInput) {
  const res = await api.put<BlogResponse>(`/blog/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
}

export async function deleteBlog(id: string) {
  const res = await api.delete<BlogResponse>(`/blog/${id}`, {
    withCredentials: true,
  });
  return res.data;
}
