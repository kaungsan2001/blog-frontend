import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: ["user", "admin", "super_admin"], required: false },
      },
    }),
  ],
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
