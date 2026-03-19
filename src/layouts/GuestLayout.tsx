import Header from "@/components/Header";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "@/features/auth/useAuth";

const GuestLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
