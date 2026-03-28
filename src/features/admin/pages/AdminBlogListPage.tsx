import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Trash2 } from "lucide-react";
import { useGetAdminBlogs, useAdminDeleteBlog } from "../hooks/useAdmin";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import CustomPagination from "@/components/CustomPagination";
import Loading from "@/components/Loading";
import { useDebounce } from "@/hooks/useDebounce";

function statusVariant(isPublished: boolean): "default" | "secondary" {
  return isPublished ? "default" : "secondary";
}

const AdminBlogListPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 700);
  const { data: blogsData, isLoading } = useGetAdminBlogs(
    page,
    debouncedSearchQuery,
  );
  const { mutate: deleteBlog } = useAdminDeleteBlog();

  const blogs = blogsData?.data || [];
  const meta = blogsData?.meta;

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">All Blogs</h3>
          <p className="text-sm text-muted-foreground">
            Manage and moderate all blog posts
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              if (page !== 1) {
                setPage(1);
              }
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
          <CardDescription>All blog posts on the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          <>
            {/* Table header */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_100px_100px_100px_40px] gap-4 px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Blog</span>
              <span>Category</span>
              <span>Status</span>
              <span>Date</span>
              <span />
            </div>
            <Separator className="hidden sm:block" />

            {blogs.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No blogs found.
              </div>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id}>
                  <div className="grid sm:grid-cols-[1fr_100px_100px_100px_40px] gap-3 sm:gap-4 items-center px-2 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {blog.author?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        {blog.isPublished ? (
                          <Link
                            to={`/blogs/details/${blog.id}`}
                            className="text-sm font-medium truncate hover:underline"
                          >
                            {blog.title.slice(0, 50) +
                              (blog.title.length > 50 ? "..." : "")}
                          </Link>
                        ) : (
                          <span className="text-sm font-medium truncate">
                            {blog.title.slice(0, 50) +
                              (blog.title.length > 50 ? "..." : "")}
                          </span>
                        )}

                        <p className="text-xs text-muted-foreground">
                          {blog.author?.name || "Unknown Author"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm">
                      {blog.category?.name || "Uncategorized"}
                    </span>
                    <Badge variant={statusVariant(blog.isPublished)}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>

                    {/* Delete action */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hidden sm:flex text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the blog post "<strong>{blog.title}</strong>
                            ".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                            onClick={() => deleteBlog(blog.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Separator />
                </div>
              ))
            )}
          </>
        </CardContent>
        {meta && meta.totalPages > 1 && (
          <CardFooter className="flex items-center justify-between py-4">
            <CustomPagination
              totalPages={meta.totalPages}
              page={meta.currentPage}
              setPage={setPage}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AdminBlogListPage;
