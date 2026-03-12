import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseUrl: process.env.Better_Auth_Url,
  plugins: [emailOTPClient()],
});
