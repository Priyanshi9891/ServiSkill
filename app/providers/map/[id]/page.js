"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ProviderMap = dynamic(
  () =>
    import(
      "@/components/map/ProviderMap"
    ),
  {
    ssr: false,
  }
);

export default function ProviderMapPage() {
  const { id } = useParams();

  const [provider, setProvider] =
    useState(null);

  const [userLocation, setUserLocation] =
    useState(null);

  useEffect(() => {
  if (id) {
    loadProvider();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}, [id]);

  async function loadProvider() {
    try {
      const res = await fetch(
        `/api/providers/${id}`
      );

      const data = await res.json();

      setProvider(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!provider || !userLocation) {
    return (
      <p className="p-10">
        Loading Map...
      </p>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Provider Location
      </h1>
      <a
  href={`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${provider.latitude},${provider.longitude}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
>
  Get Directions
</a>
      <ProviderMap
        provider={provider}
        userLocation={userLocation}
      />
    </div>
  );
}