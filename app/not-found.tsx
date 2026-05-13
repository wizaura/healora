"use client";

import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Home,
    SearchX,
    Stethoscope,
} from "lucide-react";

export default function NotFound() {

    return (

        <main
            className="
        relative overflow-hidden

        min-h-screen m-4 rounded-2xl

        bg-gradient-to-b from-wellness-bg via-white to-wellness-bg
    "
        >

            {/* SOFT GRADIENT BLOBS */}
            <div
                className="
            absolute top-[-120px] left-[-120px]

            h-[300px] w-[300px]

            rounded-full

            bg-wellness-accent/20

            blur-3xl
        "
            />

            <div
                className="
            absolute bottom-[-150px] right-[-120px]

            h-[320px] w-[320px]

            rounded-full

            bg-navy/10

            blur-3xl
        "
            />

            <div
                className="
            relative z-10

            mx-auto

            flex min-h-screen
            max-w-7xl
            flex-col
            items-center
            justify-center

            p-4
        "
            >

                {/* ICON */}
                <div
                    className="
                relative

                mb-4

                flex h-24 w-24
                items-center justify-center

                rounded-3xl

                bg-white/80

                backdrop-blur

                shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            "
                >

                    {/* INNER GLOW */}
                    <div
                        className="
                    absolute inset-0

                    rounded-3xl

                    bg-gradient-to-br
                    from-wellness-accent/20
                    to-navy/10
                "
                    />

                    <div
                        className="
                    relative z-10

                    flex h-20 w-20
                    items-center justify-center

                    rounded-3xl

                    bg-gradient-to-br
                    from-wellness-accent
                    to-[#4DD4C6]
                "
                    >

                        <SearchX
                            size={38}
                            className="text-white"
                        />

                    </div>

                </div>

                {/* CONTENT */}
                <div className="text-center">

                    <p
                        className="
                    text-sm font-semibold

                    uppercase tracking-[0.3em]

                    text-wellness-accent
                "
                    >
                        404 Error
                    </p>

                    <h1
                        className="
                    mt-3

                    text-5xl font-semibold
                    tracking-[-0.04em]

                    text-navy

                    sm:text-6xl md:text-7xl
                "
                    >
                        Lost in Healora?
                    </h1>

                    <p
                        className="
                    mx-auto mt-3

                    max-w-2xl

                    text-lg leading-relaxed

                    text-slate-500
                "
                    >
                        The page you’re trying to access
                        doesn’t exist or may have been moved.
                        Let’s guide you back to a healthier path.
                    </p>

                </div>

                {/* ACTIONS */}
                <div
                    className="
                mt-6

                flex flex-col sm:flex-row
                items-center
                gap-4
            "
                >

                    <Link
                        href="/"
                        className="
                    inline-flex items-center gap-2

                    rounded-lg

                    bg-navy
                    hover:bg-navy/90

                    px-7 py-3.5

                    text-sm font-semibold text-white

                    shadow-lg shadow-navy/10

                    transition-all duration-200

                    hover:-translate-y-0.5
                "
                    >

                        <Home size={18} />

                        Return Home

                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="
                    inline-flex items-center gap-2

                    rounded-lg

                    border border-slate-200

                    bg-white/80
                    hover:bg-white

                    backdrop-blur

                    px-7 py-3.5

                    text-sm font-semibold text-slate-700

                    transition-all duration-200

                    hover:-translate-y-0.5
                "
                    >

                        <ArrowLeft size={18} />

                        Go Back

                    </button>

                </div>

                {/* QUICK LINKS */}
                <div
                    className="
                mt-6

                grid w-full
                max-w-5xl

                grid-cols-1 gap-5

                md:grid-cols-3
            "
                >

                    {/* CARD */}
                    <Link
                        href="/doctors"
                        className="
                    group

                    rounded-xl

                    border border-white/50

                    bg-white/70

                    p-6

                    backdrop-blur

                    shadow-sm

                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                "
                    >

                        <div
                            className="
                        flex h-14 w-14
                        items-center justify-center

                        rounded-xl

                        bg-wellness-accent/10

                        transition

                        group-hover:bg-wellness-accent
                    "
                        >

                            <Stethoscope
                                size={24}
                                className="
                            text-wellness-accent
                            group-hover:text-white
                        "
                            />

                        </div>

                        <h3
                            className="
                        mt-5

                        text-lg font-semibold

                        text-navy
                    "
                        >
                            Find Doctors
                        </h3>

                        <p
                            className="
                        mt-2

                        text-sm leading-relaxed

                        text-slate-500
                    "
                        >
                            Explore specialists and schedule online consultations.
                        </p>

                    </Link>

                    {/* CARD */}
                    <Link
                        href="/profile/appointments"
                        className="
                    group

                    rounded-xl

                    border border-white/50

                    bg-white/70

                    p-6

                    backdrop-blur

                    shadow-sm

                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                "
                    >

                        <div
                            className="
                        flex h-14 w-14
                        items-center justify-center

                        rounded-xl

                        bg-navy/10

                        transition

                        group-hover:bg-navy
                    "
                        >

                            <CalendarDays
                                size={24}
                                className="
                            text-navy
                            group-hover:text-white
                        "
                            />

                        </div>

                        <h3
                            className="
                        mt-5

                        text-lg font-semibold

                        text-navy
                    "
                        >
                            My Appointments
                        </h3>

                        <p
                            className="
                        mt-2

                        text-sm leading-relaxed

                        text-slate-500
                    "
                        >
                            Check upcoming consultations and appointment history.
                        </p>

                    </Link>

                    {/* CARD */}
                    <Link
                        href="/contact"
                        className="
                    group

                    rounded-xl

                    border border-white/50

                    bg-white/70

                    p-6

                    backdrop-blur

                    shadow-sm

                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                "
                    >

                        <div
                            className="
                        flex h-14 w-14
                        items-center justify-center

                        rounded-xl

                        bg-emerald-100

                        transition

                        group-hover:bg-emerald-500
                    "
                        >

                            <Home
                                size={24}
                                className="
                            text-emerald-700
                            group-hover:text-white
                        "
                            />

                        </div>

                        <h3
                            className="
                        mt-5

                        text-lg font-semibold

                        text-navy
                    "
                        >
                            Contact Support
                        </h3>

                        <p
                            className="
                        mt-2

                        text-sm leading-relaxed

                        text-slate-500
                    "
                        >
                            Reach out to Healora support for assistance anytime.
                        </p>

                    </Link>

                </div>

            </div>

        </main>
    );
}