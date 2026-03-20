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
import UpdateBlogPage from "./features/blog/pages/UpdateBlogPage.tsx";
import BlogListPage from "./features/blog/pages/BlogListPage.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<GuestLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog/list" element={<BlogListPage />} />
          <Route path="blog/detail/:id" element={<BlogDetailPage />} />
          <Route path="blog/create" element={<BlogCreatePage />} />
          <Route path="blog/edit/:id" element={<UpdateBlogPage />} />

          <Route path="user/profile/:id" element={<ProfilePage />} />
          <Route path="user/list" element={<UserListPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
