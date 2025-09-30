import { Suspense } from "react";
import TwoStepVerificationPage from "./_page/verifyPage";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TwoStepVerificationPage />
    </Suspense>
  );
}
