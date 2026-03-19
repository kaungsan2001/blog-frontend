import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/features/auth/useAuth";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated } = useAuth();
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
            <Button onClick={handleSignOut} disabled={loading}>
              Sign Out
            </Button>
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
