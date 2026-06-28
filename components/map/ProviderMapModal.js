"use client";

import dynamic from "next/dynamic";
import calculateDistance from "@/utils/calculateDistance";
const ProviderMap = dynamic(
  () => import("@/components/map/ProviderMap"),
  { ssr: false }
);


export default function ProviderMapModal({
  provider,
  userLocation,
  onClose,
}) {
  if (!provider || !userLocation)
    return null;
const distance =
  userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        provider.latitude,
        provider.longitude
      )
    : "--";

return (
  <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
    <div className="bg-white w-[95%] h-[85%] rounded-xl overflow-hidden flex">

      {/* LEFT MAP */}
      <div className="w-[65%] h-full">
        <ProviderMap
          provider={provider}
          userLocation={userLocation}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[35%] p-5 overflow-y-auto relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          {provider.name}
        </h2>

        <p className="text-lg text-gray-600 mb-4">
          {provider.skill}
        </p>

        <div className="border rounded-lg p-3 text-gray-500 mb-4">
          <p>
            📍 {provider.location}
          </p>

          <p>
            ⭐ {provider.rating || 0}
          </p>
        </div>

        <div className="border rounded-lg text-gray-500 p-3 mb-4">
          <h3 className="font-semibold text-gray-500 mb-2">
            Distance & Route
          </h3>

          <p>
            📏 Distance:
             {distance}
          </p>

        </div>

        <a
          href={`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${provider.latitude},${provider.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          Open in Google Maps
        </a>

      </div>

    </div>
  </div>
);
 }