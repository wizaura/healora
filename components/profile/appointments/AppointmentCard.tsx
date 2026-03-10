"use client";

import { paymentLabel } from "@/lib/util";
import {
    Calendar,
    Video,
    CreditCard,
    RefreshCw,
    Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppointmentCard({ appt, onView }: any) {

    const router = useRouter();

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });

    const canContinueConsultationPayment =
        appt.slotPaymentStatus === "PAID" &&
        appt.consultationPaymentStatus !== "PAID";

    const retrySlotPayment = appt.slotPaymentStatus === "FAILED";

    const slotPaid = appt.slotPaymentStatus === "PAID";
    const consultationPaid = appt.consultationPaymentStatus === "PAID";

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* LEFT INFO */}

            <div className="space-y-2">

                <div className="font-semibold text-slate-900">
                    {appt.doctor?.user?.name}
                </div>

                <div className="text-sm text-slate-500">
                    {appt.doctor?.speciality?.name}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    {formatDate(appt.slot.startTimeUTC)}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={12} />
                    {appt.status}
                </div>

                {/* PAYMENT STATUS */}

                <div className="flex gap-2 mt-1 text-xs">

                    <span
                        className={`px-2 py-1 rounded-full ${
                            slotPaid
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        Slot {appt.slotPaymentStatus}
                    </span>

                    <span
                        className={`px-2 py-1 rounded-full ${
                            consultationPaid
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Consultation {paymentLabel(appt.consultationPaymentStatus)}
                    </span>

                </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3 items-center">

                {appt.meetingLink && (

                    <a
                        href={appt.meetingLink}
                        target="_blank"
                        className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm"
                    >
                        <Video size={16} />
                        Join
                    </a>

                )}

                {canContinueConsultationPayment && (

                    <button
                        onClick={() =>
                            router.push(`/checkout/consultation/${appt.id}`)
                        }
                        className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm"
                    >
                        <CreditCard size={14} />
                        Pay Consultation
                    </button>

                )}

                {retrySlotPayment && (

                    <button
                        onClick={() =>
                            router.push(`/checkout/slot/${appt.id}`)
                        }
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm"
                    >
                        <RefreshCw size={14} />
                        Retry Slot
                    </button>

                )}

                <button
                    onClick={onView}
                    className="text-sm font-medium text-indigo-600"
                >
                    View
                </button>

            </div>

        </div>
    );
}