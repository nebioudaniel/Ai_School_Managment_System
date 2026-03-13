import { createAuthClient } from "better-auth/client";
import { emailOtpPlugin } from "./plugins/emailOtpPlugin";

export const authClient = createAuthClient({
  plugins: [emailOtpPlugin()],
});
