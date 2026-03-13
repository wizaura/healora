"use client";

import { paymentLabel } from "@/lib/util";
import { Calendar, Video, CreditCard, RefreshCw, Clock } from "lucide-react";
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

  const slotPaid = appt.slotPaymentStatus === "PAID";
  const consultationPaid = appt.consultationPaymentStatus === "PAID";

  const slotFailed = appt.slotPaymentStatus === "FAILED";

  const bothPending =
    appt.slotPaymentStatus !== "PAID" &&
    appt.consultationPaymentStatus !== "PAID";

  const consultationPending =
    appt.slotPaymentStatus === "PAID" &&
    appt.consultationPaymentStatus !== "PAID";

  const slotStart = new Date(appt.slot.startTimeUTC).getTime();
  const now = Date.now();

  const canJoinMeeting =
    appt.meetingLink &&
    slotStart - now <= 10 * 60 * 1000;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

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

        {/* JOIN MEETING */}
        {canJoinMeeting && (
          <a
            href={appt.meetingLink}
            target="_blank"
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            <Video size={16} />
            Join
          </a>
        )}

        {/* SHOW WAIT MESSAGE */}
        {!canJoinMeeting && appt.meetingLink && (
          <span className="text-xs text-slate-500">
            Meeting link available 10 min before
          </span>
        )}

        {/* PAY FULL */}
        {bothPending && (
          <button
            onClick={() =>
              router.push(`/checkout/${appt.id}`)
            }
            className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            <CreditCard size={14} />
            Pay Now
          </button>
        )}

        {/* PAY CONSULTATION */}
        {consultationPending && (
          <button
            onClick={() =>
              router.push(`/checkout/${appt.id}`)
            }
            className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm"
          >
            <CreditCard size={14} />
            Pay Consultation
          </button>
        )}

        {/* RETRY SLOT */}
        {slotFailed && (
          <button
            onClick={() =>
              router.push(`/checkout/${appt.id}`)
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