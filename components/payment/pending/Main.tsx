"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useSearchParams,
    useRouter,
} from "next/navigation";

import api from "@/lib/api";

import {
    CircleCheckBig,
    CircleX,
    LoaderCircle,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import toast from "react-hot-toast";

export default function PaymentPending() {

    const params =
        useSearchParams();

    const router =
        useRouter();

    const sessionId =
        params.get("session_id");

    const entityId =
        params.get("id");

    const entityType =
        params.get("type");

    const [resolvedId, setResolvedId] =
        useState<string | null>(null);

    const [status, setStatus] =
        useState<
            "PENDING"
            | "SUCCESS"
            | "FAILED"
        >("PENDING");

    /* =========================================
       Resolve Stripe Session
    ========================================= */

    useEffect(() => {

        const resolveSession =
            async () => {

                if (entityId) {

                    setResolvedId(
                        entityId
                    );

                    return;
                }

                if (sessionId) {

                    try {

                        const res =
                            await api.get(
                                `/payments/stripe/session/${sessionId}`
                            );

                        setResolvedId(
                            res.data.entityId
                        );

                    } catch (err) {

                        toast.error(
                            "Failed to process payment"
                        );

                        console.error(
                            "Failed to resolve Stripe session",
                            err
                        );

                        setStatus(
                            "FAILED"
                        );
                    }
                }
            };

        resolveSession();

    }, [
        sessionId,
        entityId,
    ]);

    /* =========================================
       Poll Payment Status
    ========================================= */

    useEffect(() => {

        if (
            !resolvedId ||
            !entityType
        ) return;

        const interval =
            setInterval(
                async () => {

                    try {

                        /* ================= APPOINTMENT ================= */

                        if (
                            entityType ===
                            "APPOINTMENT"
                        ) {

                            const res =
                                await api.get(
                                    `/appointments/${resolvedId}/status`
                                );

                            const bookingStatus =
                                res.data.status;

                            if (
                                bookingStatus ===
                                "CONFIRMED"
                            ) {

                                setStatus(
                                    "SUCCESS"
                                );

                                clearInterval(
                                    interval
                                );

                                setTimeout(
                                    () => {

                                        router.replace(

                                            `/payment/success?type=APPOINTMENT&id=${resolvedId}`
                                        );

                                    },
                                    1500
                                );
                            }

                            if (
                                bookingStatus ===
                                "CANCELLED"
                            ) {

                                setStatus(
                                    "FAILED"
                                );

                                clearInterval(
                                    interval
                                );
                            }
                        }

                        /* ================= PRESCRIPTION ================= */

                        if (
                            entityType ===
                            "PRESCRIPTION"
                        ) {

                            const res =
                                await api.get(
                                    `/consultations/my-bills/${resolvedId}`
                                );

                            if (
                                res.data.paymentStatus ===
                                "PAID"
                            ) {

                                setStatus(
                                    "SUCCESS"
                                );

                                clearInterval(
                                    interval
                                );

                                setTimeout(
                                    () => {

                                        router.replace(

                                            `/payment/success?type=PRESCRIPTION&id=${resolvedId}`
                                        );

                                    },
                                    1500
                                );
                            }
                        }

                    } catch (err) {

                        console.error(
                            "Polling failed",
                            err
                        );
                    }

                },
                3000
            );

        return () =>
            clearInterval(
                interval
            );

    }, [
        resolvedId,
        entityType,
        router,
    ]);

    return (

        <div className="
            m-4
            min-h-screen
            rounded-2xl

            bg-gradient-to-b
            from-wellness-bg
            via-white
            to-wellness-bg

            py-16
            md:py-43
        ">

            <div className="
                flex items-center
                justify-center
                px-4
            ">

                <div className="
                    w-full
                    max-w-md

                    rounded-[28px]

                    border border-slate-200

                    bg-white

                    shadow-xl
                ">

                    {/* Header */}

                    <div
                        className={`
                            relative
                            rounded-t-[28px]

                            px-6
                            pt-8
                            pb-16

                            text-center

                            ${status === "PENDING"

                                ? "bg-gradient-to-r from-teal-500 to-cyan-500"

                                : status === "SUCCESS"

                                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"

                                    : "bg-gradient-to-r from-red-500 to-rose-500"
                            }
                        `}
                    >

                        {/* Pending */}

                        {status ===
                            "PENDING" && (

                            <>

                                <div className="
                                    mx-auto

                                    flex
                                    h-16 w-16

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-white

                                    shadow-lg
                                ">

                                    <LoaderCircle
                                        className="
                                            h-8 w-8
                                            animate-spin
                                            text-teal-600
                                        "
                                    />

                                </div>

                                <h1 className="
                                    mt-4
                                    text-2xl
                                    font-bold
                                    text-white
                                ">
                                    Confirming Payment
                                </h1>

                                <p className="
                                    mt-2
                                    text-sm
                                    text-white/90
                                ">

                                    Please wait while
                                    we securely verify
                                    your payment.

                                </p>

                            </>
                        )}

                        {/* Success */}

                        {status ===
                            "SUCCESS" && (

                            <>

                                <div className="
                                    mx-auto

                                    flex
                                    h-16 w-16

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-white

                                    shadow-lg
                                ">

                                    <CircleCheckBig
                                        className="
                                            h-8 w-8
                                            text-emerald-600
                                        "
                                    />

                                </div>

                                <h1 className="
                                    mt-4
                                    text-2xl
                                    font-bold
                                    text-white
                                ">

                                    Payment Confirmed

                                </h1>

                                <p className="
                                    mt-2
                                    text-sm
                                    text-white/90
                                ">

                                    Redirecting to
                                    your details page.

                                </p>

                            </>
                        )}

                        {/* Failed */}

                        {status ===
                            "FAILED" && (

                            <>

                                <div className="
                                    mx-auto

                                    flex
                                    h-16 w-16

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-white

                                    shadow-lg
                                ">

                                    <CircleX
                                        className="
                                            h-8 w-8
                                            text-red-500
                                        "
                                    />

                                </div>

                                <h1 className="
                                    mt-4
                                    text-2xl
                                    font-bold
                                    text-white
                                ">

                                    Payment Failed

                                </h1>

                                <p className="
                                    mt-2
                                    text-sm
                                    text-white/90
                                ">

                                    Your payment
                                    could not be confirmed.

                                </p>

                            </>
                        )}

                    </div>

                    {/* Floating Content */}

                    <div className="
                        relative
                        z-10

                        -mt-10

                        px-5
                        pb-5
                    ">

                        <div className="
                            rounded-3xl

                            border border-slate-100

                            bg-white

                            p-5

                            shadow-lg
                        ">

                            {/* Pending */}

                            {status ===
                                "PENDING" && (

                                <div className="
                                    flex
                                    items-start
                                    gap-3

                                    rounded-2xl

                                    bg-teal-50

                                    px-4 py-4
                                ">

                                    <div className="
                                        flex
                                        h-10 w-10
                                        shrink-0

                                        items-center
                                        justify-center

                                        rounded-xl

                                        bg-white
                                    ">

                                        <ShieldCheck
                                            className="
                                                h-5 w-5
                                                text-teal-600
                                            "
                                        />

                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-[#1F2147]
                                        ">

                                            Secure payment verification

                                        </p>

                                        <p className="
                                            mt-1
                                            text-sm
                                            leading-6
                                            text-slate-600
                                        ">

                                            Please don’t close this page while we verify your payment.

                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* Success */}

                            {status ===
                                "SUCCESS" && (

                                <div className="
                                    rounded-2xl

                                    bg-emerald-50

                                    px-4 py-4

                                    text-center
                                ">

                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-emerald-700
                                    ">

                                        Payment successfully verified

                                    </p>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-600
                                    ">

                                        Redirecting you now...

                                    </p>

                                </div>
                            )}

                            {/* Failed */}

                            {status ===
                                "FAILED" && (

                                <div className="
                                    rounded-2xl

                                    bg-red-50

                                    px-4 py-4

                                    text-center
                                ">

                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-red-600
                                    ">

                                        Payment verification failed

                                    </p>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-600
                                    ">

                                        Please try again.

                                    </p>

                                </div>
                            )}

                        </div>

                        {/* Failed Action */}

                        {status ===
                            "FAILED" && (

                            <div className="
                                mt-5
                            ">

                                <button
                                    onClick={() =>
                                        router.replace("/")
                                    }

                                    className="
                                        group

                                        flex
                                        w-full

                                        items-center
                                        justify-center

                                        gap-2

                                        rounded-2xl

                                        bg-[#1F2147]

                                        px-6
                                        py-3.5

                                        text-sm
                                        font-semibold
                                        text-white

                                        transition

                                        hover:bg-[#181A3A]
                                    "
                                >

                                    Go Back

                                    <ArrowRight
                                        className="
                                            h-4 w-4

                                            transition-transform

                                            group-hover:translate-x-1
                                        "
                                    />

                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}