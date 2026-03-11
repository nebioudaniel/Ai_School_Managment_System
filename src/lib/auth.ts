import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { emailOTP } from "better-auth/plugins";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }: { email: string; otp: string; type: "sign-in" | "email-verification" | "forget-password" | "change-email" }) {
                // In development, we log the code to the console. 
                // We will switch back to Resend once you have your domain verified.
                console.log(`Sending ${type} code to ${email}: ${otp}`);
            },
        }),
    ],
});
