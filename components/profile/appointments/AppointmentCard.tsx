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


  console.log(appt, 'a')

  const slotPaid =
    appt.slotPaymentStatus === "PAID";

  const consultationPaid =
    appt.consultationPaymentStatus === "PAID";

  const slotFailed =
    appt.slotPaymentStatus === "FAILED";

  const consultationFailed =
    appt.consultationPaymentStatus === "FAILED";

  const isConfirmed =
    appt.status === "CONFIRMED";

  const isCancelled =
    appt.status === "CANCELLED";

  const isPending =
    appt.status === "PENDING";

  /* ======================================================
     COMPLETE PAYMENT
  ====================================================== */

  const bothPending =
    !isCancelled &&
    isPending &&
    (
      appt.slotPaymentStatus === "PENDING" ||
      appt.slotPaymentStatus === "FAILED"
    ) &&
    (
      appt.consultationPaymentStatus === "PENDING" ||
      appt.consultationPaymentStatus === "FAILED" ||
      appt.consultationPaymentStatus === "NOT_REQUIRED"
    );

  /* ======================================================
     CONSULTATION PAYMENT ONLY
  ====================================================== */

  const consultationPending =
    !isCancelled &&
    isConfirmed &&
    slotPaid &&
    (
      appt.consultationPaymentStatus === "PENDING" ||
      appt.consultationPaymentStatus === "FAILED" ||
      appt.consultationPaymentStatus === "NOT_REQUIRED"
    );

  /* ======================================================
     SLOT RETRY ONLY
  ====================================================== */

  const retrySlotPayment =
    !isCancelled &&
    isPending &&
    slotFailed;

  const slotStart = new Date(appt.slot.startTimeUTC).getTime();
  const slotEnd = new Date(appt.slot.endTimeUTC).getTime();
  const now = Date.now();

  const canJoinMeeting =
    appt.status === "CONFIRMED" &&              // ✅ only confirmed
    appt.meetingLink &&                        // ✅ link exists
    now >= slotStart - 10 * 60 * 1000 &&       // ✅ 10 min before
    now <= slotEnd + 5 * 60 * 1000;            // ✅ optional 5 min buffer after

  return (

    <div
      className="
            overflow-hidden

            rounded-xl

            border border-slate-200

            bg-white

            shadow-sm

            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-lg
        "
    >

      <div className="p-6">

        <div
          className="
                    flex flex-col gap-6

                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                "
        >

          {/* =====================================================
                   LEFT
                   ===================================================== */}

          <div className="flex gap-5">

            {/* AVATAR */}

            <div
              className="
        h-16 w-16

        overflow-hidden

        rounded-2xl

        border border-slate-200

        bg-slate-100

        shadow-sm

        flex-shrink-0
    "
            >

              {appt.doctor?.imageUrl ? (

                <img
                  src={appt.doctor.imageUrl}

                  alt={
                    appt.doctor?.user?.name
                  }

                  className="
                h-full w-full

                object-cover
            "
                />

              ) : (

                <div
                  className="
                flex h-full w-full
                items-center justify-center

                bg-gradient-to-br
                from-teal-500
                to-cyan-500

                text-xl font-semibold
                text-white
            "
                >

                  {appt.doctor?.user?.name?.charAt(0)}

                </div>

              )}

            </div>

            {/* CONTENT */}

            <div className="min-w-0 flex-1">

              <div
                className="
                                flex flex-wrap
                                items-center
                                gap-2
                            "
              >

                <h3
                  className="
                                    text-xl font-semibold

                                    text-slate-900
                                "
                >

                  {appt.doctor?.user?.name}

                </h3>

                <span
                  className={`
                                    rounded-full

                                    px-3 py-1

                                    text-xs font-semibold

                                    ${appt.status === "CONFIRMED"

                      ? `
                                            bg-emerald-100
                                            text-emerald-700
                                        `

                      : appt.status === "COMPLETED"

                        ? `
                                                bg-blue-100
                                                text-blue-700
                                            `

                        : appt.status === "CANCELLED"

                          ? `
                                                    bg-red-100
                                                    text-red-700
                                                `

                          : `
                                                    bg-amber-100
                                                    text-amber-700
                                                `
                    }
                                `}
                >

                  {appt.status}

                </span>

              </div>

              <p
                className="
                                mt-1

                                text-sm

                                text-slate-500
                            "
              >

                {appt.doctor?.speciality?.name}

              </p>

              {/* DATE */}

              <div
                className="
                                mt-5

                                inline-flex items-center gap-2

                                rounded-xl

                                border border-slate-200

                                bg-slate-50

                                px-4 py-2

                                text-sm font-medium

                                text-slate-700
                            "
              >

                <Calendar size={16} />

                {formatDate(
                  appt.slot.startTimeUTC
                )}

              </div>

              {/* PAYMENT TAGS */}

              <div
                className="
                                mt-5

                                flex flex-wrap gap-2
                            "
              >

                <span
                  className={`
                                    rounded-full

                                    px-3 py-1

                                    text-xs font-semibold

                                    ${slotPaid

                      ? `
                                            bg-emerald-100
                                            text-emerald-700
                                        `

                      : `
                                            bg-amber-100
                                            text-amber-700
                                        `
                    }
                                `}
                >

                  Slot {appt.slotPaymentStatus}

                </span>

                <span
                  className={`
                                    rounded-full

                                    px-3 py-1

                                    text-xs font-semibold

                                    ${consultationPaid

                      ? `
                                            bg-emerald-100
                                            text-emerald-700
                                        `

                      : `
                                            bg-slate-100
                                            text-slate-600
                                        `
                    }
                                `}
                >

                  Consultation {paymentLabel(
                    appt.consultationPaymentStatus
                  )}

                </span>

                {appt.doctorRating && (

                  <span
                    className="
                                        rounded-full

                                        bg-yellow-100

                                        px-3 py-1

                                        text-xs font-semibold

                                        text-yellow-700
                                    "
                  >

                    ⭐ {appt.doctorRating}/5

                  </span>

                )}

              </div>

            </div>

          </div>

          {/* =====================================================
                   RIGHT
                   ===================================================== */}

          <div
            className="
                        flex flex-col gap-3

                        lg:min-w-[220px]
                    "
          >

            {/* JOIN */}

            {canJoinMeeting && (

              <a
                href={appt.meetingLink}

                target="_blank"

                className="
                                inline-flex items-center
                                justify-center gap-2

                                rounded-xl

                                bg-indigo-600

                                px-4 py-3

                                text-sm font-medium
                                text-white

                                transition

                                hover:bg-indigo-700
                            "
              >

                <Video size={16} />

                Join Consultation

              </a>

            )}

            {/* WAIT */}

            {appt.meetingLink &&
              appt.status === "CONFIRMED" &&
              now < slotStart - 10 * 60 * 1000 && (

                <div
                  className="
                                    rounded-xl text-end

                                    border border-slate-200

                                    bg-slate-50

                                    px-4 py-3  md:max-w-xs

                                    text-xs leading-5

                                    text-slate-500
                                "
                >

                  Consultation link will become
                  available 10 minutes before
                  appointment time.

                </div>

              )}

            {/* ENDED */}

            {appt.meetingLink &&
              now > slotEnd && (

                <div
                  className="
                                    rounded-xl

                                    border border-red-200

                                    bg-red-50

                                    px-4 py-3 text-center

                                    text-sm font-medium

                                    text-red-600
                                "
                >

                  Meeting ended

                </div>

              )}

            {/* COMPLETE PAYMENT */}

            {bothPending && (

              <button
                onClick={() =>
                  router.push(
                    `/checkout/${appt.id}`
                  )
                }

                className="
                                inline-flex items-center
                                justify-center gap-2

                                rounded-xl

                                bg-teal-600

                                px-4 py-3

                                text-sm font-medium
                                text-white

                                transition

                                hover:bg-teal-700
                            "
              >

                <CreditCard size={16} />

                Complete Payment

              </button>

            )}

            {/* CONSULTATION */}

            {consultationPending && (

              <button
                onClick={() =>
                  router.push(
                    `/checkout/${appt.id}`
                  )
                }

                className="
                                inline-flex items-center
                                justify-center gap-2

                                rounded-xl

                                border border-teal-200

                                bg-teal-50

                                px-4 py-3

                                text-sm font-medium

                                text-teal-700

                                transition

                                hover:bg-teal-100
                            "
              >

                <CreditCard size={16} />

                Pay Consultation

              </button>

            )}

            {/* RETRY */}

            {retrySlotPayment && (

              <button
                onClick={() =>
                  router.push(
                    `/checkout/${appt.id}`
                  )
                }

                className="
                                inline-flex items-center
                                justify-center gap-2

                                rounded-xl

                                bg-red-500

                                px-4 py-3

                                text-sm font-medium
                                text-white

                                transition

                                hover:bg-red-600
                            "
              >

                <RefreshCw size={16} />

                Retry Payment

              </button>

            )}

            {/* VIEW */}

            <button
              onClick={onView}

              className="
                            inline-flex items-center
                            justify-center gap-2

                            rounded-xl

                            border border-slate-200

                            bg-white

                            px-4 py-3

                            text-sm font-medium

                            text-slate-700

                            transition

                            hover:bg-slate-50
                        "
            >

              View Details

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}