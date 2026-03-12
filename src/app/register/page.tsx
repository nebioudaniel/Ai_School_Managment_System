"use client";
import { autthClient } from "@/lib/auth-cleint";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function RegisterPage() {
  const [email, setEmail] = useState();
  const route = useRouter();

  const startOTPFlow = async () =>
    // sending 6 digit OTP to email
    {
      await authClient.emailOtp.sendVerficationOtp({
        email: email,
        type: "sign-in",
      });
      router.push("/verfiy?email=${email}");
    };

  return (
    <div>
      <div>
        <Navbar />
        <p className="text-center text-400 text-green-400">hello regester</p>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter You email"
          className="border p-2"
        />
        <Button onClick={startOTPFlow}>contiue with email</Button>
      </div>
    </div>
  );
}
