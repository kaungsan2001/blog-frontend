import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";
import { AuthContext } from "@/features/auth/hooks/useAuth";

export type User = (typeof authClient.$Infer.Session)["user"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong. Try again later.</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user: data?.user || null, isAuthenticated: !!data?.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
