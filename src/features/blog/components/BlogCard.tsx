import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Blog } from "../types/blogType";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/useAuth";
import { useDeleteBlog } from "../hooks/useBlog";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { user, isLoading } = useAuth();
  const { mutate: deleteBlog } = useDeleteBlog();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Card key={blog.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{blog.title}</CardTitle>
            <Badge variant="secondary">{blog.category}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreVerticalIcon className="cursor-pointer" size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {user && (
                  <DropdownMenuItem variant="default">Save</DropdownMenuItem>
                )}
                {user?.id === blog.authorId && (
                  <>
                    <DropdownMenuItem variant="default">Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
  );
};

export default BlogCard;
