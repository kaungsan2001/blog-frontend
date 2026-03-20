import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCreateSchema, type BlogCreateInput } from "../types/blogType";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useCreateBlog } from "../hooks/useBlog";

const BlogCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(BlogCreateSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });
  const { mutate: createBlog, isPending } = useCreateBlog();
  const onSubmit = (data: BlogCreateInput) => {
    createBlog(data);
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Write New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <Input
                type="text"
                placeholder="Enter category"
                {...register("category")}
              />
              {errors.category && (
                <FieldError>{errors.category.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <FieldError>{errors.content.message}</FieldError>
              )}
            </Field>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Blog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BlogCreatePage;
