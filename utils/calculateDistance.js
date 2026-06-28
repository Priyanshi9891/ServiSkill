

import { getDistance } from "geolib";

export default function calculateDistance(
  customerLat,
  customerLng,
  providerLat,
  providerLng
) {
  if (
    customerLat == null ||
    customerLng == null ||
    providerLat == null ||
    providerLng == null
  ) {
    return "0";
  }

  const distanceInMeters = getDistance(
  {
    latitude: Number(customerLat),
    longitude: Number(customerLng),
  },
  {
    latitude: Number(providerLat),
    longitude: Number(providerLng),
  }
);

if (distanceInMeters < 1000) {
  return `${distanceInMeters} m`;
}

return `${(distanceInMeters / 1000).toFixed(1)} km`;
}