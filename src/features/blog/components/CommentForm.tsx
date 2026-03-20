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
const CommentForm = ({ blogId }: { blogId: string }) => {
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
      <h2 className="text-2xl font-bold mb-5">Write A Comment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Textarea placeholder="Enter comment" {...register("content")} />
          {errors.content && <FieldError>{errors.content.message}</FieldError>}
        </Field>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="mt-5">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
