import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "./features/auth/pages/SignInPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserListPage from "./features/user/pages/UserListPage";
import HomePage from "./features/blog/pages/HomePage";
import BlogDetailPage from "./features/blog/pages/BlogDetailPage";
import BlogCreatePage from "./features/blog/pages/BlogCreatePage";
import ProfilePage from "./features/user/pages/ProfilePage";
import DashboardPage from "./features/admin/pages/DashboardPage";
import AdminUserListPage from "./features/admin/pages/AdminUserListPage";
import AdminBlogListPage from "./features/admin/pages/AdminBlogListPage";
import AdminListPage from "./features/admin/pages/AdminListPage";
import AdminCategoryListPage from "./features/admin/pages/AdminCategoryListPage";
import UpdateBlogPage from "./features/blog/pages/UpdateBlogPage";
import BlogListPage from "./features/blog/pages/BlogListPage";
import SettingsPage from "./features/user/pages/SettingsPage";
import UserSearchPage from "./features/user/pages/UserSearchPage";
import BlogSearchPage from "./features/blog/pages/BlogSearchPage";
import SavedBlogsPage from "./features/blog/pages/SavedBlogsPage";
import FollowerListPage from "./features/user/pages/FollowerListPage";
import FollowingListPage from "./features/user/pages/FollowingListPage";
import NotFoundPage from "./NotFoundPage";
import AuthProvider from "./providers/AuthProvider";
const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
