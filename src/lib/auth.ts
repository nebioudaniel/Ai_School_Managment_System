import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/providers/email-otp";
import { supabaseAdapter } from "@better-auth/supabase-adapter";

export const auth = betterAuth({
  database: supabaseAdapter({
    url: process.env.SUPABASE_URL!,
    token: process.env.SUPERBASE_ROLE_KEY, // UES for service frole back end
  }),
  emailAndPassword: { enabled: true },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        //
      },
    }),
  ],
});
