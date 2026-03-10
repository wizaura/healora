"use client";

import { paymentLabel } from "@/lib/util";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Calendar,
    Video,
    CreditCard,
    MapPin,
} from "lucide-react";

export default function AppointmentDetailsModal({ appointment, onClose }: any) {

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const slotPaid = appointment.slotPaymentStatus === "PAID";
    const consultationPaid =
        appointment.consultationPaymentStatus === "PAID";

    return (

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
                            className="cursor-pointer"
                            onClick={onClose}
                        />

                    </div>


                    {/* DOCTOR INFO */}

                    <div className="border rounded-xl p-4 space-y-2">

                        <div className="font-semibold text-slate-900">
                            Dr. {appointment.doctor?.user?.name}
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

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div className="border rounded-lg p-3">

                            <div className="text-slate-500 text-xs">
                                Slot Payment
                            </div>

                            <div
                                className={`font-medium ${
                                    slotPaid
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                {appointment.slotPaymentStatus}
                            </div>

                        </div>

                        <div className="border rounded-lg p-3">

                            <div className="text-slate-500 text-xs">
                                Consultation Payment
                            </div>

                            <div
                                className={`font-medium ${
                                    consultationPaid
                                        ? "text-green-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {paymentLabel(appointment.consultationPaymentStatus)}
                            </div>

                        </div>

                    </div>


                    {/* FEES */}

                    <div className="border rounded-xl p-4 space-y-2 text-sm">

                        <div className="flex justify-between">
                            <span>Slot Fee</span>
                            <span>₹{appointment.slotFee}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Consultation Fee</span>
                            <span>₹{appointment.consultationFee}</span>
                        </div>

                    </div>


                    {/* MEETING */}

                    {appointment.meetingType && (

                        <div className="border rounded-xl p-4 space-y-2">

                            <div className="text-sm text-slate-500">
                                Meeting Type
                            </div>

                            <div className="font-medium">
                                {appointment.meetingType}
                            </div>

                            {appointment.meetingLink && (

                                <a
                                    href={appointment.meetingLink}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-indigo-600 font-medium text-sm mt-2"
                                >
                                    <Video size={16} />
                                    Join Meeting
                                </a>

                            )}

                        </div>

                    )}


                    {/* DELIVERY */}

                    {appointment.deliveryMode !== "NONE" && (

                        <div className="border rounded-xl p-4 space-y-2">

                            <div className="text-sm text-slate-500">
                                Delivery Mode
                            </div>

                            <div className="font-medium">
                                {appointment.deliveryMode}
                            </div>

                            {appointment.deliveryAddress && (

                                <div className="flex items-start gap-2 text-sm text-slate-600">

                                    <MapPin size={16} />

                                    {appointment.deliveryAddress}

                                </div>

                            )}

                        </div>

                    )}


                    {/* STATUS */}

                    <div className="text-sm text-slate-600">

                        <strong>Status:</strong> {appointment.status}

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );
}