"use client";

import {
    Star,
    X,
} from "lucide-react";

import {
    useState,
} from "react";

import api from "@/lib/api";

import toast from "react-hot-toast";

type Props = {

    open: boolean;

    onClose: () => void;
};

export default function AppReviewModal({
    open,
    onClose,
}: Props) {

    const [rating,
        setRating] =
        useState(0);

    const [hovered,
        setHovered] =
        useState(0);

    const [review,
        setReview] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    if (!open) {
        return null;
    }

    const handleSubmitReview =
        async () => {

            if (!rating) {

                toast.error(
                    "Please select a rating"
                );

                return;
            }

            try {

                setLoading(true);

                await api.post(
                    "/reviews/app",
                    {
                        rating,
                        review,
                    }
                );

                toast.success(

                    "Thank you for your feedback"
                );

                onClose();

                setRating(0);

                setReview("");

            } catch (err: any) {

                toast.error(

                    err?.response?.data?.message ||

                    "Failed to submit review"
                );

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

                        w-full max-w-lg

                        overflow-hidden

                        rounded-[32px]

                        bg-white

                        shadow-2xl
                    "
                >

                    {/* TOP */}

                    <div
                        className="
                            relative

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

                            How was your Healora experience?

                        </h2>

                        <p
                            className="
                                mt-2

                                text-sm leading-relaxed

                                text-white/80
                            "
                        >

                            Your feedback helps us improve healthcare experiences.

                        </p>

                    </div>

                    {/* CONTENT */}

                    <div
                        className="
                            relative px-8 pb-8
                        "
                    >

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

                            {/* STARS */}

                            <div
                                className="
                                    flex items-center justify-center gap-3
                                "
                            >

                                {[1, 2, 3, 4, 5].map(
                                    (star) => {

                                        const active =
                                            star <=
                                            (
                                                hovered ||
                                                rating
                                            );

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
                                                    size={40}

                                                    className={
                                                        active

                                                            ? `
                                                                fill-yellow-400
                                                                text-yellow-400
                                                            `

                                                            : `
                                                                text-slate-300
                                                            `
                                                    }
                                                />

                                            </button>
                                        );
                                    }
                                )}

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

                            {/* REVIEW */}

                            <div className="mt-6">

                                <textarea
                                    value={review}

                                    onChange={(e) =>
                                        setReview(
                                            e.target.value
                                        )
                                    }

                                    rows={5}

                                    placeholder="
Share your experience with Healora...
                                    "

                                    className="
                                        w-full

                                        resize-none

                                        rounded-2xl

                                        border border-slate-200

                                        bg-slate-50

                                        px-4 py-3

                                        text-sm

                                        outline-none

                                        transition

                                        focus:border-teal-400
                                        focus:bg-white
                                    "
                                />

                            </div>

                            {/* ACTIONS */}

                            <div
                                className="
                                    mt-6

                                    flex flex-col gap-3
                                "
                            >

                                <button
                                    onClick={
                                        handleSubmitReview
                                    }

                                    disabled={
                                        loading ||
                                        !rating
                                    }

                                    className="
                                        w-full

                                        rounded-2xl

                                        bg-[#1F2147]
                                        hover:bg-[#171933]

                                        px-5 py-3.5

                                        text-sm font-semibold
                                        text-white

                                        transition

                                        disabled:opacity-50
                                    "
                                >

                                    {loading

                                        ? "Submitting..."

                                        : "Submit Review"}

                                </button>

                                <button
                                    onClick={onClose}

                                    className="
                                        text-sm font-medium

                                        text-slate-500
                                        hover:text-slate-700

                                        transition
                                    "
                                >

                                    Maybe later

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}