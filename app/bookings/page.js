"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-bold text-xl">
              {booking.providerName}
            </h2>

            <p>Customer: {booking.customerName}</p>

            <p>Service: {booking.service}</p>

            <p>Date: {booking.bookingDate}</p>

            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}