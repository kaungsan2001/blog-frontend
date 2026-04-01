import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

const GuestLayout = () => {
  const { user } = useAuth();

  if (user) {
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
