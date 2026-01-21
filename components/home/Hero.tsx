"use client";

export default function HomeHero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#9FE2BF]/20">

            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover"
                    style={{

                        backgroundImage: "url('/hero-2.jpeg')",
                        backgroundPosition: "right center",
                    }}
                />

                {/* Texture */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, #0f766e 1px, transparent 0)",
                        backgroundSize: "36px 36px",
                    }}
                />

                {/* CONTENT + FORM */}
                <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-14">

                    {/* Badge */}
                    <span className="my-6 inline-flex w-fit items-center gap-2 rounded-full bg-black/80 px-5 py-2 text-xs font-semibold tracking-wide text-[#ADE8F4]">
                        Trusted Healthcare Platform
                    </span>

                    {/* Title */}
                    <h1 className="text-6xl font-extrabold tracking-tight text-[#0F172A]">
                        Healora
                    </h1>

                    <p className="mt-5 text-2xl font-semibold text-white">
                        Care that begins with trust
                    </p>

                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-gray-200">
                        Book verified doctors, choose flexible time slots, and consult securely —
                        designed for clarity, comfort, and confidence.
                    </p>

                    {/* Trust bullets */}
                    <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-200">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9FE2BF]" />
                            Verified Doctors
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9FE2BF]" />
                            Secure Payments
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9FE2BF]" />
                            Instant Booking
                        </span>
                    </div>

                    {/* BOOKING FORM */}
                    <div className="relative mt-12 max-w-7xl">
                        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[#9FE2BF]/20 via-[#9FE2BF]/20 to-[#9FE2BF]/20 p-6 shadow-xl">

                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#9FE2BF] to-[#ADE8F4]" />

                            <form className="grid grid-cols-1 gap-4 md:grid-cols-6">

                                {/* Specialty */}
                                <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-[#9FE2BF]">
                                    <span className="text-[11px] font-medium text-gray-500">
                                        Specialty
                                    </span>
                                    <select className="border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none">
                                        <option>Select Specialty</option>
                                        <option>Cardiology</option>
                                        <option>Dermatology</option>
                                        <option>General Physician</option>
                                    </select>
                                </div>

                                {/* Doctor */}
                                <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-[#9FE2BF]">
                                    <span className="text-[11px] font-medium text-gray-500">
                                        Doctor
                                    </span>
                                    <select className="border-none bg-transparent text-gray-800 p-0 text-sm focus:outline-none">
                                        <option>Select Doctor</option>
                                        <option>Dr. Anil Kumar</option>
                                        <option>Dr. Sneha Menon</option>
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-[#9FE2BF]">
                                    <span className="text-[11px] font-medium text-gray-500">
                                        Date
                                    </span>
                                    <input
                                        type="date"
                                        className="border-none bg-transparent text-gray-800 p-0 text-sm focus:outline-none"
                                    />
                                </div>

                                {/* Time */}
                                <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-[#9FE2BF]">
                                    <span className="text-[11px] font-medium text-gray-500">
                                        Time
                                    </span>
                                    <select className="border-none bg-transparent text-gray-800 p-0 text-sm focus:outline-none">
                                        <option>Select Slot</option>
                                        <option>09:00 – 09:30</option>
                                        <option>10:00 – 10:30</option>
                                    </select>
                                </div>

                                {/* Mode */}
                                <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-[#9FE2BF]">
                                    <span className="text-[11px] font-medium text-gray-500">
                                        Mode
                                    </span>
                                    <select className="border-none bg-transparent text-gray-800 p-0 text-sm focus:outline-none">
                                        <option>Consultation</option>
                                        <option>Online</option>
                                        <option>In Clinic</option>
                                    </select>
                                </div>

                                {/* CTA */}
                                <button
                                    type="submit"
                                    className="relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#9FE2BF] to-[#ADE8F4] px-6 py-4 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.03]"
                                >
                                    Book Appointment
                                </button>
                            </form>

                            <p className="mt-4 text-center text-xs text-gray-300">
                                Secure payment • Instant confirmation • Trusted doctors
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
