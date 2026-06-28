
"use client";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(
  () => import("./ProviderMapInner"),
  {
    ssr: false,
  }
);

export default function ProviderMap(props) {
  return <MapWithNoSSR {...props} />;
}