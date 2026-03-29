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
import { Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead className="table-cell">Category</TableHead>
                  <TableHead className="table-cell">Status</TableHead>
                  <TableHead className="table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No blogs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {blog.author?.name?.charAt(0)?.toUpperCase() ||
                                "U"}
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
                      </TableCell>
                      <TableCell className="table-cell">
                        {blog.category?.name || "Uncategorized"}
                      </TableCell>
                      <TableCell className="table-cell">
                        <Badge variant={statusVariant(blog.isPublished)}>
                          {blog.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Delete action */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                                title="Delete Blog"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the blog post "
                                  <strong>{blog.title}</strong>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
