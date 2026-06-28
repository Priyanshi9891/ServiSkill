"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function EmergencyStatus() {
  const { data: session } =
    useSession();

  const [emergency,
  setEmergency] =
    useState(null);

  useEffect(() => {
    if (
      session?.user?.id
    ) {
      loadEmergency();
    }
  }, [session]);

  const loadEmergency =
    async () => {
      const res =
        await fetch(
          `/api/emergency/customer?customerId=${session.user.id}`
        );

      const data =
        await res.json();

      setEmergency(data);
    };

  if (!emergency)
    return <p>No active emergency</p>;

  return (
    <div className="p-6">
      <h1>
        Emergency Status
      </h1>

      <p>
        Service:
        {
          emergency.serviceType
        }
      </p>

      <p>
        Status:
        {
          emergency.status
        }
      </p>
    </div>
  );
}