
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function ProviderProfile() {
  const { id } = useParams();

  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      const providerRes = await fetch(
        `/api/providers/${id}`
      );

      const providerData =
        await providerRes.json();

      setProvider(providerData);

      const reviewRes = await fetch(
        `/api/reviews?providerId=${id}`
      );

      const reviewData =
        await reviewRes.json();

      setReviews(reviewData);
    } catch (error) {
      console.log(error);
    }
  }

  if (!provider) {
    return <p className="p-10">Loading...</p>;
  }

return (
 <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-6">

  <div className="max-w-7xl mx-auto">

    {/* Header */}

    <div className="flex flex-col md:flex-row justify-between items-center mb-10">

      <div>

        <h2 className="text-4xl font-bold text-gray-900">
          ⭐ Customer Reviews
        </h2>

        <p className="text-gray-600 mt-2">
          Read what customers have shared about this provider.
        </p>

      </div>

      <div className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg">
        <span className="text-lg font-bold">
          {reviews.length} Reviews
        </span>
      </div>

    </div>

    {reviews.length === 0 ? (

      <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

        <div className="text-7xl mb-5">
          ⭐
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          No Reviews Yet
        </h3>

        <p className="text-gray-600">
          This provider has not received any reviews.
        </p>

      </div>

    ) : (

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {reviews.map((review) => (

          <div
            key={review._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >

            {/* Top Header */}

            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-white">
                    {review.customerName}
                  </h3>

                  <p className="text-blue-100 text-sm">
                    Verified Customer
                  </p>

                </div>

                <div className="bg-white text-yellow-500 px-4 py-2 rounded-full font-bold shadow">
                  ⭐ {review.rating}/5
                </div>

              </div>

            </div>

            {/* Body */}

            <div className="p-6">

              <div className="flex justify-center text-2xl mb-5">

                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= review.rating ? "⭐" : "☆"}
                  </span>
                ))}

              </div>

              <div className="bg-gray-50 rounded-2xl border p-5 min-h-[130px]">

                <p className="text-gray-700 leading-7 italic text-center">
                  "{review.comment}"
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</div>
);
}