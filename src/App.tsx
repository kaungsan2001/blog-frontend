import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

const UserListPage = lazy(() => import("./features/user/pages/UserListPage"));

const HomePage = lazy(() => import("./features/blog/pages/HomePage"));
const BlogDetailPage = lazy(
  () => import("./features/blog/pages/BlogDetailPage"),
);
const BlogCreatePage = lazy(
  () => import("./features/blog/pages/BlogCreatePage"),
);
const ProfilePage = lazy(() => import("./features/user/pages/ProfilePage"));
const DashboardPage = lazy(
  () => import("./features/admin/pages/DashboardPage"),
);
const AdminUserListPage = lazy(
  () => import("./features/admin/pages/AdminUserListPage"),
);
const AdminBlogListPage = lazy(
  () => import("./features/admin/pages/AdminBlogListPage"),
);
const AdminListPage = lazy(
  () => import("./features/admin/pages/AdminListPage"),
);
const AdminCategoryListPage = lazy(
  () => import("./features/admin/pages/AdminCategoryListPage"),
);
const UpdateBlogPage = lazy(
  () => import("./features/blog/pages/UpdateBlogPage"),
);
const BlogListPage = lazy(() => import("./features/blog/pages/BlogListPage"));
const SettingsPage = lazy(() => import("./features/user/pages/SettingsPage"));
const UserSearchPage = lazy(
  () => import("./features/user/pages/UserSearchPage"),
);
const BlogSearchPage = lazy(
  () => import("./features/blog/pages/BlogSearchPage"),
);
const SavedBlogsPage = lazy(
  () => import("./features/blog/pages/SavedBlogsPage"),
);
const FollowerListPage = lazy(
  () => import("./features/user/pages/FollowerListPage"),
);
const FollowingListPage = lazy(
  () => import("./features/user/pages/FollowingListPage"),
);
const NotFoundPage = lazy(() => import("./NotFoundPage"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<GuestLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<HomePage />} />

          <Route path="blogs/create" element={<BlogCreatePage />} />
          <Route path="blogs/edit/:id" element={<UpdateBlogPage />} />
          <Route path="blogs/saved" element={<SavedBlogsPage />} />
          <Route path="blogs/list" element={<BlogListPage />} />
          <Route path="blogs/details/:id" element={<BlogDetailPage />} />
          <Route path="blogs/search" element={<BlogSearchPage />} />

          <Route path="users/list" element={<UserListPage />} />
          <Route path="users/search" element={<UserSearchPage />} />

          <Route path="users/profile/:id" element={<ProfilePage />} />
          <Route path="users/followers" element={<FollowerListPage />} />
          <Route path="users/following" element={<FollowingListPage />} />
          <Route path="users/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<AdminUserListPage />} />
          <Route path="blogs" element={<AdminBlogListPage />} />
          <Route path="admins" element={<AdminListPage />} />
          <Route path="categories" element={<AdminCategoryListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
