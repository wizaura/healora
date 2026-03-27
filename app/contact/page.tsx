import CTASection from "@/components/common/CTASection";
import ConsultationInfoSection from "@/components/contact/ConsultationInfo";
import ContactFormSection from "@/components/contact/ContactForm";
import ContactHeader from "@/components/contact/Header";
import ContactMapSection from "@/components/contact/LocationMap";
import ContactMethods from "@/components/contact/Methods";

export default function ContactPage() {
    return (
        <div>
            <ContactHeader />
            <ContactMethods />
            <ContactFormSection />
            <ConsultationInfoSection />
            <ContactMapSection />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}