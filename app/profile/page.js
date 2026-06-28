"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 flex items-center justify-center p-8">

    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Top Banner */}
      <div className="h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">

          <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">

            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                session?.user?.name || "User"
              )}&background=2563eb&color=fff&size=200`}
              alt="Profile"
              className="w-full h-full rounded-full"
            />

          </div>

        </div>

      </div>

      {/* Profile Content */}
      <div className="pt-20 pb-10 px-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            {session?.user?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to your profile
          </p>

        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition">

            <div className="text-4xl mb-4">
              👤
            </div>

            <p className="text-sm text-gray-500 font-semibold uppercase">
              Full Name
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-2 break-words">
              {session?.user?.name}
            </h3>

          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition">

            <div className="text-4xl mb-4">
              📧
            </div>

            <p className="text-sm text-gray-500 font-semibold uppercase">
              Email Address
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-2 break-all">
              {session?.user?.email}
            </h3>

          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition">

            <div className="text-4xl mb-4">
              🛡️
            </div>

            <p className="text-sm text-gray-500 font-semibold uppercase">
              Account Role
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-2 capitalize">
              {session?.user?.role}
            </h3>

          </div>

        </div>

        <div className="mt-10 text-center">

          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            ✏️ Edit Profile
          </button>

        </div>

      </div>

    </div>

  </div>
);
}