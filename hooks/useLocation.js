
"use client";

import { useEffect, useState } from "react";

export default function useLocation() {
  const [location, setLocation] =
    useState(null);

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log(
        "Geolocation not supported"
      );
      return;
    }

    const watchId =
      navigator.geolocation.watchPosition(
        async (position) => {
          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          console.log(
            "GPS Latitude:",
            lat
          );

          console.log(
            "GPS Longitude:",
            lng
          );

          console.log(
            "Accuracy:",
            position.coords.accuracy,
            "meters"
          );

         if (position.coords.accuracy <= 1000) {
  setLocation({
    lat,
    lng,
  });
} else {
  console.log(
    "Ignoring inaccurate location:",
    position.coords.accuracy
  );
};

          try {
            const res =
              await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
              );

            const data =
              await res.json();

            setAddress(
              data.display_name ||
                ""
            );
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log(
            "Location Error:",
            error
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );

    return () => {
      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, []);

  return {
    location,
    address,
  };
}