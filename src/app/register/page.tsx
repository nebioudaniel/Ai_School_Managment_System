"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegesterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      await authClient.emailOtpPlugin.sendOtp({ email });
      router.push(`/verify?email=${email}`);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  const continueWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm px-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Register</h1>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={continueWithGoogle}
            >
              Continue with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              or continue with email
            </div>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <Button onClick={handleRegister} className="w-full">
              Send OTP
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
