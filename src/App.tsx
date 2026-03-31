import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import SignInPage from "./features/auth/pages/SignInPage.tsx";
import SignUpPage from "./features/auth/pages/SignUpPage.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

const UserListPage = lazy(
  () => import("./features/user/pages/UserListPage.tsx"),
);

const HomePage = lazy(() => import("./features/blog/pages/HomePage.tsx"));
const BlogDetailPage = lazy(
  () => import("./features/blog/pages/BlogDetailPage.tsx"),
);
const BlogCreatePage = lazy(
  () => import("./features/blog/pages/BlogCreatePage.tsx"),
);
const ProfilePage = lazy(() => import("./features/user/pages/ProfilePage.tsx"));
const DashboardPage = lazy(
  () => import("./features/admin/pages/DashboardPage.tsx"),
);
const AdminUserListPage = lazy(
  () => import("./features/admin/pages/AdminUserListPage.tsx"),
);
const AdminBlogListPage = lazy(
  () => import("./features/admin/pages/AdminBlogListPage.tsx"),
);
const AdminListPage = lazy(
  () => import("./features/admin/pages/AdminListPage.tsx"),
);
const AdminCategoryListPage = lazy(
  () => import("./features/admin/pages/AdminCategoryListPage.tsx"),
);
const UpdateBlogPage = lazy(
  () => import("./features/blog/pages/UpdateBlogPage.tsx"),
);
const BlogListPage = lazy(
  () => import("./features/blog/pages/BlogListPage.tsx"),
);
const SettingsPage = lazy(
  () => import("./features/user/pages/SettingsPage.tsx"),
);
const UserSearchPage = lazy(
  () => import("./features/user/pages/UserSearchPage.tsx"),
);
const BlogSearchPage = lazy(
  () => import("./features/blog/pages/BlogSearchPage.tsx"),
);
const SavedBlogsPage = lazy(
  () => import("./features/blog/pages/SavedBlogsPage.tsx"),
);
const FollowerListPage = lazy(
  () => import("./features/user/pages/FollowerListPage.tsx"),
);
const FollowingListPage = lazy(
  () => import("./features/user/pages/FollowingListPage.tsx"),
);
const NotFoundPage = lazy(() => import("./NotFoundPage.tsx"));

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
