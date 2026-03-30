import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentCreateSchema,
  type CommentCreateInput,
} from "../types/commentType";
import { useCreateComment } from "../hooks/useComment";
import { useAuth } from "@/features/auth/useAuth";
import { Link } from "react-router";
const CommentForm = ({ blogId }: { blogId: string }) => {
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentCreateInput>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(CommentCreateSchema),
  });
  const { mutate, isPending } = useCreateComment(blogId);
  const onSubmit = (data: CommentCreateInput) => {
    mutate(data);
    reset();
  };
  return (
    <div>
      <h2 className="text-lg font-bold mb-5">Write A Comment</h2>
      {!isAuthenticated && (
        <small className="text-sm text-red-500 mb-5 block">
          Please login to comment.{" "}
          <Link to="/auth/sign-in" className="underline">
            Login
          </Link>
        </small>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Textarea placeholder="Enter comment" {...register("content")} />
          {errors.content && <FieldError>{errors.content.message}</FieldError>}
        </Field>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || !isAuthenticated}
            className="mt-5"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
