
"use client";

import dynamic from "next/dynamic";

const NearbyProvidersMapInner = dynamic(
  () => import("./NearbyProvidersMapInner"),
  {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
  }
);

export default function NearbyProvidersMap(props) {
  return (
    <NearbyProvidersMapInner
      {...props}
    />
  );
}