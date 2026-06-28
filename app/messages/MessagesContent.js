"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatWindow from "@/components/chat/ChatWindow";
export default function MessagesContent() {
  const searchParams = useSearchParams();

 const { data: session } = useSession();

  const receiverId =
    searchParams.get("receiverId");
console.log("receiverId =", receiverId);
  if (!session || !receiverId)
    return <p>Loading...</p>;

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-5">
        Chat
      </h1>

      <ChatWindow
        currentUserId={session.user.id}
        receiverId={receiverId}
      />

    </div>
  );
}