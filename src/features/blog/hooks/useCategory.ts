import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categoryApi";

export const useGetAllCategories = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["categories", searchQuery],
    queryFn: () => getAllCategories(searchQuery),
  });
};
