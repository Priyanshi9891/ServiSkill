"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CreditsPage() {
  const { data: session } = useSession();

  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      loadCredits();
    }
  }, [session]);

  async function loadCredits() {
    try {
      const res = await fetch(
        `/api/credits?userId=${session.user.id}`
      );

      const data = await res.json();

      if (data.success) {
        setCredits(data.credits || 0);
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading Wallet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-black mb-8">
        💰 Credit Wallet
      </h1>

      {/* Wallet Card */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg p-8 mb-8">

        <p className="text-lg ">
          Available Credits
        </p>

        <h2 className="text-6xl font-bold mt-2">
          🪙 {credits}
        </h2>

      </div>

      {/* Credit Rules */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl text-black font-bold mb-4">
          How To Earn Credits
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border text-black rounded-lg p-4">
            Complete Profile
            <span className="float-right text-green-600 font-bold">
              +5
            </span>
          </div>

          <div className="border text-black rounded-lg p-4">
            Welcome Bonus
            <span className="float-right text-green-600 font-bold">
              +50
            </span>
          </div>

          <div className="border rounded-lg text-black p-4">
            Teach Skill Session
            <span className="float-right text-green-600 font-bold">
              +20
            </span>
          </div>

          <div className="border rounded-lg text-black p-4">
            Get 5 Star Review
            <span className="float-right text-green-600 font-bold">
              +5
            </span>
          </div>

        </div>

      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold text-black mb-6">
          Credit History
        </h2>

        {transactions.length === 0 ? (
          <div className="text-gray-500 text-black">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-4">

            {transactions.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>

                  <p className="font-semibold">
                    {item.reason}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

                <div
                  className={`font-bold text-lg ${
                    item.type === "Earned"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.type === "Earned"
                    ? "+"
                    : "-"}
                  {item.amount}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}