
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MessagesContent() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const providerId =
    searchParams.get("providerId");

  const [formData, setFormData] = useState({
    providerId,
    customerName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name,
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function submitReview(e) {
    e.preventDefault();

    
console.log("Provider ID:", formData.providerId);
    const res = await fetch(
      "/api/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Review Added");
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-8">
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
        <h1 className="text-4xl font-bold">
          ⭐ Leave a Review
        </h1>

        <p className="mt-2 text-blue-100">
          Share your experience and help others choose the best service provider.
        </p>
      </div>

      {/* Form */}
      <div className="p-8">

        {/* Customer */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Customer
          </label>

          <div className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-medium">
            👤 {formData.customerName}
          </div>
        </div>

        <form onSubmit={submitReview} className="space-y-6">

          {/* Rating */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Rating
            </label>

            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
            >
              <option value="1">⭐ 1 Star</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Your Review
            </label>

            <textarea
              name="comment"
              value={formData.comment}
              placeholder="Tell others about your experience with the service provider..."
              onChange={handleChange}
              rows={6}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            />
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-blue-700 mb-2">
              💡 Writing Tips
            </h3>

            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Was the provider punctual?</li>
              <li>• How was the quality of the work?</li>
              <li>• Would you recommend this provider?</li>
              <li>• Was the communication professional?</li>
            </ul>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            ⭐ Submit Review
          </button>

        </form>

      </div>

    </div>
  </div>
);
}