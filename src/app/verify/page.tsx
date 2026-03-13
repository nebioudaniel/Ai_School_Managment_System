"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");

  const verify = async () => {
    try {
      await authClient.emailOtpPlugin.verifyOtp({
        email,
        otp,
      });

      router.push("/onboarding");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm px-6 space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground">We sent an OTP to {email}</p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="text-center text-lg tracking-widest"
          />

          <Button onClick={verify} className="w-full">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
