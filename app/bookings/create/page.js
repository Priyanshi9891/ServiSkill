import { Suspense } from "react";
import CreateBookingContent from "./CreateBookingContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateBookingContent />
    </Suspense>
  );
}