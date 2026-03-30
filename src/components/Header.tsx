import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/features/auth/useAuth";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { List, Menu, PenSquare, Users, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
const Header = ({
  sideBarOpen,
  setSideBarOpen,
}: {
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () =>
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          navigate("/auth/sign-in");
        },
        onError: (error) => {
          setLoading(false);
          toast.error(error.error.message);
        },
      },
    });
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSideBarOpen(!sideBarOpen)}
            variant={"outline"}
          >
            <Menu size={15} />
          </Button>
          <h1 className="text-xl font-bold">
            <Link to="/">InkLines</Link>
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {(user.role === "admin" || user.role === "super_admin") && (
            <Link
              to="/admin"
              className="items-center gap-2 hidden md:flex lg:flex"
            >
              <ShieldCheck size={15} />
              Admin
            </Link>
          )}
          <Link
            to="/users/list"
            className="items-center gap-2 hidden md:flex lg:flex"
          >
            <Users size={15} />
            Authors
          </Link>
          <Link
            to="/blogs/list"
            className="items-center gap-2 hidden md:flex lg:flex"
          >
            <List size={15} />
            Blogs
          </Link>
          <Link
            to="/blogs/create"
            className="items-center gap-2 hidden md:flex lg:flex"
          >
            <PenSquare size={15} />
            Write
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => navigate(`/users/profile/${user?.id}`)}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/blogs/saved`)}>
                  Saved Blogs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/users/settings`)}>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                  SignOut
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
