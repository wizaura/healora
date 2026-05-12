import AppointmentCheckout from "@/components/checkout/appointment/Main";
import CTASection from "@/components/common/CTASection";

export default function AppointmentCheckoutPage() {
    return (
        <div>
            <AppointmentCheckout />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance, all in one place."
                showButton={false}
            />
        </div>
    )
}