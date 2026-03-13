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
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await authClient.emailOtpPlugin.sendOtp({ email });
      router.push(`/verify?email=${email}`);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm px-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-muted-foreground">
              Enter your email to continue
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full"
            />

            <Button onClick={handleRegister} className="w-full">
              Register
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
