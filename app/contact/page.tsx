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
        </div>
    )
}