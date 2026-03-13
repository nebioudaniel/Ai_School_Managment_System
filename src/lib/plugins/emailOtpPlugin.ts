import { createAuthEndpoint } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";

export const emailOtpPlugin = () => {
  return {
    id: "email-otp-plugin",

    endpoints: {
      sendOtp: createAuthEndpoint(
        "/email-otp-plugin/send-otp",
        { method: "POST" },
        async (ctx) => {
          const { email } = await ctx.body;

          console.log("Sending OTP to:", email);

          // TODO: generate OTP and store it
          return ctx.json({ success: true });
        },
      ),

      verifyOtp: createAuthEndpoint(
        "/email-otp-plugin/verify-otp",
        { method: "POST" },
        async (ctx) => {
          const { email, otp } = await ctx.body;

          console.log("Verify OTP:", email, otp);

          // TODO: check OTP

          return ctx.json({ success: true });
        },
      ),
    },
  } satisfies BetterAuthPlugin;
};
