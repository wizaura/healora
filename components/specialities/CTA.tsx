"use client";

import CTAButton from "../common/CTAButton";

export default function CTASection() {
    return (
        <section className="m-4 rounded-3xl bg-gradient-to-br from-white border border-gray-200 to-white px-6 py-20 text-white">
            <div className="mx-auto max-w-5xl text-center">

                {/* Heading */}
                <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] text-gray-800 md:text-5xl">
                    Take the first step towards better health
                </h2>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl text-gray-700">
                    Book an appointment with trusted doctors and specialists.
                    Personalized care, flexible scheduling, and expert guidance —
                    all in one place.
                </p>

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <CTAButton
                        href="/booking"
                        label="Book Appointment"
                        variant="primary"
                    />
                </div>
            </div>
        </section>
    );
}
