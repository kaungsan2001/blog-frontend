import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderTree, Plus, Edit2, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { useGetAllCategories } from "@/features/blog/hooks/useCategory";
import { useDeleteCategory } from "../hooks/useAdmin";
import { CategoryDialog } from "../components/CategoryDialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/Loading";
import type { AdminCategory } from "../types/adminTypes";
import { useDebounce } from "@/hooks/useDebounce";

const AdminCategoryListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(
    null,
  );

  const { data: categoriesResponse, isLoading } =
    useGetAllCategories(debouncedSearchQuery);

  const { mutate: deleteCategory } = useDeleteCategory();

  const categories = categoriesResponse?.data || [];

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (category: AdminCategory) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Categories</h3>
          <p className="text-sm text-muted-foreground">
            Manage blog categories and their assignments
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="sm" className="shrink-0" onClick={handleOpenCreate}>
            <Plus className="size-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories ({categories.length})</CardTitle>
          <CardDescription>Organize blog posts into categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Blogs</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((cat: AdminCategory) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-md bg-emerald-500/10">
                            <FolderTree className="size-4 text-emerald-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{cat.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {cat.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-medium">
                        {cat._count?.blogs || 0}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {new Date(cat.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(cat)}
                            title="Edit Category"
                          >
                            <Edit2 className="size-4 text-muted-foreground" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                                title="Delete Category"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Category?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. "
                                  <strong>{cat.name}</strong>" will be
                                  permanently deleted. Posts under this category
                                  may become uncategorized.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                  onClick={() => deleteCategory(cat.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={editingCategory || undefined}
      />
    </div>
  );
};

export default AdminCategoryListPage;
