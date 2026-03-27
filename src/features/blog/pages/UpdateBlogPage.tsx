import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCreateSchema, type BlogCreateInput } from "../types/blogType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useUpdateBlog, useGetBlogById } from "../hooks/useBlog";
import { useParams } from "react-router";
import GoBackButton from "@/components/GoBackButton";
import Loading from "@/components/Loading";
import { useGetAllCategories } from "../hooks/useCategory";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogById(id as string);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(BlogCreateSchema),
    values: {
      title: data?.data.title || "",
      categoryId: data?.data.category.id || "",
      content: data?.data.content || "",
      isPublished: data?.data.isPublished || false,
    },
  });

  const { mutate: updateBlog, isPending } = useUpdateBlog(id as string);
  const onSubmit = (data: BlogCreateInput) => {
    updateBlog(data);
    reset();
  };
  if (isLoading || isCategoriesLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
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

              <Select
                defaultValue={data?.data.category.id}
                onValueChange={(value) => setValue("categoryId", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.data.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.categoryId && (
                <FieldError>{errors.categoryId.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Content</FieldLabel>

              <ReactQuill
                theme="snow"
                defaultValue={data?.data.content}
                onChange={(value) => setValue("content", value)}
              />

              {errors.content && (
                <FieldError>{errors.content.message}</FieldError>
              )}
            </Field>

            <FieldLabel>Publish</FieldLabel>
            <input
              type="checkbox"
              {...register("isPublished")}
              className="w-4 h-4 "
            />
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
