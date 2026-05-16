"use client";

import { paymentLabel } from "@/lib/util";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Video, MapPin, RefreshCw, Trash2, CreditCard } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AppointmentDetailsModal({ appointment, onClose }: any) {

    const router = useRouter();

    const [showCancelConfirm, setShowCancelConfirm] =
        useState(false);

    const [cancelReason, setCancelReason] =
        useState("");

    const [cancelLoading, setCancelLoading] =
        useState(false);

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const slotStart = new Date(appointment.slot.startTimeUTC).getTime();
    const slotEnd = new Date(appointment.slot.endTimeUTC).getTime();
    const now = Date.now();

    const slotPaid =
        appointment.slotPaymentStatus === "PAID";

    const consultationPaid =
        appointment.consultationPaymentStatus === "PAID";

    const slotFailed =
        appointment.slotPaymentStatus === "FAILED";

    const consultationFailed =
        appointment.consultationPaymentStatus === "FAILED";

    const isConfirmed =
        appointment.status === "CONFIRMED";

    const isCancelled =
        appointment.status === "CANCELLED";

    const isPending =
        appointment.status === "PENDING";

    /* ======================================================
       COMPLETE PAYMENT
    ====================================================== */

    const bothPending =
        !isCancelled &&
        isPending &&
        (
            appointment.slotPaymentStatus === "PENDING" ||
            appointment.slotPaymentStatus === "FAILED"
        ) &&
        (
            appointment.consultationPaymentStatus === "PENDING" ||
            appointment.consultationPaymentStatus === "FAILED" ||
            appointment.consultationPaymentStatus === "NOT_REQUIRED"
        );

    /* ======================================================
       CONSULTATION PAYMENT ONLY
    ====================================================== */

    const consultationPending =
        !isCancelled &&
        isConfirmed &&
        slotPaid &&
        (
            appointment.consultationPaymentStatus === "PENDING" ||
            appointment.consultationPaymentStatus === "FAILED" ||
            appointment.consultationPaymentStatus === "NOT_REQUIRED"
        );

    /* ======================================================
       SLOT RETRY ONLY
    ====================================================== */

    const retrySlotPayment =
        !isCancelled &&
        isPending &&
        slotFailed;

    const canJoinMeeting =
        appointment.status === "CONFIRMED" &&              // ✅ only confirmed
        appointment.meetingLink &&                        // ✅ link exists
        now >= slotStart - 10 * 60 * 1000 &&       // ✅ 10 min before
        now <= slotEnd + 5 * 60 * 1000;            // ✅ optional 5 min buffer after

    const canReschedule =
        appointment.status === "CONFIRMED" &&
        appointment.slotPaymentStatus === "PAID" &&
        appointment.consultationPaymentStatus === "PAID" &&
        appointment.rescheduleCount === 0;

    const canCancel =
        !isCancelled &&
        (
            (
                isConfirmed &&
                slotPaid
            ) ||

            (
                isPending &&
                slotPaid
            )
        );

    const handleCancel = async () => {

        try {

            setCancelLoading(true);

            await api.post(
                `/appointments/${appointment.id}/cancel`,
                {
                    reason: cancelReason,
                }
            );

            window.location.reload();

        } catch {

            alert(
                "Failed to cancel appointment"
            );

        } finally {

            setCancelLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="
            fixed inset-0 z-50

            bg-black/40
            backdrop-blur-sm

            flex items-center justify-center

            p-4
        "
                >

                    <motion.div
                        initial={{
                            scale: 0.96,
                            opacity: 0,
                            y: 20,
                        }}

                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        }}

                        exit={{
                            scale: 0.96,
                            opacity: 0,
                            y: 20,
                        }}

                        transition={{
                            duration: 0.2,
                        }}

                        onClick={(e) =>
                            e.stopPropagation()
                        }

                        className="
                bg-white

                rounded-xl
                shadow-2xl

                max-w-2xl
                w-full

                max-h-[90vh]
                overflow-y-auto

                border border-slate-200
            "
                    >

                        {/* HEADER */}
                        <div
                            className="
            sticky top-0 z-10

            flex items-center justify-between

            px-6 py-5

            border-b border-slate-100

            bg-white/90 backdrop-blur
        "
                        >

                            <div>

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Appointment Details
                                </h2>

                                <p className="text-sm text-slate-500 mt-0.5">
                                    Consultation overview & actions
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="
                h-10 w-10
                rounded-xl

                flex items-center justify-center

                hover:bg-slate-100

                transition
            "
                            >
                                <X
                                    size={18}
                                    className="text-slate-500"
                                />
                            </button>

                        </div>

                        <div className="p-6 space-y-5">

                            {/* DOCTOR CARD */}
                            <div
                                className="
                rounded-2xl
                border border-slate-200

                p-5

                flex items-start gap-4
            "
                            >

                                <div
                                    className="
                    h-14 w-14 shrink-0

                    rounded-2xl

                    bg-gradient-to-br
                    from-teal-100
                    to-cyan-100

                    flex items-center justify-center

                    text-lg font-semibold
                    text-teal-700
                "
                                >
                                    {appointment?.doctor?.imageUrl ? (

                                        <img
                                            src={appointment.doctor.imageUrl}
                                            alt={appointment.doctor.user?.name}
                                            className="
            h-full w-full
            object-cover
        "
                                        />

                                    ) : (

                                        appointment.doctor?.user?.name?.charAt(0)

                                    )}
                                </div>

                                <div className="flex-1">

                                    <h3 className="font-semibold text-slate-900">
                                        {appointment.doctor?.user?.name}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {appointment.doctor?.speciality?.name}
                                    </p>

                                    <div
                                        className="
                        mt-3

                        inline-flex items-center gap-2

                        rounded-full

                        bg-slate-100

                        px-3 py-1

                        text-xs text-slate-600
                    "
                                    >
                                        <Calendar size={13} />

                                        {formatDate(
                                            appointment.slot.startTimeUTC
                                        )}
                                    </div>

                                </div>

                            </div>

                            {/* STATUS + PAYMENT */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div
                                    className="
                    rounded-2xl
                    border border-slate-200

                    p-4
                "
                                >

                                    <p className="text-xs text-slate-500">
                                        Status
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900">
                                        {appointment.status}
                                    </p>

                                </div>

                                <div
                                    className="
                    rounded-2xl
                    border border-slate-200

                    p-4
                "
                                >

                                    <p className="text-xs text-slate-500">
                                        Slot Payment
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900">
                                        {paymentLabel(appointment.slotPaymentStatus)}
                                    </p>

                                </div>

                                <div
                                    className="
                    rounded-2xl
                    border border-slate-200

                    p-4
                "
                                >

                                    <p className="text-xs text-slate-500">
                                        Consultation
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900">
                                        {paymentLabel(
                                            appointment.consultationPaymentStatus
                                        )}
                                    </p>

                                </div>

                            </div>

                            {/* CANCELLATION INFO */}
                            {appointment.status === "CANCELLED" && (

                                <div
                                    className="
            rounded-xl

            border border-red-200

            bg-red-50

            p-5
        "
                                >

                                    <div className="flex items-start gap-3">

                                        <div
                                            className="
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center

                    rounded-xl

                    bg-red-100
                "
                                        >

                                            <Trash2
                                                size={18}
                                                className="text-red-600"
                                            />

                                        </div>

                                        <div className="flex-1">

                                            <p
                                                className="
                        text-sm font-semibold

                        text-red-700
                    "
                                            >
                                                Appointment Cancelled
                                            </p>

                                            {appointment.cancelledAt && (

                                                <p
                                                    className="
                            mt-1

                            text-xs

                            text-red-600/80
                        "
                                                >

                                                    Cancelled on{" "}

                                                    {new Date(
                                                        appointment.cancelledAt
                                                    ).toLocaleString()}

                                                </p>

                                            )}

                                            {appointment.cancelReason && (

                                                <div
                                                    className="
                            mt-4

                            rounded-xl

                            border border-red-100

                            bg-white/70

                            p-4
                        "
                                                >

                                                    <p
                                                        className="
                                text-xs font-medium

                                uppercase tracking-wide

                                text-red-500
                            "
                                                    >
                                                        Reason
                                                    </p>

                                                    <p
                                                        className="
                                mt-2

                                text-sm leading-relaxed

                                text-slate-700
                            "
                                                    >
                                                        {
                                                            appointment.cancelReason
                                                        }
                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            )}

                            {/* MEETING */}
                            {appointment.meetingType && (

                                <div
                                    className="
                    rounded-2xl
                    border border-slate-200

                    p-5
                    space-y-4
                "
                                >

                                    <div>

                                        <p className="text-xs text-slate-500">
                                            Meeting Type
                                        </p>

                                        <p className="mt-1 font-medium text-slate-900">
                                            {appointment.meetingType === "GOOGLE" ? "Google Meet" : "Zoom"}
                                        </p>

                                    </div>

                                    {canJoinMeeting ? (

                                        <a
                                            href={appointment.meetingLink}
                                            target="_blank"
                                            className="
                                                inline-flex items-center gap-2

                                                rounded-lg

                                                bg-indigo-600
                                                hover:bg-indigo-700

                                                px-4 py-2

                                                text-sm font-medium text-white

                                                transition
                                            "
                                        >
                                            <Video size={15} />

                                            Join Meeting
                                        </a>

                                    ) : appointment.meetingLink &&
                                        appointment.status === "CONFIRMED" &&
                                        now < slotStart - 10 * 60 * 1000 ? (

                                        <div
                                            className="
                                                rounded-lg

                                                border border-slate-200
                                                bg-slate-50

                                                px-3 py-2

                                                text-xs text-slate-500
                                            "
                                        >
                                            Consultation link will be available<br/> 10 minutes before appointment
                                        </div>

                                    ) : appointment.meetingLink &&
                                        now > slotEnd ? (

                                        <div
                                            className="
                                                rounded-lg

                                                border border-red-200
                                                bg-red-50

                                                px-3 py-2

                                                text-xs font-medium text-red-600
                                            "
                                        >
                                            Meeting ended
                                        </div>

                                    ) : null}

                                </div>

                            )}

                            {/* DELIVERY */}
                            {appointment.deliveryMode !== "NONE" && (

                                <div
                                    className="
                    rounded-2xl
                    border border-slate-200

                    p-5
                    space-y-4
                "
                                >

                                    <div>

                                        <p className="text-xs text-slate-500">
                                            Delivery Mode
                                        </p>

                                        <p className="mt-1 font-medium text-slate-900">
                                            {appointment.deliveryMode}
                                        </p>

                                    </div>

                                    {appointment.deliveryAddress && (

                                        <div className="flex gap-3">

                                            <MapPin
                                                size={18}
                                                className="
                                text-slate-400
                                mt-0.5
                            "
                                            />

                                            <div className="text-sm text-slate-600 leading-relaxed">

                                                {appointment.deliveryAddress.line1}

                                                <br />

                                                {appointment.deliveryAddress.city},{" "}
                                                {appointment.deliveryAddress.state}

                                                <br />

                                                {appointment.deliveryAddress.zip},{" "}
                                                {appointment.deliveryAddress.country}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            )}

                            {/* ACTIONS */}
                            <div className="flex flex-wrap gap-3 pt-2">

                                {bothPending && (

                                    <button
                                        onClick={() =>
                                            router.push(`/checkout/${appointment.id}`)
                                        }
                                        className="
                flex items-center gap-2

                rounded-lg

                bg-teal-600
                hover:bg-teal-700

                px-4 py-2.5

                text-sm font-medium text-white

                transition
            "
                                    >

                                        <CreditCard size={15} />

                                        Complete Payment

                                    </button>

                                )}

                                {/* PAY CONSULTATION */}
                                {consultationPending && (

                                    <button
                                        onClick={() =>
                                            router.push(`/checkout/${appointment.id}`)
                                        }
                                        className="
                flex items-center gap-2

                rounded-lg

                border border-teal-200
                bg-teal-50
                hover:bg-teal-100

                px-4 py-2.5

                text-sm font-medium text-teal-700

                transition
            "
                                    >

                                        <CreditCard size={15} />

                                        Pay Consultation

                                    </button>

                                )}

                                {/* RETRY SLOT */}
                                {retrySlotPayment && (

                                    <button
                                        onClick={() =>
                                            router.push(`/checkout/${appointment.id}`)
                                        }
                                        className="
                flex items-center gap-2

                rounded-lg

                bg-red-500
                hover:bg-red-600

                px-4 py-2.5

                text-sm font-medium text-white

                transition
            "
                                    >

                                        <RefreshCw size={15} />

                                        Retry Payment

                                    </button>

                                )}

                                {canReschedule && (

                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/profile/appointments/${appointment.id}/reschedule`
                                            )
                                        }
                                        className="
                        flex items-center gap-2

                        rounded-lg

                        bg-teal-600
                        hover:bg-teal-700

                        px-4 py-2.5

                        text-sm font-medium text-white

                        transition
                    "
                                    >
                                        <RefreshCw size={15} />

                                        Reschedule
                                    </button>

                                )}

                                {canCancel && (

                                    <button
                                        onClick={() =>
                                            setShowCancelConfirm(true)
                                        }
                                        className="
                        flex items-center gap-2

                        rounded-lg

                        bg-red-500
                        hover:bg-red-600

                        px-4 py-2.5

                        text-sm font-medium text-white

                        transition
                    "
                                    >
                                        <Trash2 size={15} />

                                        Cancel Appointment
                                    </button>

                                )}

                            </div>

                            {/* RESCHEDULE NOTE */}
                            {appointment.rescheduleCount === 1 && (

                                <div
                                    className="
                    rounded-xl

                    border border-amber-200
                    bg-amber-50

                    px-4 py-3

                    text-sm text-amber-700
                "
                                >
                                    This appointment has already
                                    been rescheduled once.
                                </div>

                            )}

                        </div>

                    </motion.div>

                </motion.div>

            </AnimatePresence>


            {/* CANCEL CONFIRM */}

            {/* CANCEL MODAL */}
            <AnimatePresence>

                {showCancelConfirm && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}

                        className="
                fixed inset-0 z-[70]

                flex items-center justify-center

                bg-black/50
                backdrop-blur-sm

                p-4
            "
                    >

                        <motion.div
                            initial={{
                                scale: 0.96,
                                opacity: 0,
                                y: 20,
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                scale: 0.96,
                                opacity: 0,
                                y: 20,
                            }}

                            transition={{
                                duration: 0.2,
                            }}

                            className="
                    w-full max-w-lg

                    overflow-hidden

                    rounded-[28px]

                    bg-white

                    shadow-2xl
                "
                        >

                            {/* TOP */}
                            <div
                                className="
                        bg-gradient-to-br
                        from-red-500
                        via-rose-500
                        to-orange-500

                        px-7 pt-7 pb-16
                    "
                            >

                                <div
                                    className="
                            flex h-14 w-14
                            items-center justify-center

                            rounded-2xl

                            bg-white/20
                            backdrop-blur
                        "
                                >

                                    <Trash2
                                        size={26}
                                        className="text-white"
                                    />

                                </div>

                                <h2
                                    className="
                            mt-5

                            text-2xl font-semibold

                            text-white
                        "
                                >
                                    Cancel Appointment?
                                </h2>

                                <p
                                    className="
                            mt-2

                            text-sm leading-relaxed

                            text-white/80
                        "
                                >
                                    Please let us know why you
                                    are cancelling this appointment.
                                </p>

                            </div>

                            {/* CONTENT */}
                            <div className="relative px-7 pb-7">

                                <div
                                    className="
                            -mt-10

                            rounded-3xl

                            border border-slate-100

                            bg-white

                            p-5

                            shadow-xl
                        "
                                >

                                    {/* QUICK OPTIONS */}
                                    <div className="flex flex-wrap gap-2">

                                        {[
                                            "Feeling better",
                                            "Booked by mistake",
                                            "Timing issue",
                                            "Doctor unavailable",
                                            "Need different doctor",
                                        ].map((reason) => (

                                            <button
                                                key={reason}

                                                onClick={() =>
                                                    setCancelReason(
                                                        reason
                                                    )
                                                }

                                                className={`
                                        rounded-full

                                        border

                                        px-3 py-2

                                        text-xs font-medium

                                        transition

                                        ${cancelReason === reason
                                                        ? `
                                                border-red-500
                                                bg-red-50
                                                text-red-600
                                            `
                                                        : `
                                                border-slate-200
                                                text-slate-600
                                                hover:border-slate-300
                                            `
                                                    }
                                    `}
                                            >

                                                {reason}

                                            </button>

                                        ))}

                                    </div>

                                    {/* TEXTAREA */}
                                    <div className="mt-5">

                                        <textarea
                                            value={cancelReason}

                                            onChange={(e) =>
                                                setCancelReason(
                                                    e.target.value
                                                )
                                            }

                                            rows={5}

                                            placeholder="
Add additional details...
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

                                    focus:border-red-400
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
                                            onClick={handleCancel}

                                            disabled={cancelLoading}

                                            className="
                                    w-full

                                    rounded-2xl

                                    bg-red-500
                                    hover:bg-red-600

                                    px-5 py-3.5

                                    text-sm font-semibold
                                    text-white

                                    transition

                                    disabled:opacity-50
                                "
                                        >

                                            {cancelLoading
                                                ? "Cancelling..."
                                                : "Confirm Cancellation"}

                                        </button>

                                        <button
                                            onClick={() =>
                                                setShowCancelConfirm(
                                                    false
                                                )
                                            }

                                            className="
                                    text-sm font-medium

                                    text-slate-500
                                    hover:text-slate-700

                                    transition
                                "
                                        >
                                            Keep Appointment
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>
    );
}