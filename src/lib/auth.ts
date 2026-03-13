// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { createClient } from "@supabase/supabase-js";
import { emailOtpPlugin } from "./plugins/emailOtpPlugin";

export const auth = betterAuth({
  plugins: [emailOtpPlugin()],
});

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
