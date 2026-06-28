"use client";

import { useSession, signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <p>
        Welcome Admin: {session?.user?.name}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="border p-4 rounded">
          Total Users
        </div>

        <div className="border p-4 rounded">
          Total Providers
        </div>

        <div className="border p-4 rounded">
          Total Bookings
        </div>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}