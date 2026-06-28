"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  }

async function updateStatus(id, status) {
  console.log("Booking ID:", id);
  console.log("New Status:", status);

  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  console.log(data);

  loadBookings();
}

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Provider Bookings
      </h1>

      {bookings.map((booking) => (
       <div
  key={booking._id}
  className="border p-4 rounded mb-4"
>
  <h3 className="font-bold">
    {booking.customerName}
  </h3>

  <p>
    Service: {booking.service}
  </p>

  <p>
    Date: {booking.bookingDate}
  </p>

  <p>
    Status:
    <span className="font-bold ml-2">
      {booking.status}
    </span>
  </p>

  <div className="flex gap-2 mt-3">
    <button
      onClick={() =>
        updateStatus(
          booking._id,
          "Accepted"
        )
        
      }
      className="bg-blue-600 text-white px-3 py-2 rounded"
    >
      Accept
    </button>

    <button
      onClick={() =>
        updateStatus(
          booking._id,
          "Completed"
        )
      }
      className="bg-green-600 text-white px-3 py-2 rounded"
    >
      Complete
    </button>
       <Link
      href={`/messages?receiverId=${booking.customerId}`}
      className="bg-purple-600 text-white px-3 py-2 rounded"
    >
      Chat Customer
    </Link>
    <p>Customer Name: {booking.customerName}</p>
<p>Customer Email: {booking.customerEmail}</p>
<p>Customer ID: {booking.customerId}</p>
  </div>
</div>
      ))}
    </div>
  );
}