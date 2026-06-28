"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function EmergencyPage() {
  const { data: session } =
    useSession();

  const [serviceType, setServiceType] =
    useState("");

  const [description, setDescription] =
    useState("");

 const submitEmergency = async () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const res = await fetch(
        "/api/emergency",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            customerId:
              session.user.id,
            customerName:
              session.user.name,
            customerEmail:
              session.user.email,
            serviceType,
            description,
            lat,
            lng,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        alert(
          `Emergency request sent to ${data.providersFound} providers`
        );
      }
    },
    (error) => {
      alert(
        "Please allow location access."
      );
      console.error(error);
    }
  );
};
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-5">
        🚨 Emergency Service
      </h1>

      <select
        value={serviceType}
        onChange={(e) =>
          setServiceType(
            e.target.value
          )
        }
        className="border p-2 w-full mb-3"
      >
        <option value="">
          Select Service
        </option>

        <option>
          Electrician
        </option>

        <option>
          Plumber
        </option>

        <option>
          Mechanic
        </option>

        <option>
          Tutor
        </option>
      </select>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        placeholder="Describe your emergency"
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={submitEmergency}
        className="bg-red-600 text-white px-5 py-2 rounded"
      >
        Send Emergency Request
      </button>
    </div>
  );
}