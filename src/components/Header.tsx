import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/features/auth/useAuth";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { List, PenSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const Header = () => {
  const { isAuthenticated, user } = useAuth();
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
        onError: () => {
          setLoading(false);
          toast.error("Failed to sign out");
        },
      },
    });
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            <Link to="/">Blog</Link>
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/user/list" className="flex items-center gap-2">
                Authors
              </Link>
              <Link to="/blog/create" className="flex items-center gap-2">
                <PenSquare size={15} />
                Write
              </Link>
              <Link to="/blog/list" className="flex items-center gap-2">
                <List size={15} />
                Blogs
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
                      onClick={() => navigate(`/user/profile/${user?.id}`)}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate(`/user/settings`)}
                    >
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      disabled={loading}
                    >
                      SignOut
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">Sign In</Link>
              <Link to="/auth/sign-up">Sign Up</Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
