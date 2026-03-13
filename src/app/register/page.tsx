"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

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
    <div>
      <Navbar />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
