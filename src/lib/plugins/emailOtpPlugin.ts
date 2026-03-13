// src/lib/plugins/emailOtpPlugin.ts
import { createAuthEndpoint } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";

export const emailOtpPlugin = (): BetterAuthPlugin => {
  return {
    id: "email-otp-plugin",
    endpoints: {
      sendOtp: createAuthEndpoint(
        "/email-otp/send",
        {
          method: "POST",
        },
        async (ctx) => {
          const { email } = await ctx.body; // get email from request
          // send OTP logic here
          return ctx.json({ success: true, email });
        },
      ),
    },
  };
};
