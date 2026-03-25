// hooks/useAuth.ts
import { authClient } from "@/lib/auth-client";
import type { User } from "../user/types/userTypes";

export const useAuth = () => {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    user: session?.user as unknown as User,
    isLoading: isPending,
    error,
    isAuthenticated: !!session,
  };
};
