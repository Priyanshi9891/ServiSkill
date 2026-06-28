"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NotificationsPage() {
  const { data: session } = useSession();

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      loadNotifications();
    }
  }, [session]);
  useEffect(() => {
  if (session?.user?.id) {
    markAsRead();
  }
}, [session]);

  const loadNotifications = async () => {
    const res = await fetch(
      `/api/notifications?userId=${session.user.id}`
    );

    const data = await res.json();

    setNotifications(data);
  };
  const markAsRead = async () => {
  await fetch(
    "/api/notifications/read",
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    }
  );
};

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-10 px-5">

    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              🔔 Notifications
            </h1>

            <p className="mt-2 text-blue-100">
              Stay updated with your latest bookings and activities.
            </p>
          </div>

          <div className="hidden md:flex w-20 h-20 rounded-full bg-white/20 items-center justify-center text-5xl">
            🔔
          </div>

        </div>

      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

          <div className="text-7xl mb-5">
            🔕
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            No Notifications
          </h2>

          <p className="text-gray-600">
            You're all caught up! New notifications will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {notifications.map((item) => (

            <div
              key={item._id}
              className={`relative rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ${
                item.isRead
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-8 border-blue-600"
              }`}
            >

              {!item.isRead && (
                <div className="absolute top-5 right-5 w-4 h-4 rounded-full bg-blue-600 animate-pulse"></div>
              )}

              <div className="p-7">

                <div className="flex items-start gap-5">

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md ${
                      item.isRead
                        ? "bg-gray-100"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    🔔
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between items-start flex-wrap gap-2">

                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.title}
                      </h3>

                      {!item.isRead && (
                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          NEW
                        </span>
                      )}

                    </div>

                    <p className="text-gray-700 mt-3 leading-7">
                      {item.message}
                    </p>

                    <div className="mt-5 flex items-center justify-between flex-wrap gap-4">

                      <div className="text-gray-500 text-sm flex items-center gap-2">
                        🕒
                        {new Date(item.createdAt).toLocaleString()}
                      </div>

                      {item.type === "booking" &&
                        item.relatedId && (
                          <button
                            onClick={() =>
                              (window.location.href = `/bookings/${item.relatedId}`)
                            }
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            📋 View Booking
                          </button>
                        )}

                    </div>

                  </div>

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