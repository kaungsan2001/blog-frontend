import { useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  FolderTree,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Blogs",
    path: "/admin/blogs",
    icon: FileText,
  },
  {
    label: "Admins",
    path: "/admin/admins",
    icon: ShieldCheck,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: FolderTree,
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPage =
    navItems.find(
      (item) =>
        (item.end && location.pathname === item.path) ||
        (!item.end && location.pathname.startsWith(item.path)),
    )?.label ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Admin Panel
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "size-[18px] shrink-0 transition-colors",
                      isActive
                        ? "text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto size-4 opacity-60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Separator />

        {/* Sidebar footer – admin profile */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@blog.com
              </p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link to="/">
                <LogOut className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              {currentPage}
            </h2>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">← Back to Site</Link>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
