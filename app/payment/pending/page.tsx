import PaymentPending from "@/components/payment/pending/Main";
import { Suspense } from "react";

export default function PaymentPendingPage() {
    return (
        <div>
            <Suspense fallback={null}>
                <PaymentPending />
            </Suspense>
        </div>
    )
}