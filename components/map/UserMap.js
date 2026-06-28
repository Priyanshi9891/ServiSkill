"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function UserMap({
  customerLocation,
}) {
  if (!customerLocation) return null;

  return (
    <MapContainer
      center={[
        customerLocation.lat,
        customerLocation.lng,
      ]}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          customerLocation.lat,
          customerLocation.lng,
        ]}
      >
        <Popup>
          Your Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}