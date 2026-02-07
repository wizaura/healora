import Checkout from "@/components/checkout/Main";
import { Suspense } from "react";

export default function CheckoutPage() {
    return (
        <div>
            <Suspense fallback={null}>
                <Checkout />
            </Suspense>
        </div>
    )
}