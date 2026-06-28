"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import NotificationBell from "@/components/common/NotificationBell";
import {
  FaTachometerAlt,
  FaHome,
  FaUserCircle,
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
   FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaTools,
} from "react-icons/fa";

export default function MyDashboard() {
  const { data: session } = useSession();
const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
const [selectedBooking, setSelectedBooking] =
  useState(null);
  useEffect(() => {
    if (session?.user?.email) {
      loadBookings();
    }
  }, [session]);

  async function loadBookings() {
    try {
      const res = await fetch(
        `/api/bookings?customerEmail=${session.user.email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold text-blue-600">
        ServiSkill
      </h1>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name}`}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />

          <span className="font-semibold text-black">
            {session?.user?.name}
          </span>
        </div>

      </div>

    </nav>

    <div className="flex pt-16">

     <div className="relative">

  <aside
    className={`bg-white shadow-lg h-[calc(100vh-64px)] sticky top-16 border-r transition-all duration-300 overflow-hidden ${
      sidebarOpen ? "w-64 p-6" : "w-0 p-0 border-r-0"
    }`}
  >

    {sidebarOpen && (

      <div className="space-y-3">

        <a
          href="#dashboard"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
        >
          <FaTachometerAlt className="text-blue-600 text-lg" />
          Dashboard
        </a>

        <Link
          href="/dashboard/customer"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
        >
          <FaHome className="text-green-600 text-lg" />
          Home
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
        >
          <FaUserCircle className="text-purple-600 text-lg" />
          Profile
        </Link>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="w-full flex items-center gap-3 text-left p-3 rounded-lg text-red-600 font-medium hover:bg-red-100 transition"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>

      </div>

    )}

  </aside>

  {/* Toggle Button */}

  <button
    onClick={() =>
      setSidebarOpen(!sidebarOpen)
    }
    className={`fixed top-24 z-50 bg-white border border-gray-200 shadow-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 ${
      sidebarOpen ? "left-60" : "left-3"
    }`}
  >
    {sidebarOpen ? (
      <FaChevronLeft />
    ) : (
      <FaChevronRight />
    )}
  </button>

</div>
  {/* Main Content */}
<main className="flex-1 bg-gray-100 min-h-screen overflow-y-auto">


    <div className="max-w-7xl mx-auto p-8">

      <div className="min-h-screen">

        {/* Header */}
      <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            My Dashboard
          </h1>

          <p className="text-gray-500">
            Track bookings, chats and reviews
          </p>

        </div>

        {/* Stats */}
       <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Bookings
            </h3>

            <p className="text-3xl font-bold text-gray-600">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-gray-500">
              Accepted
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {
                bookings.filter(
                  (b) => b.status === "Accepted"
                ).length
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-gray-500">
              Completed
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {
                bookings.filter(
                  (b) => b.status === "Completed"
                ).length
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-500">
              {
                bookings.filter(
                  (b) => b.status === "Pending"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Bookings */}
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            My Bookings
          </h2>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl p-10 shadow">
              No bookings found.
            </div>
          ) : (
            <div className="space-y-6">

              {bookings.map((booking) => (
                <div
                  key={booking._id}
                 className="bg-white rounded-3xl shadow-md border hover:shadow-xl transition-all p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between">

                    {/* Left Side */}
                    <div className="flex gap-4">

                 <img
  src={`https://picsum.photos/200?random=${Math.random()}`}
  alt="provider"
  className="w-20 h-20 rounded-full object-cover border"
/>
                      <div>
                        <h3 className="text-xl font-bold text-gray-700">
                          {booking.providerName}
                        </h3>

                        <p className="text-gray-600">
                          {booking.service}
                        </p>

                        <p className="text-gray-500">
                          {booking.bookingDate}
                        </p>
                      </div>

                    </div>

                    {/* Right Side */}
                    <div className="mt-4 md:mt-0">

                      <span
                        className={`px-4 py-2 rounded-full text-white font-semibold
                        ${
                          booking.status === "Completed"
                            ? "bg-green-500"
                            : booking.status === "Accepted"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">

                    <Link
                      href={`/messages/${booking._id}`}
                      className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                    >
                      💬 Chat
                    </Link>

                    {booking.status === "Completed" && (
                      <Link
                        href={`/reviews?providerId=${booking.providerId}`}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                      >
                        ⭐ Review
                      </Link>
                    )}

                   <button
  onClick={() => setSelectedBooking(booking)}
  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-5 py-2 rounded-lg transition"
>
 📋 Booking Details
</button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
        {selectedBooking && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">

      {/* Close Button */}
      <button
        onClick={() =>
          setSelectedBooking(null)
        }
        className="absolute top-4 right-4 text-2xl font-bold text-red-500"
      >
        ✕
      </button>

    <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
  <FaClipboardList className="text-blue-600" />
  Booking Details
</h2>
     <div className="space-y-4 text-gray-900">

  <div className="flex items-center gap-3">
    <FaUser className="text-blue-600" />
    <span>
      <strong>Provider:</strong> {selectedBooking.providerName}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaEnvelope className="text-blue-600" />
    <span>
      <strong>Provider Email:</strong> {selectedBooking.providerEmail}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaUser className="text-green-600" />
    <span>
      <strong>Customer:</strong> {selectedBooking.customerName}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaEnvelope className="text-green-600" />
    <span>
      <strong>Customer Email:</strong> {selectedBooking.customerEmail}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaTools className="text-purple-600" />
    <span>
      <strong>Service:</strong> {selectedBooking.service}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaCalendarAlt className="text-orange-600" />
    <span>
      <strong>Booking Date:</strong> {selectedBooking.bookingDate}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaCheckCircle className="text-green-600" />
    <span>
      <strong>Status:</strong> {selectedBooking.status}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaClock className="text-gray-700" />
    <span>
      <strong>Created:</strong>{" "}
      {new Date(selectedBooking.createdAt).toLocaleString()}
    </span>
  </div>

</div>

    </div>

  </div>
)}
      </div>
         </div>
  </main>
</div>
    </>
  );
}