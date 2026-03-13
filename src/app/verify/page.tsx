"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function VerifyPage() {
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
    <div>
      <h1>Verify your email</h1>

      <p>We sent an OTP to {email}</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button onClick={verify}>Verify</button>
    </div>
  );
}
