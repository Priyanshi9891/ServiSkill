
"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  customerIcon,
  providerIcon,
  destinationIcon,
} from "./CustomMarkers";

export default function NearbyProvidersMapInner({
  providers,
  customerLocation,
  destinationLocation,
    customerAddress,

}) {
  const [
    routeCoordinates,
    setRouteCoordinates,
  ] = useState([]);

  useEffect(() => {
    if (
      !customerLocation ||
      !destinationLocation
    ) {
      setRouteCoordinates([]);
      return;
    }

    async function loadRoute() {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${customerLocation.lng},${customerLocation.lat};${destinationLocation.lng},${destinationLocation.lat}?overview=full&geometries=geojson`
        );

        const data =
          await res.json();

        if (
          !data.routes ||
          !data.routes.length
        ) {
          return;
        }

        const coords =
          data.routes[0].geometry.coordinates.map(
            ([lng, lat]) => [
              lat,
              lng,
            ]
          );

        setRouteCoordinates(
          coords
        );
      } catch (error) {
        console.log(error);
      }
    }

    loadRoute();
  }, [
    customerLocation,
    destinationLocation,
  ]);

  if (!customerLocation) {
    return (
      <div className="p-4">
        Loading Map...
      </div>
    );
  }
  if (
    !customerLocation ||
    !customerLocation.lat ||
    !customerLocation.lng
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading location...
      </div>
    );
  }

  return (
    <MapContainer
      center={[
        customerLocation.lat,
        customerLocation.lng,
      ]}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Customer Marker */}
 <Marker
  position={[
    customerLocation.lat,
    customerLocation.lng,
  ]}
  icon={customerIcon}
>
  <Tooltip permanent>
    You
  </Tooltip>

</Marker>

<Circle
  center={[
    customerLocation.lat,
    customerLocation.lng,
  ]}
  radius={400}
  pathOptions={{
    color: "#2563eb",
  }}
/>
      {/* Provider Markers */}
    {providers?.map((provider) => (
  <Marker
    key={provider._id}
    position={[
      Number(provider.latitude),
      Number(provider.longitude),
    ]}
    icon={providerIcon}
  >
    <Tooltip permanent>
      <div>
        <strong>
          {provider.name}
        </strong>
        <br />
        {provider.skill}
      </div>
    </Tooltip>
  </Marker>
))}

      {/* Destination Marker */}
      {/* {destinationLocation && (

<Marker
  position={[
    destinationLocation.lat,
    destinationLocation.lng,
  ]}
  icon={destinationIcon}
>

  <Tooltip permanent>

    <div>

      <strong>
        Destination
      </strong>

      <br />

      {
        destinationLocation.address
      }

    </div>

  </Tooltip>

</Marker>

)} */}
{destinationLocation && (
  <Marker
    position={[
      destinationLocation.lat,
      destinationLocation.lng,
    ]}
    icon={destinationIcon}
  >
    <Tooltip permanent>
      Destination
    </Tooltip>
  </Marker>
  
)
}


      {/* Real Road Route */}
      {routeCoordinates.length >
        0 && (
       <Polyline
  positions={
    routeCoordinates
  }
  pathOptions={{
    color: "#2563eb",
    weight: 6,
  }}
/>
      )}
    </MapContainer>
  );
}