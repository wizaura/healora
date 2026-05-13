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
  const slotEnd = new Date(appt.slot.endTimeUTC).getTime();
  const now = Date.now();

  const canJoinMeeting =
    appt.status === "CONFIRMED" &&              // ✅ only confirmed
    appt.meetingLink &&                        // ✅ link exists
    now >= slotStart - 10 * 60 * 1000 &&       // ✅ 10 min before
    now <= slotEnd + 5 * 60 * 1000;            // ✅ optional 5 min buffer after

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

        {appt.doctorRating && (

          <div
            className="
        inline-flex items-center gap-1

        rounded-full

        bg-yellow-50

        px-2.5 py-1

        text-xs font-medium

        text-yellow-700
      "
          >

            <span>⭐</span>

            <span>
              {appt.doctorRating}/5
            </span>

          </div>

        )}

        <div className="grid grid-col-2 md:grid-col-1 gap-2 mt-1 text-xs">

          <span
            className={`px-2 py-1 rounded-full ${slotPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
              }`}
          >
            Slot {appt.slotPaymentStatus}
          </span>

          <span
            className={`px-2 py-1 rounded-full ${consultationPaid
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
              }`}
          >
            Consultation {paymentLabel(appt.consultationPaymentStatus)}
          </span>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="flex flex-col gap-3 items-end justify-end">

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
        {appt.meetingLink &&
          appt.status === "CONFIRMED" &&
          now < slotStart - 10 * 60 * 1000 && (
            <span className="text-xs text-slate-500">
              Meeting starts soon (join available 10 min before)
            </span>
          )}

        {appt.meetingLink &&
          now > slotEnd && (
            <span className="text-xs text-red-500 font-bold">
              Meeting ended
            </span>
          )}

        {/* PAY BOTH */}
        {bothPending && (

          <button
            onClick={() =>
              router.push(`/checkout/${appt.id}`)
            }
            className="
            flex items-center gap-2

            rounded-lg

            bg-teal-600
            hover:bg-teal-700

            px-4 py-2

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
              router.push(`/checkout/${appt.id}`)
            }
            className="
            flex items-center gap-2

            rounded-lg

            border border-teal-200
            bg-teal-50
            hover:bg-teal-100

            px-4 py-2

            text-sm font-medium text-teal-700

            transition
        "
          >
            <CreditCard size={15} />

            Pay Consultation
          </button>
        )}

        {/* RETRY SLOT */}
        {slotFailed && (

          <button
            onClick={() =>
              router.push(`/checkout/${appt.id}`)
            }
            className="
            flex items-center gap-2

            rounded-lg

            bg-red-500
            hover:bg-red-600

            px-4 py-2

            text-sm font-medium text-white

            transition
        "
          >
            <RefreshCw size={15} />

            Retry Payment
          </button>
        )}

        <button
          onClick={onView}
          className="
        inline-flex items-center gap-1

        rounded-lg

        border border-slate-200
        bg-white
        hover:bg-slate-50

        px-3 py-1.5

        text-sm font-medium text-slate-700

        transition
    "
        >
          View
        </button>

      </div>
    </div>
  );
}