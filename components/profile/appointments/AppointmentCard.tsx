"use client";

import { Calendar, Video, CreditCard, RefreshCw } from "lucide-react";
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

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="space-y-1">

                <div className="font-medium text-slate-900">
                    Dr. {appt.doctor?.user?.name}
                </div>

                <div className="text-sm text-slate-500">
                    {appt.doctor?.speciality?.name}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    {formatDate(appt.slot.startTimeUTC)}
                </div>

            </div>

            <div className="flex flex-wrap gap-3 items-center">

                {appt.meetingLink && (

                    <a
                        href={appt.meetingLink}
                        target="_blank"
                        className="flex items-center gap-1 text-indigo-600 text-sm font-medium"
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