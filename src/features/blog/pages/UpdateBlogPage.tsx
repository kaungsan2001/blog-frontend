import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCreateSchema, type BlogCreateInput } from "../types/blogType";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useUpdateBlog, useGetBlogById } from "../hooks/useBlog";
import { useParams } from "react-router";
import GoBackButton from "@/components/GoBackButton";
import Loading from "@/components/Loading";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBlogById(id as string);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(BlogCreateSchema),
    values: {
      title: data?.data.title || "",
      category: data?.data.category || "",
      content: data?.data.content || "",
    },
  });

  const { mutate: updateBlog, isPending } = useUpdateBlog(id as string);
  const onSubmit = (data: BlogCreateInput) => {
    updateBlog(data);
    reset();
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <GoBackButton />
      <h1 className="text-2xl font-bold text-center my-2">Edit Blog</h1>

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
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default UpdateBlogPage;
