import { useGetComments } from "../hooks/useComment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/useAuth";
import { useDeleteComment } from "../hooks/useComment";
import Loading from "@/components/Loading";
const CommentList = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, error } = useGetComments(blogId);
  const { user } = useAuth();
  const { mutate: deleteComment } = useDeleteComment(blogId);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold mb-5">Comments</h2>
      <ul className="space-y-5 max-h-[calc(100vh-200px)] overflow-y-scroll">
        {/* no comments */}
        {data?.data.length === 0 && <p>No comments yet</p>}

        {/* comments */}
        {data?.data.map((comment) => (
          <li
            key={comment.id}
            className="mb-5 list-none border-b border-secondary pb-5"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-13 w-13">
                <AvatarFallback>
                  {comment.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {comment.author.name}
                </p>

                <small className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
                <p className="text-sm">{comment.content}</p>
              </div>

              <div className="me-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVerticalIcon className="cursor-pointer" size={15} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {user?.id === comment.author.id && (
                        <DropdownMenuItem
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
