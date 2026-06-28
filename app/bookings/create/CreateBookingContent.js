"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

 const providerId =
  searchParams.get("providerId") || "";

const providerName =
  searchParams.get("providerName") || "";

const providerEmail =
  searchParams.get("providerEmail") || "";

const serviceType =
  searchParams.get("serviceType") || "";

const creditsRequired =
  Number(
    searchParams.get("creditsRequired")
  ) || 0;

const skill =
  searchParams.get("skill") || "";

const duration =
  searchParams.get("duration") || "";

const level =
  searchParams.get("level") || "";

  const [formData, setFormData] = useState({
    service: "",
    bookingDate: "",
  });


  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!session?.user) {
//     alert("Please login first");
//     return;
//   }

//   try {

//     // Skill Teaching
//     if (
//       serviceType === "Skill Teaching"
//     ) {

//       const userRes = await fetch(
//         `/api/users/${session.user.id}`
//       );

//       const user =
//         await userRes.json();

//       if (
//         user.credits <
//         creditsRequired
//       ) {
//         alert(
//           "Not enough credits"
//         );
//         return;
//       }

    
//     }

//     const bookingData = {
//       customerId:
//         session.user.id,

//       customerName:
//         session.user.name,

//       customerEmail:
//         session.user.email,

//       providerId,
//       providerName,
//       providerEmail,

//       serviceType,

//       creditsRequired,

//       service:
//     serviceType === "Skill Teaching"
//       ? skill
//       : formData.service,

//   bookingDate:
//     serviceType === "Skill Teaching"
//       ? new Date().toISOString()
//       : formData.bookingDate,
//     };

//     const res = await fetch(
//       "/api/bookings",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify(
//           bookingData
//         ),
//       }
//     );

//     const data =
//       await res.json();

//     if (data.success) {

//       alert(
//         serviceType ===
//           "Skill Teaching"
//           ? `${creditsRequired} credits deducted`
//           : "Booking Created"
//       );

//      if (session.user.role === "provider") {
//   router.push("/dashboard/provider");
// } else {
//   router.push("/dashboard/customer");
// }

//     } else {

//       alert(data.message);

//     }

//   } catch (error) {

//     console.log(error);

//     alert(
//       "Something went wrong"
//     );

//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!session?.user) {
    alert("Please login first");
    return;
  }

  try {
    // Check credits for Skill Teaching
    if (serviceType === "Skill Teaching") {
      const userRes = await fetch(
        `/api/users/${session.user.id}`
      );

      const user = await userRes.json();

      if (user.credits < creditsRequired) {
        alert("Not enough credits");
        return;
      }
    }

    // Prepare booking data
    const bookingData = {
      customerId: session.user.id,
      customerName: session.user.name,
      customerEmail: session.user.email,

      providerId,
      providerName,
      providerEmail,

      serviceType,
      creditsRequired,

      service:
        serviceType === "Skill Teaching"
          ? skill
          : formData.service,

      bookingDate:
        serviceType === "Skill Teaching"
          ? new Date().toISOString()
          : formData.bookingDate,

      // Needed after payment to redirect correctly
      userRole: session.user.role,
    };

    // Redirect to Demo Payment Page
    router.push(
      `/payment/demo?booking=${encodeURIComponent(
        JSON.stringify(bookingData)
      )}`
    );
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};


  if (status === "loading") {
    return (
      <div className="p-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-10 px-5">

    <div className="max-w-4xl mx-auto">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl text-white p-8 mb-8">

        <h1 className="text-4xl font-bold">
          📅 Book a Service
        </h1>

        <p className="mt-2 text-blue-100">
          Confirm your booking details and continue.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Provider & Customer */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Provider */}

          <div className="bg-white rounded-3xl shadow-lg p-6 border">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-3xl text-white shadow-lg">
                👨‍🔧
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Provider
                </h2>

                <p className="text-gray-500">
                  Service Provider Details
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="bg-blue-50 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-bold text-gray-900">
                  {providerName}
                </p>

              </div>

              <div className="bg-blue-50 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-bold text-gray-900 break-all">
                  {providerEmail}
                </p>

              </div>

            </div>

          </div>

          {/* Customer */}

          <div className="bg-white rounded-3xl shadow-lg p-6 border">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-3xl text-white shadow-lg">
                👤
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Customer
                </h2>

                <p className="text-gray-500">
                  Booking Information
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-bold text-gray-900">
                  {session?.user?.name}
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-bold text-gray-900 break-all">
                  {session?.user?.email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Booking Form */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📋 Booking Details
          </h2>

          {serviceType === "Professional" && (
            <div className="space-y-6">

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Service Name
                </label>

                <input
                  type="text"
                  name="service"
                  placeholder="Enter service name"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 p-4 text-gray-900 focus:border-blue-500 focus:outline-none"
                  required
                />

              </div>

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Booking Date
                </label>

                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 p-4 text-gray-900 focus:border-blue-500 focus:outline-none"
                  required
                />

              </div>

            </div>
          )}

          {serviceType === "Skill Teaching" && (

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-3xl p-8">

              <h2 className="text-2xl font-bold text-yellow-700 mb-6">
                📚 Skill Learning Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-white rounded-xl p-5 shadow">

                  <p className="text-gray-500 text-sm">
                    Skill
                  </p>

                  <p className="font-bold text-gray-900">
                    {skill}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5 shadow">

                  <p className="text-gray-500 text-sm">
                    Level
                  </p>

                  <p className="font-bold text-gray-900">
                    {level}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5 shadow">

                  <p className="text-gray-500 text-sm">
                    Duration
                  </p>

                  <p className="font-bold text-gray-900">
                    {duration}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5 shadow">

                  <p className="text-gray-500 text-sm">
                    Credits Required
                  </p>

                  <p className="text-2xl font-bold text-yellow-600">
                    🪙 {creditsRequired}
                  </p>

                </div>

              </div>

              <div className="mt-6 bg-yellow-100 border border-yellow-300 rounded-2xl p-5">

                <p className="text-yellow-800 font-semibold">
                  ⚠️ Credits will be deducted immediately after booking confirmation.
                </p>

              </div>

            </div>

          )}

          {/* Button */}

          <button
            type="submit"
            className={`w-full mt-8 py-4 rounded-2xl text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] ${
              serviceType === "Skill Teaching"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            }`}
          >
            {serviceType === "Skill Teaching"
              ? `📚 Learn Skill (${creditsRequired} Credits)`
              : "🔧 Book Service"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}