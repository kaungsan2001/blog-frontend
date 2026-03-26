import api from "@/lib/axios";
import type { CategoriesResponse } from "../types/categoryType";

export async function getAllCategories() {
  const res = await api.get<CategoriesResponse>("/categories", {
    withCredentials: true,
  });
  return res.data;
}
