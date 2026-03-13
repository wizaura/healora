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
    const now = Date.now();

    const canJoin = slotStart - now <= 10 * 60 * 1000;

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
                    className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                >

                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-6"
                    >

                        {/* HEADER */}

                        <div className="flex justify-between items-center">

                            <h2 className="font-semibold text-lg text-slate-900">
                                Appointment Details
                            </h2>

                            <X
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                onClick={onClose}
                            />

                        </div>

                        {/* DOCTOR */}

                        <div className="border border-gray-200 rounded-xl p-4 space-y-1">

                            <div className="font-semibold text-slate-900">
                                {appointment.doctor?.user?.name}
                            </div>

                            <div className="text-sm text-slate-500">
                                {appointment.doctor?.speciality?.name}
                            </div>

                        </div>


                        {/* DATE */}

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                            <Calendar size={16} />

                            {formatDate(appointment.slot.startTimeUTC)}

                        </div>


                        {/* PAYMENT STATUS */}

                        <div className="grid grid-cols-2 gap-4">

                            <div className="border border-gray-200 rounded-lg p-3">

                                <div className="text-xs text-slate-500">
                                    Slot Payment
                                </div>

                                <div className="font-medium text-sm">
                                    {appointment.slotPaymentStatus}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-lg p-3">

                                <div className="text-xs text-slate-500">
                                    Consultation Payment
                                </div>

                                <div className="font-medium text-sm">
                                    {paymentLabel(appointment.consultationPaymentStatus)}
                                </div>

                            </div>

                        </div>


                        {/* MEETING */}

                        {appointment.meetingType && (

                            <div className="border border-gray-200 rounded-xl p-4 space-y-2">

                                <div className="text-sm text-slate-500">
                                    Meeting Type
                                </div>

                                <div className="font-medium text-sm">
                                    {appointment.meetingType}
                                </div>

                                {canJoin ? (

                                    <a
                                        href={appointment.meetingLink}
                                        target="_blank"
                                        className="flex items-center gap-2 text-indigo-600 font-medium text-sm"
                                    >
                                        <Video size={16} />
                                        Join Meeting
                                    </a>

                                ) : (

                                    <p className="text-xs text-slate-500">
                                        Meeting link available 10 minutes before consultation.
                                    </p>

                                )}

                            </div>

                        )}


                        {/* DELIVERY */}

                        {appointment.deliveryMode !== "NONE" && (

                            <div className="border border-gray-200 rounded-xl p-4 space-y-2">

                                <div className="text-sm text-slate-500">
                                    Delivery Mode
                                </div>

                                <div className="font-medium text-sm">
                                    {appointment.deliveryMode}
                                </div>

                                {appointment.deliveryAddress && (

                                    <div className="flex items-start gap-2 text-sm text-slate-600">

                                        <MapPin size={16} />

                                        <div>
                                            {appointment.deliveryAddress.line1}<br />
                                            {appointment.deliveryAddress.city},{" "}
                                            {appointment.deliveryAddress.state}<br />
                                            {appointment.deliveryAddress.zip},{" "}
                                            {appointment.deliveryAddress.country}
                                        </div>

                                    </div>

                                )}

                            </div>

                        )}


                        {/* STATUS */}

                        <div className="text-sm text-slate-600">
                            <strong>Status:</strong> {appointment.status}
                        </div>


                        {/* ACTIONS */}

                        <div className="flex gap-3 pt-2">

                            {canReschedule && (

                                <button
                                    onClick={() =>
                                        router.push(`/profile/appointments/${appointment.id}/reschedule`)
                                    }
                                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    <RefreshCw size={14} />
                                    Reschedule
                                </button>

                            )}

                            {appointment.rescheduleCount === 1 && (
                                <p className="text-xs w-60 text-gray-500 mt-2">
                                    This appointment has already been rescheduled once. Further changes are not allowed.
                                </p>
                            )}

                            {canCancel && (

                                <button
                                    onClick={() => setShowCancelConfirm(true)}
                                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    <Trash2 size={14} />
                                    Cancel Appointment
                                </button>

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