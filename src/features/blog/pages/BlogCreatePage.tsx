import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCreateSchema, type BlogCreateInput } from "../types/blogType";
import ReactQuill from "react-quill-new";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-quill-new/dist/quill.snow.css";
import { useCreateBlog } from "../hooks/useBlog";
import { useGetAllCategories } from "../hooks/useCategory";

const BlogCreatePage = () => {
  const { data: categories } = useGetAllCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(BlogCreateSchema),
    defaultValues: {
      image: undefined,
      title: "",
      categoryId: "",
      content: "",
      isPublished: false,
    },
  });
  const { mutate: createBlog, isPending } = useCreateBlog();
  const onSubmit = (data: BlogCreateInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("isPublished", data.isPublished.toString());
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    createBlog(formData);
    reset();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Write New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel>Image</FieldLabel>
              <Input type="file" accept="image/*" {...register("image")} />
            </Field>
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

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
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

            <FieldLabel>Publish</FieldLabel>
            <input
              type="checkbox"
              {...register("isPublished")}
              className="w-4 h-4 "
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Blog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default BlogCreatePage;
