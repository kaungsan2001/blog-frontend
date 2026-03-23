import Header from "@/components/Header";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/features/auth/useAuth";
import Loading from "@/components/Loading";

const AuthLayout = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return (
    <div className="pb-30">
      <Header />
      <main className="w-full max-w-5xl mx-auto px-5 py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
