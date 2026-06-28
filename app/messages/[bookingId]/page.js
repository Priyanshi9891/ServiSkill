"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const { bookingId } = useParams();
  const { data: session } = useSession();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  async function loadBooking() {
    try {
      const res = await fetch(
        `/api/bookings/${bookingId}`
      );

      const data = await res.json();

      setBooking(data);
      console.log("BOOKING DATA", data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!session || !booking) {
    return <p className="p-10">Loading...</p>;
  }

  let receiverId = "";

  if (
    session.user.id === booking.customerId
  ) {
    receiverId = booking.providerId;
  } else {
    receiverId = booking.customerId;
  }

  return (
    <>
    
    
     <ChatWindow
  bookingId={booking._id}
  currentUserId={session.user.id}
  currentUserName={session.user.name}
  receiverId={receiverId}
  receiverName={
    session.user.id === booking.customerId
      ? booking.providerName
      : booking.customerName
  }
/>
</>
    
  );
}