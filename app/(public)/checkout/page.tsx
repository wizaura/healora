import Checkout from "@/components/checkout/Main";
import CTASection from "@/components/common/CTASection";
import { Suspense } from "react";

export default function CheckoutPage() {
    return (
        <div>
            <Suspense fallback={null}>
                <Checkout />
                <CTASection
                    title="Take the first step towards better health"
                    description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                    showButton={false}
                />
            </Suspense>
        </div>
    )
}