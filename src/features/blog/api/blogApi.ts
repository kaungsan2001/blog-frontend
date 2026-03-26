import api from "@/lib/axios";
import type {
  BlogCreateInput,
  BlogListResponse,
  BlogResponse,
} from "../types/blogType";

export async function getAllBlogs(page: number, categoryId?: string | null) {
  const res = await api.get<BlogListResponse>(
    `/blogs?page=${page}${categoryId ? `&category=${categoryId}` : ""}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function createBlog(data: BlogCreateInput) {
  const res = await api.post<BlogResponse>("/blogs/create", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function getBlogById(id: string) {
  const res = await api.get<BlogResponse>(`/blogs/details/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateBlog(id: string, data: BlogCreateInput) {
  const res = await api.put<BlogResponse>(`/blogs/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
}

export async function deleteBlog(id: string) {
  const res = await api.delete<BlogResponse>(`/blogs/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function searchBlogs(query: string, page: number) {
  const res = await api.get<BlogListResponse>(
    `/blogs/search?q=${query}&page=${page}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function saveBlog(blogId: string) {
  const res = await api.post(
    `/blogs/save/${blogId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function unsaveBlog(blogId: string) {
  const res = await api.delete(`/blogs/unsave/${blogId}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getSavedBlogs(page: number) {
  const res = await api.get<BlogListResponse>(`/blogs/saved?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
}
