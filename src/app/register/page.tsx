<<<<<<< HEAD

=======
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Navbar } from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  // flow 1 login with email and password
  const handlePasswordLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (!error) {
      // trigger the otp after password  sucsses
      await authClient.emailOTP.sendVerificationOTP({
        email,
        type: "sign-in",
      });
      route.push("/verify?email=${email}");
    }
  };
  // flow 2: continue with email
  const handleOnlyEmail = async () => {
    await authClient.emailOtp.sendVerificationOTP({
      email,
      type: "sign-in",
    });
    route.push("/verify?email=${email}");
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Input
          placeholder=" enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder=" enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
>>>>>>> e036d71 (update auth system and OTP setup)
