import BlogPage from "@/components/blogs/PublicMainBlog";
import CTASection from "@/components/common/CTASection";

export default function BlogMainPage() {
    return (
        <div>
            <BlogPage />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}