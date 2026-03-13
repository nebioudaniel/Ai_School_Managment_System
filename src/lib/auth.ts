// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { createClient } from "@supabase/supabase-js";
import { emailOtpPlugin } from "./plugins/emailOtpPlugin";

export const auth = betterAuth({
  plugins: [emailOtpPlugin()],
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
