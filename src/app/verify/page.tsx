"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const verify = async () => {
    try {
      setLoading(true);

      await authClient.emailOtpPlugin.verifyOtp({
        email,
        otp,
      });

      router.push("/plane");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await authClient.emailOtpPlugin.sendOtp({ email });

      setTimer(60);
    } catch (error) {
      alert("Failed to resend OTP");
    }
  };

  const changeEmail = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm px-6 space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground">We sent an OTP to {email}</p>
        </div>

        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="text-center text-lg tracking-widest"
        />

        <Button onClick={verify} className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>

        <div className="space-y-2 text-sm">
          {timer > 0 ? (
            <p className="text-muted-foreground">Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={resendOtp}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          )}

          <button
            onClick={changeEmail}
            className="block text-muted-foreground hover:underline"
          >
            Change Email
          </button>
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
