import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  ShieldAlert,
  Loader2,
  ArrowDownToLine,
} from "lucide-react";
import { useGetAdminList, useDemoteToUser } from "../hooks/useAdmin";
import { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function roleIcon(role: string) {
  if (role === "super_admin")
    return <ShieldAlert className="size-3.5 text-amber-500" />;
  return <ShieldCheck className="size-3.5 text-violet-500" />;
}

const AdminListPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: adminsData, isLoading } = useGetAdminList(page);
  const { mutate: demoteUser } = useDemoteToUser();
  const { user: authUser } = useAuth();
  const isSuperAdmin = authUser?.role === "super_admin";

  const handlePreviousPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (adminsData?.meta && page < adminsData.meta.totalPages) {
      setPage((p) => p + 1);
    }
  };

  const admins = adminsData?.data || [];
  const meta = adminsData?.meta;

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Admins & Moderators</h3>
          <p className="text-sm text-muted-foreground">
            Manage administrative users and their permissions
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search admins..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardDescription>All administrators and moderators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="hidden sm:grid sm:grid-cols-[1fr_140px_120px_40px] gap-4 px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Admin</span>
                <span>Role</span>
                <span>Joined</span>
                <span />
              </div>
              <Separator className="hidden sm:block" />

              {filteredAdmins.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No admins found.
                </div>
              ) : (
                filteredAdmins.map((admin) => (
                  <div key={admin.id}>
                    <div className="grid sm:grid-cols-[1fr_140px_120px_40px] gap-3 sm:gap-4 items-center px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {admin.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {admin.name}
                            {admin.id === authUser?.id && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-[10px]"
                              >
                                You
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {roleIcon(admin.role)}
                        <span className="text-sm capitalize">
                          {admin.role.replace("_", " ")}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </span>

                      {/* Demote action (only super_admins can demote others) */}
                      {isSuperAdmin && admin.role !== "super_admin" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hidden sm:flex text-amber-500 hover:text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-950"
                              title="Demote to User"
                            >
                              <ArrowDownToLine className="size-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Demote Admin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to demote{" "}
                                <strong>{admin.name}</strong> to a regular user?
                                They will lose access to the admin dashboard.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
                                onClick={() => demoteUser(admin.id)}
                              >
                                Demote
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    <Separator />
                  </div>
                ))
              )}
            </>
          )}
        </CardContent>
        {meta && meta.totalPages > 1 && (
          <CardFooter className="flex items-center justify-between py-4">
            <span className="text-sm text-muted-foreground">
              Showing page {meta.currentPage} of {meta.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === meta.totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AdminListPage;
