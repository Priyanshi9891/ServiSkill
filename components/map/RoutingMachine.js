
"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RoutingMachine({
  start,
  end,
}) {
  const map = useMap();

  useEffect(() => {
    if (
      !map ||
      !start ||
      !end
    )
      return;

    const routingControl =
      L.Routing.control({
        waypoints: [
          L.latLng(
            start.lat,
            start.lng
          ),
          L.latLng(
            end.lat,
            end.lng
          ),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
          itineraryClassName: "hidden-itinerary",
      }).addTo(map);

    routingControl.on(
      "routesfound",
      (e) => {
        const route =
          e.routes[0];

        const distance =
          (
            route.summary
              .totalDistance / 1000
          ).toFixed(2);

        const time =
          Math.round(
            route.summary
              .totalTime / 60
          );

        console.log(
          `Distance: ${distance} km`
        );
        console.log(
          `Time: ${time} minutes`
        );
      }
    );

    return () => {
      try {
        if (
          map &&
          routingControl
        ) {
          routingControl.remove();
        }
      } catch (error) {
        console.log(
          "Routing cleanup:",
          error
        );
      }
    };
  }, [map, start, end]);

  return null;
}