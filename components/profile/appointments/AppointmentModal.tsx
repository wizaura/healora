"use client";

import { paymentLabel } from "@/lib/util";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Video, MapPin, RefreshCw, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AppointmentDetailsModal({ appointment, onClose }: any) {

    const router = useRouter();

    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

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
        appointment.slotPaymentStatus === "PAID" &&
        (appointment.consultationPaymentStatus === "PAID" ||
            appointment.consultationPaymentStatus === "PENDING") &&
        appointment.status === "CONFIRMED";

    const handleCancel = async () => {
        try {
            await api.post(`/appointments/${appointment.id}/cancel`);

            window.location.reload();
        } catch {
            alert("Failed to cancel appointment");
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
                                        {appointment.slotPaymentStatus}
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
                                            {appointment.meetingType}
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
                                            Meeting starts soon
                                            <br />
                                            Join available 10 min before
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

            {showCancelConfirm && (

                <ConfirmModal
                    open={showCancelConfirm}
                    title="Cancel Appointment"
                    message="Are you sure you want to cancel this appointment?"
                    onConfirm={handleCancel}
                    onCancel={() => setShowCancelConfirm(false)}
                />

            )}

        </>
    );
}