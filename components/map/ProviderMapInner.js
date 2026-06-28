"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";
import { useMemo } from "react";
import RoutingMachine from "./RoutingMachine";

import "leaflet/dist/leaflet.css";
import {
  customerIcon,
  providerIcon,
} from "./CustomMarkers";

export default function ProviderMapInner({
  provider,
  userLocation,
}) {
  if (!provider || !userLocation) {
    return <p>Loading...</p>;
  }

  const providerLat = Number(provider?.latitude);
  const providerLng = Number(provider?.longitude);

  const userLat = Number(userLocation?.lat);
  const userLng = Number(userLocation?.lng);

  console.log("Provider:", provider);
  console.log("Provider Lat:", providerLat);
  console.log("Provider Lng:", providerLng);
const start = useMemo(
  () => ({
    lat: userLat,
    lng: userLng,
  }),
  [userLat, userLng]
);

const end = useMemo(
  () => ({
    lat: providerLat,
    lng: providerLng,
  }),
  [providerLat, providerLng]
);
  if (
    isNaN(providerLat) ||
    isNaN(providerLng) ||
    isNaN(userLat) ||
    isNaN(userLng)
  ) {

    return (
      <div className="p-5">
        <h2 className="text-red-600 font-bold">
          Provider coordinates not found
        </h2>

        <pre>
          {JSON.stringify(provider, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    
    <MapContainer
      center={[providerLat, providerLng]}
      zoom={13}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

     <Marker
  position={[userLat, userLng]}
  icon={customerIcon}
>
  <Tooltip
  permanent
  direction="top"
  offset={[0, -10]}
>
  <div>
    <strong>
      Customer
    </strong>
    <br />
    Your Location
  </div>
</Tooltip>
</Marker>
    <Marker
  position={[providerLat, providerLng]}
  icon={providerIcon}
>
 <Tooltip
  permanent
  direction="top"
  offset={[0, -10]}
>
  <div>
    <strong>
      {provider.name}
    </strong>
    <br />
    {provider.skill}
    <br />
    {provider.location}
  </div>
</Tooltip>
</Marker>
     {/* <RoutingMachine
  start={{
    lat: userLat,
    lng: userLng,
  }}
  end={{
    lat: providerLat,
    lng: providerLng,
  }}
/> */}
<RoutingMachine
  start={start}
  end={end}
/>
    </MapContainer>
  );
}