import { Suspense } from "react";
import DemoPaymentContent from "./DemoPaymentContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemoPaymentContent />
    </Suspense>
  );
}