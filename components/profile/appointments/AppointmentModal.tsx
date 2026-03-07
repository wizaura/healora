"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AppointmentDetailsModal({ appointment, onClose }: any) {

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

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
                    className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5"
                >

                    <div className="flex justify-between items-center">

                        <h2 className="font-semibold text-slate-900">
                            Appointment Details
                        </h2>

                        <X
                            className="cursor-pointer"
                            onClick={onClose}
                        />

                    </div>

                    <div className="space-y-3 text-sm text-slate-600">

                        <p>
                            <strong>Doctor:</strong> Dr. {appointment.doctor?.user?.name}
                        </p>

                        <p>
                            <strong>Speciality:</strong>{" "}
                            {appointment.doctor?.speciality?.name}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {formatDate(appointment.slot.startTimeUTC)}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {appointment.status}
                        </p>

                        <p>
                            <strong>Slot Payment:</strong>{" "}
                            {appointment.slotPaymentStatus}
                        </p>

                        <p>
                            <strong>Consultation Payment:</strong>{" "}
                            {appointment.consultationPaymentStatus}
                        </p>

                        {appointment.meetingLink && (

                            <a
                                href={appointment.meetingLink}
                                target="_blank"
                                className="text-indigo-600 font-medium"
                            >
                                Join Meeting →
                            </a>

                        )}

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    );
}