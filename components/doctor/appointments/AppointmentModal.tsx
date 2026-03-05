"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, CreditCard } from "lucide-react";

export default function AppointmentModal({
    selected,
    onClose,
}: any) {
    const formatDateTime = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusBadge = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-[#E6F7F4] text-[#1F9E8E]";
            case "COMPLETED":
                return "bg-[#EAF4FF] text-[#2D7FF9]";
            case "CANCELLED":
                return "bg-[#FFECEC] text-[#E5484D]";
            default:
                return "bg-[#FFF7E6] text-[#C98B00]";
        }
    };

    const paymentBadge = (status: string) =>
        status === "PAID"
            ? "bg-[#E6F7F4] text-[#1F9E8E]"
            : "bg-[#FFECEC] text-[#E5484D]";

    return (
        <AnimatePresence>
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden"
                    >
                        {/* HEADER */}
                        <div className="bg-[#F4FBF9] py-4 px-8 border-b border-[#E2F0ED] flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-[#0B2E28]">
                                    Appointment Details
                                </h2>
                                <p className="text-xs text-[#7FA6A0] mt-1">
                                    View complete booking information
                                </p>
                            </div>
                            <X
                                className="cursor-pointer text-[#5F7C76] hover:text-[#0B2E28] transition"
                                onClick={onClose}
                            />
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-6">

                            {/* Patient */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[#E6F7F4]">
                                    <User size={18} className="text-[#1F9E8E]" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#7FA6A0]">
                                        Patient
                                    </p>
                                    <p className="text-sm font-medium text-[#0B2E28]">
                                        {selected.user?.name}
                                    </p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[#EAF4FF]">
                                    <Calendar size={18} className="text-[#2D7FF9]" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#7FA6A0]">
                                        Appointment Date & Time
                                    </p>
                                    <p className="text-sm font-medium text-[#0B2E28]">
                                        {formatDateTime(
                                            selected.slot.startTimeUTC
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex justify-between items-center bg-[#F9FCFB] rounded-xl p-4 border border-[#E2F0ED]">
                                <div>
                                    <p className="text-xs text-[#7FA6A0]">
                                        Appointment Status
                                    </p>
                                    <span
                                        className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${statusBadge(
                                            selected.status
                                        )}`}
                                    >
                                        {selected.status}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-[#0B2E28]">
                                    Payment Information
                                </p>

                                <div className="flex gap-4">
                                    <div className="flex justify-between items-center bg-white border border-[#E2F0ED] rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <CreditCard
                                                size={16}
                                                className="text-[#5F7C76]"
                                            />
                                            <span className="text-sm text-[#0B2E28]">
                                                Slot Payment
                                            </span>
                                        </div>

                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${paymentBadge(
                                                selected.slotPaymentStatus
                                            )}`}
                                        >
                                            {selected.slotPaymentStatus}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center bg-white border border-[#E2F0ED] rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <CreditCard
                                                size={16}
                                                className="text-[#5F7C76]"
                                            />
                                            <span className="text-sm text-[#0B2E28]">
                                                Consultation Payment
                                            </span>
                                        </div>

                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${paymentBadge(
                                                selected.consultationPaymentStatus
                                            )}`}
                                        >
                                            {selected.consultationPaymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="p-4 border-t border-[#E2F0ED] bg-[#F4FBF9] flex justify-end">
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
