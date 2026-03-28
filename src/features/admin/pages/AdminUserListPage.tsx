import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, ShieldPlus } from "lucide-react";
import {
  useGetAdminUsers,
  useDeleteUser,
  usePromoteToAdmin,
} from "../hooks/useAdmin";
import { useState } from "react";
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
import { useAuth } from "@/features/auth/useAuth";
import CustomPagination from "@/components/CustomPagination";
import Loading from "@/components/Loading";
import { useDebounce } from "@/hooks/useDebounce";

const AdminUserListPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 700);

  const {
    data: usersData,
    isLoading,
    error,
  } = useGetAdminUsers(page, debouncedSearchQuery);
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: promoteUser } = usePromoteToAdmin();
  const { user: authUser } = useAuth();
  const isAdmin =
    authUser?.role === "admin" || authUser?.role === "super_admin";

  const meta = usersData?.meta;

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">All Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage and view all registered users
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              if (page !== 1) {
                setPage(1);
              }
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of all registered users on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="table-cell">Role</TableHead>
                  <TableHead className="table-cell">Blogs</TableHead>
                  <TableHead className="table-cell">Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  usersData?.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user.name}
                              {user.id === authUser?.id && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-[10px]"
                                >
                                  You
                                </Badge>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="table-cell capitalize">
                        {user.role.replace("_", " ")}
                      </TableCell>
                      <TableCell className="table-cell">
                        {user._count?.blogs || 0}
                      </TableCell>
                      <TableCell className="table-cell">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Make Admin Action */}
                          {isAdmin && user.role === "user" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                                  title="Promote to Admin"
                                >
                                  <ShieldPlus className="size-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Promote to Admin?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to promote{" "}
                                    <strong>{user.name}</strong> to an
                                    administrator? They will gain access to the
                                    admin dashboard.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500"
                                    onClick={() => promoteUser(user.id)}
                                  >
                                    Promote
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                          {/* Delete action */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={
                                  user.role === "super_admin" ||
                                  (user.role === "admin" && !isAdmin) ||
                                  user.id === authUser?.id
                                }
                                className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                                title="Delete User"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete{" "}
                                  <strong>{user.name}</strong>'s account and
                                  remove all their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                  onClick={() => deleteUser(user.id)}
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
        {meta && meta.totalPages > 1 && (
          <div className="p-4 border-t">
            <CustomPagination
              totalPages={meta.totalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminUserListPage;
