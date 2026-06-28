"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function RegisterPage() {
  const router = useRouter();
const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful");
        router.push("/auth/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-cyan-50 px-4 relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-30"></div>

    <div className="absolute bottom-10 right-20 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-30"></div>

    <form
      onSubmit={handleSubmit}
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
      {/* Header */}
      <div className="text-center mb-8">

        <h1 className="text-3xl font-medium tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            ServiSkill
          </span>
        </h1>

        <p className="text-black/70 mt-3">
          Create your account and get started.
        </p>

      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm text-black mb-2">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
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
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-black mb-2">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
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
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
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

      {/* Role */}
      <div className="mb-6">
        <label className="block text-sm text-black mb-2">
          Account Type
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            text-black
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
      </div>

      {/* Register Button */}
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
        Register
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-black/70 mt-6">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-cyan-600 font-medium"
        >
          Login here
        </Link>
      </p>

    </form>
  </div>
);
}