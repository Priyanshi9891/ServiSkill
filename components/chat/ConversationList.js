"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConversationList({
  userId,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await fetch(
      "/api/messages/users",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data = await res.json();

    setUsers(data);
  }

  return (
    <div className="border rounded p-3">

      <h2 className="font-bold mb-4">
        Conversations
      </h2>

      {users.map((user) => (
        <Link
          key={user._id}
          href={`/messages?provider=${user._id}`}
          className="block border-b py-2"
        >
          {user.name}
        </Link>
      ))}

    </div>
  );
}