"use client";

export default function HomeHero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#E9FBF7]">
            <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 lg:grid-cols-2">

                {/* Left Content */}
                {/* Left Content */}
                <div className="relative flex w-full flex-col justify-center overflow-hidden px-6 py-24 lg:px-14">

                    {/* Base Gradient */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EAFBF7] via-[#F7FFFD] to-[#E2F6F1]" />

                    {/* Primary Glow */}
                    <div className="absolute -top-32 h-[28rem] w-[28rem] rounded-full bg-teal-400/20 blur-[120px]" />

                    {/* Secondary Glow */}
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-300/20 blur-[100px]" />

                    {/* Soft Texture */}
                    <div
                        className="absolute inset-0 -z-10 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, #0f766e 1px, transparent 0)",
                            backgroundSize: "36px 36px",
                        }}
                    />

                    {/* Content */}
                    <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-xs bg-black font-semibold tracking-wide text-teal-300">
                        Trusted Healthcare Platform
                    </span>

                    <h1 className="text-6xl font-extrabold tracking-tight text-teal-900">
                        Healora
                    </h1>

                    <p className="mt-5 text-2xl font-semibold text-teal-700">
                        Care that begins with trust
                    </p>

                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-gray-700">
                        Book verified doctors, choose flexible time slots, and consult securely —
                        designed for clarity, comfort, and confidence.
                    </p>

                    {/* Trust bullets */}
                    <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-teal-500" />
                            Verified Doctors
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-teal-500" />
                            Secure Payments
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-teal-500" />
                            Instant Booking
                        </span>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative hidden lg:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1600959907703-125ba1374a12?auto=format&fit=crop&w=1600&q=80')",
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[#E9FBF7] via-[#E9FBF7]/60 to-transparent" />
                </div>
            </div>

            {/* Booking Form */}
            <div className="relative mx-auto mb-10 md:-mt-20 max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-[#F6FFFD] to-[#ECFBF7] p-6 shadow-xl">

                    {/* subtle top accent */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />

                    <form className="grid grid-cols-1 gap-4 md:grid-cols-6">

                        {/* Specialty */}
                        <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-teal-500">
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
                        <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-teal-500">
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
                        <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-teal-500">
                            <span className="text-[11px] font-medium text-gray-500">
                                Date
                            </span>
                            <input
                                type="date"
                                className="border-none bg-transparent text-gray-800 p-0 text-sm focus:outline-none"
                            />
                        </div>

                        {/* Time */}
                        <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-teal-500">
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
                        <div className="flex flex-col rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200 focus-within:ring-teal-500">
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
                            className="relative flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
                        >
                            Book Appointment
                        </button>
                    </form>

                    <p className="mt-4 text-center text-xs text-gray-500">
                        Secure payment • Instant confirmation • Trusted doctors
                    </p>
                </div>
            </div>
        </section>
    );
}
