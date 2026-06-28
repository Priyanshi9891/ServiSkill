"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingDetailsPage() {
  const params = useParams();

  const [booking, setBooking] =
    useState(null);

//   useEffect(() => {
//     fetchBooking();
//   }, []);
useEffect(() => {
  if (params?.id) {
    fetchBooking();
  }
}, [params]);

  const fetchBooking =
    async () => {
      try {
        const res =
          await fetch(
            `/api/bookings/${params.id}`
          );
const data =
  await res.json();

setBooking(
  data.booking || data
);

      } catch (error) {
        console.log(error);
      }
    };

  if (!booking) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Booking Details
      </h1>

      <div className="border p-4 rounded">
        <p>
          <strong>Customer:</strong>{" "}
          {booking.customerName}
        </p>

        <p>
          <strong>Customer Email:</strong>{" "}
          {booking.customerEmail}
        </p>

        <p>
          <strong>Provider Email:</strong>{" "}
          {booking.providerEmail}
        </p>

        <p>
          <strong>Service:</strong>{" "}
          {booking.service}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {booking.status}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            booking.createdAt
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
}