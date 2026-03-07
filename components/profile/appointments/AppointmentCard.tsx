"use client";

import { Calendar, Video } from "lucide-react";
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
        <div className="bg-white rounded-xl border p-5 flex justify-between items-center">

            <div className="space-y-2">

                <div className="font-medium">
                    Dr. {appt.doctor?.user?.name}
                </div>

                <div className="text-sm text-gray-500">
                    {appt.doctor?.speciality?.name}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    {formatDate(appt.slot.startTimeUTC)}
                </div>

            </div>

            <div className="flex gap-3 items-center">

                {/* MEETING LINK */}

                {appt.meetingLink && (
                    <a
                        href={appt.meetingLink}
                        target="_blank"
                        className="flex items-center gap-1 text-indigo-600 text-sm"
                    >
                        <Video size={16} />
                        Join
                    </a>
                )}

                {/* CONTINUE PAYMENT */}

                {canContinueConsultationPayment && (
                    <button
                        onClick={() =>
                            router.push(`/checkout/consultation/${appt.id}`)
                        }
                        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
                    >
                        Pay Consultation
                    </button>
                )}

                {/* RETRY SLOT PAYMENT */}

                {retrySlotPayment && (
                    <button
                        onClick={() =>
                            router.push(`/checkout/slot/${appt.id}`)
                        }
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                        Retry Slot Payment
                    </button>
                )}

                {/* VIEW DETAILS */}

                <button
                    onClick={onView}
                    className="text-sm text-indigo-600"
                >
                    View
                </button>

            </div>

        </div>
    );
}