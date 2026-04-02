import Blog from "@/components/blogs/PublicBlogs";
import CTASection from "@/components/common/CTASection";

export default function BlogPage() {
    return (
        <div>
            <Blog />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}