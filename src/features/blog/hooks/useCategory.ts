import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categoryApi";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
