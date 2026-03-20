import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBlogs } from "../hooks/useBlog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

const BlogListPage = () => {
  const { data, isLoading, error } = useGetBlogs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Blog List</h1>
      <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.blogs.map((blog) => (
          <Card key={blog.id} className="mb-4">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <Badge variant="secondary">{blog.category}</Badge>
            </CardHeader>
            <CardContent className="line-clamp-3 text-muted-foreground text-wrap wrap-break-word flex-1">
              <p dangerouslySetInnerHTML={{ __html: blog.content }} />
            </CardContent>
            <CardFooter>
              <Link
                to={`/blog/detail/${blog.id}`}
                className={buttonVariants({ variant: "default" })}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
