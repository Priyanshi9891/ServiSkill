"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

   if (!result?.error) {
  const res = await fetch("/api/auth/session");
  const session = await res.json();

  if (session?.user?.role === "provider") {
    router.push("/dashboard/provider");
  } else if (session?.user?.role === "admin") {
    router.push("/dashboard/admin");
  } else {
    router.push("/dashboard/customer");
  }
}
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-cyan-50 px-4 relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-30"></div>

    <div className="absolute bottom-10 right-20 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-30"></div>

    <form
      onSubmit={handleLogin}
      className="
        relative
        w-full
        max-w-md
        p-8
        bg-white/80
        backdrop-blur-xl
        border
        border-blue-100
        rounded-3xl
        shadow-2xl
        shadow-blue-100
      "
    >
      {/* Logo */}
      <div className="text-center mb-8">

        <h1 className="text-3xl font-medium tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            ServiSkill
          </span>
        </h1>

        <p className="text-black/70 mt-3">
          Welcome back! Login to continue.
        </p>

      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-black mb-2">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="
             w-full
    px-4
    py-3
    rounded-xl
    border
    border-gray-200
    text-black
    placeholder:text-gray-500
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
          <div className="mb-4">
  <label className="block text-sm text-black mb-2">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="
        w-full
        px-4
        py-3
        pr-12
        rounded-xl
        border
        border-gray-200
        text-black
        placeholder:text-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
      "
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-500
        hover:text-blue-600
      "
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

  </div>
</div>

      {/* Login Button */}
      <button
        type="submit"
        className="
          w-full
          py-3
          rounded-xl
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          text-white
          shadow-lg
          shadow-blue-200
          hover:scale-[1.02]
          transition-all
        "
      >
        Login
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-black/70 mt-6">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:text-cyan-600 font-medium"
        >
          Register here
        </Link>
      </p>

    </form>

  </div>
);
}