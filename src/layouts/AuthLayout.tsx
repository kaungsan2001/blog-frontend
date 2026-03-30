import Header from "@/components/Header";
import { Outlet, Navigate, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/useAuth";
import Loading from "@/components/Loading";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { List, PenSquare, Users, Home, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const NavLinks = [
  {
    path: "/",
    label: "Home",
    icon: <Home />,
  },
  {
    path: "/users/list",
    label: "Authors",
    icon: <Users />,
  },
  {
    path: "/blogs/list",
    label: "Blogs",
    icon: <List />,
  },
  {
    path: "/blogs/create",
    label: "Write",
    icon: <PenSquare />,
  },
];

const AuthLayout = () => {
  const { isAuthenticated, isLoading, error, user } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () =>
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          navigate("/auth/sign-in");
        },
        onError: (error) => {
          setLoading(false);
          toast.error(error.error.message);
        },
      },
    });

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
    <div className="pb-30 relative">
      {sideBarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm "
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "absolute -left-64 w-64 transition-transform duration-300 ease-in-out z-50 bg-background h-screen",
          sideBarOpen ? "translate-x-64" : "",
        )}
        onClick={() => setSideBarOpen(false)}
      >
        <div className="py-3">
          <h1 className="font-bold text-2xl text-center">InkLines</h1>
          <Separator />
          <nav className="flex flex-col gap-2 px-3 py-3 ">
            <>
              <UserAvatar
                name={user.name}
                className="w-25 h-25 mx-auto"
                textClassName="text-3xl "
              />
              <h3 className="text-center">{user.name}</h3>
              <p className="text-center text-sm">{user.email}</p>

              <Separator className="bg-secondary border-b" />
              {NavLinks.map((navLink) => (
                <NavLink
                  to={navLink.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )
                  }
                >
                  {navLink.icon}
                  {navLink.label}
                </NavLink>
              ))}
              {(user.role === "admin" || user.role === "super_admin") && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )
                  }
                >
                  <ShieldCheck />
                  Admin
                </NavLink>
              )}
              <Button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full"
              >
                SignOut
              </Button>
            </>
          </nav>
        </div>
      </aside>
      <Header sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
