import { Users, FileText, ShieldCheck, FolderTree } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useGetDashboardStats,
  useGetAdminBlogs,
  useGetAdminUsers,
} from "../hooks/useAdmin";
import { Loader2 } from "lucide-react";

function statusVariant(
  isPublished: boolean,
): "default" | "secondary" | "destructive" | "outline" {
  return isPublished ? "default" : "secondary";
}

const DashboardPage = () => {
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStats();
  const { data: blogsData, isLoading: blogsLoading } = useGetAdminBlogs(1, "");
  const { data: usersData, isLoading: usersLoading } = useGetAdminUsers(1, "");

  if (statsLoading || blogsLoading || usersLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const overviewStats = statsData?.data;
  const recentBlogs = blogsData?.data?.slice(0, 5) || [];
  const recentUsers = usersData?.data?.slice(0, 5) || [];

  const stats = [
    {
      label: "Total Users",
      value: overviewStats?.totalUsers?.toLocaleString() || "0",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Blogs",
      value: overviewStats?.totalBlogs?.toLocaleString() || "0",
      trend: "up" as const,
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Admins",
      value: overviewStats?.totalAdmins?.toLocaleString() || "0",
      trend: "up" as const,
      icon: ShieldCheck,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Categories",
      value: overviewStats?.totalCategories?.toLocaleString() || "0",
      trend: "down" as const,
      icon: FolderTree,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Stat cards ────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-sm font-medium">
                {stat.label}
              </CardDescription>
              <div className={`rounded-md p-2 ${stat.bg}`}>
                <stat.icon className={`size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main grid  */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent blogs – spans 2 cols on lg */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>
              Latest blog posts across the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBlogs.length === 0 && (
              <p className="text-sm text-muted-foreground">No blogs found.</p>
            )}
            {recentBlogs.map((blog, idx) => (
              <div key={blog.id}>
                <div className="flex items-start gap-3">
                  <Avatar className="mt-0.5">
                    <AvatarFallback>
                      {blog.author?.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{blog.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {blog.author?.name} ·{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant={statusVariant(blog.isPublished)}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                {idx !== recentBlogs.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent users */}
        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>Recently joined members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.length === 0 && (
              <p className="text-sm text-muted-foreground">No users found.</p>
            )}
            {recentUsers.map((user, idx) => (
              <div key={user.id}>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {idx !== recentUsers.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
