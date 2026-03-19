import api from "@/lib/axios";

export const blogApi = {
  getAll: () => api.get("/blogs"),
};

export default blogApi;
