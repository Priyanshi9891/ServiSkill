"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function DemoPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const bookingData = JSON.parse(
    decodeURIComponent(searchParams.get("booking") || "{}")
  );

  const amount =
    bookingData.serviceType === "Skill Teaching"
      ? bookingData.creditsRequired
      : 799;

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Demo payment
      const paymentRes = await fetch("/api/payment/demo", {
        method: "POST",
      });

      const payment = await paymentRes.json();

      if (!payment.success) {
        alert(" payment failed.");
        setLoading(false);
        return;
      }

      // Create booking
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const booking = await bookingRes.json();

      setLoading(false);

      if (!booking.success) {
        alert(booking.message);
        return;
      }

      alert(" Payment Successful!");

      if (bookingData.userRole === "provider") {
        router.push("/dashboard/provider");
      } else {
        router.push("/dashboard/customer");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">

          <h1 className="text-3xl font-bold">
             Payment
          </h1>

          

        </div>

        <div className="p-8 space-y-5">

          <div className="bg-blue-50 rounded-xl p-4">

            <p className="text-gray-500">
              Provider
            </p>

            <p className="font-bold text-gray-900">
              {bookingData.providerName}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-gray-500">
              Customer
            </p>

            <p className="font-bold text-gray-900">
              {bookingData.customerName}
            </p>

          </div>

          <div className="bg-yellow-50 rounded-xl p-4">

            <p className="text-gray-500">
              Service
            </p>

            <p className="font-bold text-gray-900">
              {bookingData.service}
            </p>

          </div>

          {bookingData.serviceType === "Professional" ? (

            <div className="bg-purple-50 rounded-xl p-4">

              <p className="text-gray-500">
                 Amount
              </p>

              <p className="text-3xl font-bold text-purple-700">
                ₹799
              </p>

            </div>

          ) : (

            <div className="bg-yellow-100 rounded-xl p-4">

              <p className="text-gray-500">
                Credits Required
              </p>

              <p className="text-3xl font-bold text-yellow-700">
                🪙 {amount}
              </p>

            </div>

          )}


          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition"
          >
            {loading
              ? "Processing Payment..."
              : "Complete Payment"}
          </button>

        </div>

      </div>

    </div>
  );
}