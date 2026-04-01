import { useContext, createContext } from "react";
import type { User } from "@/providers/AuthProvider";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>({
  user: null,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
