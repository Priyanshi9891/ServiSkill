import { Suspense } from "react";
import CreateBookingContent from "./CreateBookingContent";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateBookingContent />
    </Suspense>
  );
}