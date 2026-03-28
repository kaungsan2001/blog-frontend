import { useState, useEffect } from "react";
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

export interface CategoryFormValues {
  name: string;
  description?: string;
}

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CategoryFormValues) => void;
  initialData?: { name: string; description?: string };
  isSubmitting?: boolean;
}

export function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isSubmitting,
}: CategoryDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      if (initialData) {
        setName(initialData.name);
        setDescription(initialData.description || "");
      } else {
        setName("");
        setDescription("");
      }
      setError("");
    }
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    setError("");
    onSubmit({ name, description });
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

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Technology"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
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
