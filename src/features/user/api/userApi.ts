import api from "@/lib/axios";

export const userApi = {
  getAll: () => api.get("/users"),
};

export default userApi;
