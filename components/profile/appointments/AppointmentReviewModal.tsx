"use client";

import { useState } from "react";

import {
    HeartHandshake,
    Star,
    X,
} from "lucide-react";

import api from "@/lib/api";

type Props = {
    appointment: any;
    onClose: () => void;
    onSubmitted?: () => void;
};

export default function AppointmentReviewModal({
    appointment,
    onClose,
    onSubmitted,
}: Props) {

    const [rating, setRating] =
        useState<number>(0);

    const [hovered, setHovered] =
        useState<number>(0);

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async () => {

        if (!rating) return;

        try {

            setLoading(true);

            await api.post(
                "/reviews/doctor",
                {
                    doctorId:
                        appointment.doctorId,

                    appointmentId:
                        appointment.id,

                    rating,
                }
            );

            onSubmitted?.();

            onClose();

        } finally {
            setLoading(false);
        }
    };

    const handleSkip = async () => {

        try {

            setLoading(true);

            await api.patch(
                `/reviews/doctor/skip/${appointment.id}`
            );

            onClose();

        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            className="
        fixed inset-0 z-[100]

        overflow-y-auto

        bg-black/50
        backdrop-blur-sm

        p-4
    "
        >

            <div
                className="
            flex min-h-full
            items-center justify-center
        "
            >

                <div
                    className="
        relative

        w-full max-w-md

        max-h-[92vh]
        overflow-y-auto

        rounded-[32px]

        bg-white

        shadow-2xl

        scrollbar-hide
    "
                >

                    {/* TOP BG */}
                    <div
                        className="
                        relative

                        overflow-hidden

                        bg-gradient-to-br
                        from-teal-500
                        via-emerald-500
                        to-cyan-500

                        px-8 pt-8 pb-20
                    "
                    >

                        {/* CLOSE */}
                        <button
                            onClick={onClose}
                            className="
                            absolute right-5 top-5

                            flex h-9 w-9
                            items-center justify-center

                            rounded-full

                            bg-white/20
                            hover:bg-white/30

                            text-white

                            transition
                        "
                        >

                            <X size={18} />

                        </button>

                        {/* LOGO */}
                        <div
                            className="
        flex h-16 w-16
        items-center justify-center

        overflow-hidden

        rounded-2xl

        bg-white
        backdrop-blur
    "
                        >

                            <img
                                src="/logo.png"
                                alt="Healora"
                                className="
            h-16 w-16
            object-contain
        "
                            />

                        </div>

                        <h2
                            className="
                            mt-6

                            text-3xl font-semibold
                            tracking-[-0.03em]

                            text-white
                        "
                        >
                            How was your consultation?
                        </h2>

                        <p
                            className="
                            mt-2

                            text-sm leading-relaxed

                            text-white/80
                        "
                        >
                            Your feedback helps Healora improve
                            patient experiences and helps others
                            choose the right doctor.
                        </p>

                    </div>

                    {/* CONTENT */}
                    <div className="relative px-8 pb-8">

                        {/* FLOAT CARD */}
                        <div
                            className="
                            -mt-12

                            rounded-3xl

                            border border-slate-100

                            bg-white

                            p-6

                            shadow-xl
                        "
                        >

                            {/* DOCTOR */}
                            <div className="text-center">

                                <div
                                    className="
        mx-auto

        h-20 w-20

        overflow-hidden

        rounded-full

        ring-4 ring-white

        shadow-lg
    "
                                >

                                    {appointment.doctor?.imageUrl ? (

                                        <img
                                            src={
                                                appointment.doctor.imageUrl
                                            }
                                            alt={
                                                appointment.doctor?.user?.name
                                            }
                                            className="
                h-full w-full
                object-cover
            "
                                        />

                                    ) : (

                                        <div
                                            className="
                flex h-full w-full
                items-center justify-center

                bg-gradient-to-br
                from-slate-100
                to-slate-200

                text-2xl font-semibold
                text-[#1F2147]
            "
                                        >
                                            {
                                                appointment.doctor?.user
                                                    ?.name?.[0]
                                            }
                                        </div>

                                    )}

                                </div>

                                <h3
                                    className="
                                    mt-4

                                    text-lg font-semibold

                                    text-[#1F2147]
                                "
                                >
                                    {
                                        appointment.doctor?.user
                                            ?.name
                                    }
                                </h3>

                                <p
                                    className="
                                    mt-1

                                    text-sm

                                    text-slate-500
                                "
                                >
                                    Rate your consultation experience
                                </p>

                            </div>

                            {/* STARS */}
                            <div
                                className="
                                mt-8

                                flex items-center justify-center gap-3
                            "
                            >

                                {[1, 2, 3, 4, 5].map((star) => {

                                    const active =
                                        star <=
                                        (hovered || rating);

                                    return (

                                        <button
                                            key={star}
                                            onMouseEnter={() =>
                                                setHovered(star)
                                            }
                                            onMouseLeave={() =>
                                                setHovered(0)
                                            }
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            className="
                                            transition-all duration-200

                                            hover:scale-110
                                        "
                                        >

                                            <Star
                                                size={38}
                                                className={
                                                    active
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-slate-300"
                                                }
                                            />

                                        </button>
                                    );
                                })}

                            </div>

                            {/* LABEL */}
                            <p
                                className="
                                mt-5

                                text-center

                                text-sm font-medium

                                text-slate-600
                            "
                            >

                                {
                                    [
                                        "",
                                        "Poor",
                                        "Fair",
                                        "Good",
                                        "Very Good",
                                        "Excellent",
                                    ][rating]
                                }

                            </p>

                            {/* ACTIONS */}
                            <div
                                className="
                                mt-8

                                flex flex-col gap-3
                            "
                            >

                                <button
                                    onClick={handleSubmit}

                                    disabled={
                                        !rating || loading
                                    }

                                    className="
                                    w-full

                                    rounded-2xl

                                    bg-[#1F2147]
                                    hover:bg-[#171933]

                                    px-5 py-3.5

                                    text-sm font-semibold
                                    text-white

                                    shadow-lg shadow-[#1F2147]/10

                                    transition

                                    disabled:opacity-50
                                "
                                >

                                    {loading
                                        ? "Submitting..."
                                        : "Submit Review"}

                                </button>

                                <button
                                    onClick={handleSkip}

                                    disabled={loading}

                                    className="
                                    text-sm font-medium

                                    text-slate-500
                                    hover:text-slate-700

                                    transition
                                "
                                >
                                    Skip for now
                                </button>

                            </div>

                        </div>

                        {/* APP REVIEW CTA */}
                        <div
                            className="
                            mt-6

                            rounded-2xl

                            border border-teal-100

                            bg-teal-50/60

                            p-4
                        "
                        >

                            <p
                                className="
                                text-sm font-medium

                                text-teal-900
                            "
                            >
                                Enjoying Healora?
                            </p>

                            <p
                                className="
                                mt-1

                                text-sm

                                text-teal-700
                            "
                            >
                                You can also share your overall
                                experience with Healora anytime
                                from your profile.
                            </p>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}