import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Blog } from "../types/blogType";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
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
  );
};

export default BlogCard;
