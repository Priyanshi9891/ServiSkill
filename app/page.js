
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const loginLink = "/auth/login";

  const categories = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Tutor",
    "Developer",
    "Mechanic",
    "Emergency Help",
    "Home Cleaning",
  ];
const colors = [
  "bg-blue-100 shadow-blue-300",
  "bg-green-100 shadow-green-300",
  "bg-yellow-100 shadow-yellow-300",
  "bg-red-100 shadow-red-300",
  "bg-purple-100 shadow-purple-300",
  "bg-cyan-100 shadow-cyan-300",
  "bg-pink-100 shadow-pink-300",
  "bg-orange-100 shadow-orange-300",
];
  return (
    <main className="min-h-screen bg-white">

      
<nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100 shadow-sm">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

    {/* Logo */}
    <h1 className="text-2xl sm:text-3xl tracking-wide text-blue-600 font-medium">
      ServiSkill
    </h1>

    {/* Buttons */}
    <div className="flex items-center gap-2 sm:gap-4">

      <Link
        href="/auth/login"
        className="
          px-4 sm:px-6
          py-2 sm:py-2.5
          rounded-full
          bg-white
          text-black
          text-sm sm:text-base
          border border-gray-200
          shadow-md
          hover:shadow-lg
          hover:-translate-y-1
          transition-all
          whitespace-nowrap
        "
      >
        Login
      </Link>

      <Link
        href="/auth/register"
        className="
          px-4 sm:px-6
          py-2 sm:py-2.5
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          text-white
          text-sm sm:text-base
          shadow-lg
          shadow-blue-200
          hover:scale-105
          transition-all
          whitespace-nowrap
        "
      >
        Register
      </Link>

    </div>

  </div>

</nav>

{/* HERO */}
<section className="relative overflow-hidden py-32 bg-gradient-to-b from-blue-50 via-white to-cyan-50">

  {/* Background Glow */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-30"></div>

  <div className="absolute bottom-10 right-20 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-30"></div>

  <div className="relative max-w-5xl mx-auto text-center px-6">

    <div className="inline-block px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm shadow-sm mb-8">
      ★ Trusted by local communities
    </div>
<h1
  className="
    text-3xl
    md:text-4xl
    font-light
    tracking-wide
    leading-relaxed
  "
>
  <span className="
    bg-gradient-to-r
    from-blue-600
    via-sky-500
    to-cyan-500
    bg-clip-text
    text-transparent
  ">
    Hyperlocal Services & Skill Exchange Platform
  </span>
</h1>

    <p
      className="
      text-xl
      text-black
      mt-8
      max-w-3xl
      mx-auto
      leading-relaxed
      font-normal
    "
    >
      Connect with verified professionals, emergency help,
      learning opportunities and trusted local experts —
      all in one modern platform.
    </p>

    {/* ACTION BUTTONS */}
    <div className="flex justify-center gap-5 mt-14 flex-wrap">

      <Link
        href={loginLink}
        className="
          px-8 py-4
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          text-white
          shadow-xl
          shadow-blue-200
          hover:scale-105
          transition-all
        "
      >
        Find Services
      </Link>

      <Link
        href={loginLink}
        className="
          px-8 py-4
          rounded-full
          bg-gradient-to-r
          from-red-500
          to-pink-500
          text-white
          shadow-xl
          shadow-red-200
          hover:scale-105
          transition-all
        "
      >
        Emergency Help
      </Link>

      <Link
        href={loginLink}
        className="
          px-8 py-4
          rounded-full
          bg-gradient-to-r
          from-green-500
          to-emerald-500
          text-white
          shadow-xl
          shadow-green-200
          hover:scale-105
          transition-all
        "
      >
        Book Service
      </Link>

    </div>

  </div>

</section>
    
{/* POPULAR CATEGORIES */}
<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-2xl md:text-3xl font-medium text-center text-black mb-14 tracking-tight">
      Popular Categories
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {categories.map((item, index) => (
        <div
          key={index}
          className="
            border-2
            border-blue-200
            rounded-3xl
            p-8
            text-center
            bg-white
            shadow-lg
            shadow-blue-100
            hover:shadow-blue-300
            hover:-translate-y-2
            transition-all
            duration-300
          "
        >
          <h3 className="text-lg font-medium text-black mb-2">
            {item}
          </h3>

          <p className="text-sm text-black/70">
            Trusted providers available
          </p>
        </div>
      ))}

    </div>

  </div>

</section>

{/* FEATURES */}
<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-2xl md:text-3xl font-medium text-center text-black mb-14 tracking-tight">
      What You Can Do on ServiSkill
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="border-2 border-blue-200 bg-white rounded-3xl p-8 shadow-lg shadow-blue-100 hover:shadow-blue-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          🛠 Hire Professionals
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          Book trusted service providers instantly.
        </p>
      </div>

      <div className="border-2 border-green-200 bg-white rounded-3xl p-8 shadow-lg shadow-green-100 hover:shadow-green-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          🎓 Learn Skills
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          Learn directly from experienced experts.
        </p>
      </div>

      <div className="border-2 border-red-200 bg-white rounded-3xl p-8 shadow-lg shadow-red-100 hover:shadow-red-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          🚨 Emergency Services
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          Get immediate help when needed.
        </p>
      </div>

      <div className="border-2 border-yellow-200 bg-white rounded-3xl p-8 shadow-lg shadow-yellow-100 hover:shadow-yellow-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          💰 Earn Credits
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          Teach skills and earn platform credits.
        </p>
      </div>

      <div className="border-2 border-purple-200 bg-white rounded-3xl p-8 shadow-lg shadow-purple-100 hover:shadow-purple-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          ⭐ Reviews & Ratings
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          Choose providers confidently.
        </p>
      </div>

      <div className="border-2 border-cyan-200 bg-white rounded-3xl p-8 shadow-lg shadow-cyan-100 hover:shadow-cyan-300 hover:-translate-y-2 transition-all duration-300">
        <h3 className="text-lg font-medium text-black mb-3">
          🤖 AI Matching
        </h3>
        <p className="text-sm text-black/70 leading-relaxed">
          AI suggests the best providers for your task.
        </p>
      </div>

    </div>

  </div>

</section>

{/* HOW IT WORKS */}
<section className="py-24 bg-white">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-2xl md:text-3xl font-medium text-black mb-16 tracking-tight">
      How ServiSkill Works
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

      <div>
        <div className="w-20 h-20 rounded-full border-2 border-blue-300 shadow-lg shadow-blue-200 mx-auto mb-5 flex items-center justify-center text-2xl font-medium text-blue-600">
          1
        </div>

        <h3 className="text-base font-medium text-black">
          Describe Your Need
        </h3>
      </div>

      <div>
        <div className="w-20 h-20 rounded-full border-2 border-green-300 shadow-lg shadow-green-200 mx-auto mb-5 flex items-center justify-center text-2xl font-medium text-green-600">
          2
        </div>

        <h3 className="text-base font-medium text-black">
          Choose Provider
        </h3>
      </div>

      <div>
        <div className="w-20 h-20 rounded-full border-2 border-yellow-300 shadow-lg shadow-yellow-200 mx-auto mb-5 flex items-center justify-center text-2xl font-medium text-yellow-600">
          3
        </div>

        <h3 className="text-base font-medium text-black">
          Book Service
        </h3>
      </div>

      <div>
        <div className="w-20 h-20 rounded-full border-2 border-red-300 shadow-lg shadow-red-200 mx-auto mb-5 flex items-center justify-center text-2xl font-medium text-red-600">
          4
        </div>

        <h3 className="text-base font-medium text-black">
          Get Work Done
        </h3>
      </div>

    </div>

  </div>

</section>
      {/* CTA */}
     {/* CTA + FOOTER COMBINED */}
<section className="relative overflow-hidden py-24 bg-gradient-to-b from-blue-50 via-white to-cyan-50 border-t border-blue-100">

  {/* Background Glow Effects */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[120px] opacity-20"></div>

  <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-200 rounded-full blur-[120px] opacity-20"></div>

  <div className="relative max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight mb-5">
      Ready to Get Started?
    </h2>

    <p className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed mb-10">
      Connect with trusted local professionals, learn new skills,
      earn credits, and grow your community with ServiSkill.
    </p>

    <Link
      href="/auth/register"
      className="
        inline-block
        px-8 py-4
        rounded-full
        bg-gradient-to-r
        from-blue-500
        to-cyan-500
        text-white
        shadow-xl
        shadow-blue-200
        hover:scale-105
        transition-all
      "
    >
      Join ServiSkill
    </Link>

    {/* Divider */}
    <div className="w-24 h-[1px] bg-blue-200 mx-auto my-14"></div>

    {/* Footer Content */}
    <h3 className="text-2xl font-medium tracking-wide bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
      ServiSkill
    </h3>

    <p className="mt-3 text-black/70">
      Hyperlocal Services & Skill Exchange Platform
    </p>

    <p className="mt-6 text-sm text-black/50">
      © 2026 ServiSkill. All Rights Reserved.
    </p>

  </div>

</section>

    </main>
  );
}
