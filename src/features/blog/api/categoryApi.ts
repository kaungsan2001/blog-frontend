import api from "@/lib/axios";
import type { CategoriesResponse } from "../types/categoryType";

export async function getAllCategories(search?: string) {
  const res = await api.get<CategoriesResponse>(
    `/categories?search=${search}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}
