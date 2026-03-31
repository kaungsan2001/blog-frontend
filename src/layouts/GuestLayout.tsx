import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "@/features/auth/useAuth";
import Loading from "@/components/Loading";

const GuestLayout = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="px-3 h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
