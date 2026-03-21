import Header from "@/components/Header";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/features/auth/useAuth";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return (
    <div className="pb-30">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
