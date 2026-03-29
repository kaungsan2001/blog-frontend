import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormValues } from "../types/adminTypes";
import { useCreateCategory, useUpdateCategory } from "../hooks/useAdmin";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { id: string; name: string; description?: string };
}

export function CategoryDialog({
  open,
  onOpenChange,
  initialData,
}: CategoryDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    values: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const { mutate: createCategory, isPending: isCreating } =
    useCreateCategory(onOpenChange);
  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateCategory(onOpenChange);

  const onSubmit = (data: CategoryFormValues) => {
    if (initialData) {
      updateCategory({ id: initialData.id, data });
    } else {
      createCategory(data);
    }
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to your category here. Click save when you're done."
              : "Create a new category for your blog posts."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Technology"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none"
            >
              Description (Optional)
            </label>
            <Textarea
              id="description"
              placeholder="Brief description of this category"
              className="resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating || isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : initialData
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
