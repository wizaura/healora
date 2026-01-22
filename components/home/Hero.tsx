"use client";

import CTAButton from "../common/CTAButton";

export default function HomeHero() {
    return (
        <section className="relative m-4 rounded-xl flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-[#ADE8F4]/50">

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:mt-12">
                {/* Left virus */}
                <img
                    src="/virus-left.png"
                    alt=""
                    className="pointer-events-none absolute left-6 top-1/2 w-24 -translate-y-1/2 opacity-70 md:w-32"
                />

                {/* Right virus */}
                <img
                    src="/virus-right.png"
                    alt=""
                    className="pointer-events-none absolute right-6 top-1/2 w-24 -translate-y-1/2 opacity-70 md:w-32"
                />

                {/* Social proof pill */}
                <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
                    <div className="flex -space-x-2">
                        <img src="https://i.pravatar.cc/32?img=12" className="h-7 w-7 rounded-full border-2 border-white" />
                        <img src="https://i.pravatar.cc/32?img=32" className="h-7 w-7 rounded-full border-2 border-white" />
                        <img src="https://i.pravatar.cc/32?img=45" className="h-7 w-7 rounded-full border-2 border-white" />
                        <span className="flex h-7 w-7 items-start justify-center rounded-full bg-orange-500 text-md font-bold text-white">
                            +
                        </span>
                    </div>

                    <span className="text-md text-gray-600">
                        20,000+ happy patients served!
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl font-medium leading-[1.15] tracking-[-0.02em] text-[#1F2147] md:text-7xl antialiased">
                    Wellness starts with care
                    <br />
                    that really listens.
                </h1>

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <CTAButton
                        href="/book"
                        label="Book an Appointment"
                    />
                </div>
            </div>
        </section>
    );
}
