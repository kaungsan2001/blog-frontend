export type AdminUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  role: "user" | "admin" | "super_admin";
  _count: {
    blogs: number;
    followers: number;
    following: number;
  };
};

export type AdminBlog = {
  id: string;
  title: string;
  image?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  isPublished: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
};

export type DashboardStats = {
  totalUsers: number;
  totalBlogs: number;
  totalAdmins: number;
  totalCategories: number;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

// API response types
export type DashboardStatsResponse = {
  success: boolean;
  message: string;
  data: DashboardStats;
};

export type AdminUserListResponse = {
  success: boolean;
  message: string;
  data: AdminUser[];
  meta: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export type AdminBlogListResponse = {
  success: boolean;
  message: string;
  data: AdminBlog[];
  meta: {
    totalBlogs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export type AdminListResponse = {
  success: boolean;
  message: string;
  data: AdminUser[];
  meta: {
    currentPage: number;
    limit: number;
    totalAdmins: number;
    totalPages: number;
  };
};

export type AdminCategoryResponse = {
  success: boolean;
  message: string;
  data: AdminCategory;
};
