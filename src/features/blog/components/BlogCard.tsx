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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDeleteBlog, useSaveBlog, useUnsaveBlog } from "../hooks/useBlog";
import UserAvatar from "@/components/UserAvatar";
import { useNavigate } from "react-router";
import { AdvancedImage } from "@cloudinary/react";
import { format } from "date-fns";
import { myCld } from "@/lib/cloudinary";
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

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { user } = useAuth();
  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: saveBlog } = useSaveBlog();
  const { mutate: unsaveBlog } = useUnsaveBlog();
  const navigate = useNavigate();

  const img = myCld.image(blog.image);
  return (
    <Card key={blog.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar name={blog.author.name} size="lg" />
            <CardTitle className="text-sm">
              <p>
                <Link to={`/users/profile/${blog.authorId}`}>
                  {blog.author.name}
                </Link>
              </p>
              <small className="text-muted-foreground text-xs">
                {format(blog.createdAt || "", "dd/MM/yyyy")}
              </small>
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreVerticalIcon className="cursor-pointer" size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {blog.isSaved ? (
                  <DropdownMenuItem
                    variant="default"
                    onClick={() => unsaveBlog(blog.id)}
                  >
                    Unsave
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    variant="default"
                    onClick={() => saveBlog(blog.id)}
                  >
                    Save
                  </DropdownMenuItem>
                )}
                {user?.id === blog.authorId && (
                  <>
                    <DropdownMenuItem
                      variant="default"
                      onClick={() => navigate(`/blogs/edit/${blog.id}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="secondary" className="w-full">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this blog?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteBlog(blog.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="line-clamp-3 text-muted-foreground text-wrap wrap-break-word flex-1">
        {blog.image && <AdvancedImage cldImg={img} />}
        <Badge variant="outline" className="my-2">
          {blog.category.name}
        </Badge>
        <h1 className="font-semibold  line-clamp-2 text-xl">{blog.title}</h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          to={`/blogs/details/${blog.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
