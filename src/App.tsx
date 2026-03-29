import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "./features/auth/pages/SignInPage.tsx";
import UserListPage from "./features/user/pages/UserListPage.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import HomePage from "./features/blog/pages/HomePage.tsx";
import SignUpPage from "./features/auth/pages/SignUpPage.tsx";
import BlogDetailPage from "./features/blog/pages/BlogDetailPage.tsx";
import BlogCreatePage from "./features/blog/pages/BlogCreatePage.tsx";
import ProfilePage from "./features/user/pages/ProfilePage.tsx";
import DashboardPage from "./features/admin/pages/DashboardPage.tsx";
import AdminUserListPage from "./features/admin/pages/AdminUserListPage.tsx";
import AdminBlogListPage from "./features/admin/pages/AdminBlogListPage.tsx";
import AdminListPage from "./features/admin/pages/AdminListPage.tsx";
import AdminCategoryListPage from "./features/admin/pages/AdminCategoryListPage.tsx";
import UpdateBlogPage from "./features/blog/pages/UpdateBlogPage.tsx";
import BlogListPage from "./features/blog/pages/BlogListPage.tsx";
import SettingsPage from "./features/user/pages/SettingsPage.tsx";
import UserSearchPage from "./features/user/pages/UserSearchPage.tsx";
import BlogSearchPage from "./features/blog/pages/BlogSearchPage.tsx";
import SavedBlogsPage from "./features/blog/pages/SavedBlogsPage.tsx";
import FollowerListPage from "./features/user/pages/FollowerListPage.tsx";
import FollowingListPage from "./features/user/pages/FollowingListPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

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
