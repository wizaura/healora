"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";
import AddressForm from "@/components/checkout/AddressForm";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, CreditCard, Pill, Video } from "lucide-react";
import { getApiError } from "@/lib/util";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AppointmentCheckout() {

  const { appointmentId } = useParams();

  const router = useRouter();

  const [appointment, setAppointment] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [currencySymbol, setCurrencySymbol] =
    useState("₹");

  const [prescriptionFee, setPrescriptionFee] =
    useState(50);

  const [checkoutStage, setCheckoutStage] =
    useState<
      "SLOT" |
      "CONSULTATION" |
      "FULL"
    >("FULL");

  const [meetingType, setMeetingType] =
    useState<"google" | "zoom" | null>("google");

  const [deliveryMode, setDeliveryMode] =
    useState<
      "none" |
      "prescription" |
      "door"
    >("none");

  const [deliveryType, setDeliveryType] =
    useState<"FAST" | "NORMAL" | null>(null);

  const [needsMedicine, setNeedsMedicine] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<"RAZORPAY" | "STRIPE">(
      "RAZORPAY"
    );

  const [address, setAddress] =
    useState<any>({});

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {

    try {

      const [res, prescriptionRes] =
        await Promise.all([

          api.get(
            `/appointments/${appointmentId}/checkout`
          ),

          api.get(
            "/settings/prescription-fee"
          ),
        ]);

      const appt = res.data;

      setAppointment(appt);

      setCurrencySymbol(
        appt.symbol || "₹"
      );

      setPrescriptionFee(
        prescriptionRes.data.prescriptionFee || 50
      );

      setPaymentMethod(
        appt.paymentMethod
      );

      if (appt.meetingType) {

        setMeetingType(
          appt.meetingType.toLowerCase()
        );
      }

      if (appt.deliveryType) {
        setDeliveryType(
          appt.deliveryType
        )
      }

      if (appt.deliveryMode) {

        setDeliveryMode(
          appt.deliveryMode.toLowerCase()
        );

        setNeedsMedicine(true);
      }

      if (appt.deliveryAddress) {

        setAddress(
          appt.deliveryAddress
        );
      }

      /* =========================================
   DETERMINE CHECKOUT STAGE
   ========================================= */

      if (
        appt.slotPaymentStatus !== "PAID" &&
        appt.consultationPaymentStatus !== "PAID"
      ) {

        setCheckoutStage("FULL");

      } else if (
        appt.slotPaymentStatus === "PAID" &&
        appt.consultationPaymentStatus !== "PAID"
      ) {

        setCheckoutStage("CONSULTATION");

      } else {

        setCheckoutStage("FULL");
      }

    } catch {

      toast.error(
        "Failed to load appointment"
      );

    } finally {

      setLoading(false);
    }
  };

  const totalAmount = useMemo(() => {

    if (!appointment) return 0;

    let total = 0;

    if (
      checkoutStage === "FULL"
    ) {

      total +=
        appointment.fees.slotFee;

      total +=
        appointment.fees.consultationFee;
    }

    if (
      checkoutStage === "CONSULTATION"
    ) {

      total +=
        appointment.fees.consultationFee;
    }

    if (
      needsMedicine &&
      deliveryMode === "prescription"
    ) {

      total += prescriptionFee;
    }

    return total;

  }, [
    appointment,
    deliveryMode,
    needsMedicine,
    prescriptionFee,
  ]);

  const handlePayment = async () => {

    if (!meetingType) {

      return toast.error(
        "Please select consultation mode"
      );
    }

    if (
      needsMedicine &&
      deliveryMode === "none"
    ) {

      return toast.error(
        "Please choose prescription or medicine delivery"
      );
    }

    if (
      deliveryMode === "door" &&
      !address?.line1
    ) {

      return toast.error(
        "Please enter delivery address"
      );
    }

    if (
      deliveryMode === "door" &&
      !deliveryType
    ) {

      return toast.error(
        "Please select delivery speed"
      );
    }

    try {

      const payload: any = {

        appointmentId,

        payMode: checkoutStage,

        paymentMethod:
          appointment.paymentMethod,
      };

      if (meetingType) {

        payload.meetingType =
          meetingType;
      }

      if (
        needsMedicine &&
        deliveryMode !== "none"
      ) {

        payload.deliveryMode =
          deliveryMode;
      }

      if (
        deliveryMode === "door"
      ) {

        payload.address =
          address;
      }

      if (
        deliveryMode === "door"
      ) {

        payload.deliveryType =
          deliveryType;
      }

      const paymentRes =
        await api.post(
          "/payments/initiate",
          payload
        );

      const order =
        paymentRes.data.data;

      if (
        appointment.paymentMethod ===
        "RAZORPAY"
      ) {

        openRazorpay(order);
      }

      if (
        appointment.paymentMethod ===
        "STRIPE"
      ) {

        window.location.href =
          order.checkoutUrl;
      }

    } catch (err) {

      toast.error(
        getApiError(err)
      );
    }
  };

  const openRazorpay = (
    order: any
  ) => {

    const options = {

      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount:
        order.amount * 100,

      currency: "INR",

      order_id:
        order.orderId,

      name: "Healora",

      description:
        "Appointment Payment",

      handler: () => {

        router.push(
          "/appointments"
        );
      },

      theme: {
        color: "#0E3B43",
      },
    };

    const rzp =
      new window.Razorpay(
        options
      );

    rzp.open();
  };

  if (
    loading ||
    !appointment
  ) return null;

  return (

    <section
      className="
        min-h-screen

        bg-gradient-to-b
        from-slate-50
        via-white
        to-slate-50

        px-4
        py-24
      "
    >

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div
          className="
        my-8

        rounded-xl

        border border-slate-200

        bg-white

        px-6 py-6

        shadow-sm

        md:px-8
    "
        >

          <div
            className="
            flex flex-col gap-6

            lg:flex-row
            lg:items-center
            lg:justify-between
        "
          >

            {/* =====================================================
           LEFT
           ===================================================== */}

            <div>

              <h1
                className="
                    text-3xl font-semibold

                    tracking-[-0.03em]

                    text-navy-dark

                    md:text-4xl
                "
              >

                Complete Payment

              </h1>

              <p
                className="
                    mt-2

                    max-w-xl

                    text-sm leading-6

                    text-slate-500

                    md:text-base
                "
              >

                Complete the payment for your appointment
                and continue.
              </p>

            </div>

            {/* =====================================================
           STEPS
           ===================================================== */}

            <div
              className="
        flex flex-wrap
        items-center

        gap-2

        rounded-lg

        bg-slate-50

        px-4 py-3
    "
            >

              {/* STEP */}

              <div className="flex items-center gap-3">

                <div
                  className="
                flex h-10 w-10
                items-center justify-center

                rounded-full

                bg-teal-100
            "
                >

                  <Video
                    size={18}
                    className="text-teal-700"
                  />

                </div>

                <div>

                  <p
                    className="
                    text-xs font-medium

                    uppercase tracking-wide

                    text-slate-400
                "
                  >

                    Step 1

                  </p>

                  <p
                    className="
                    text-sm font-semibold

                    text-slate-700
                "
                  >

                    Consultation Method

                  </p>

                </div>

              </div>

              {/* DIVIDER */}

              <div
                className="
            hidden h-8 w-px

            bg-slate-200

            lg:block
        "
              />

              {/* STEP */}

              <div className="flex items-center gap-3">

                <div
                  className="
                flex h-10 w-10
                items-center justify-center

                rounded-full

                bg-indigo-100
            "
                >

                  <Pill
                    size={18}
                    className="text-indigo-700"
                  />

                </div>

                <div>

                  <p
                    className="
                    text-xs font-medium

                    uppercase tracking-wide

                    text-slate-400
                "
                  >

                    Step 2

                  </p>

                  <p
                    className="
                    text-sm font-semibold

                    text-slate-700
                "
                  >

                    Prescription Option

                  </p>

                </div>

              </div>

              {/* DIVIDER */}

              <div
                className="
            hidden h-8 w-px

            bg-slate-200

            lg:block
        "
              />

              {/* STEP */}

              <div className="flex items-center gap-3">

                <div
                  className="
                flex h-10 w-10
                items-center justify-center

                rounded-full

                bg-emerald-100
            "
                >

                  <CreditCard
                    size={18}
                    className="text-emerald-700"
                  />

                </div>

                <div>

                  <p
                    className="
                    text-xs font-medium

                    uppercase tracking-wide

                    text-slate-400
                "
                  >

                    Step 3

                  </p>

                  <p
                    className="
                    text-sm font-semibold

                    text-slate-700
                "
                  >

                    Complete Payment

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
           CHECKOUT LAYOUT
           ===================================================== */}

        <div
          className="
            grid gap-8

            lg:grid-cols-[1fr_420px]
          "
        >

          {/* =====================================================
             LEFT
             ===================================================== */}

          <div className="space-y-6">

            {/* DOCTOR */}

            <div
              className="
                rounded-xl

                border border-slate-200

                bg-white

                p-8

                shadow-sm
              "
            >

              <div
                className="
                  flex items-start gap-5
                "
              >

                {/* IMAGE */}

                <div
                  className="
    relative

    h-20 w-20

    overflow-hidden

    rounded-2xl

    bg-gradient-to-br
    from-teal-500
    to-cyan-500
  "
                >

                  {appointment?.imageUrl ? (

                    <img
                      src={appointment.imageUrl}
                      alt={appointment.doctor.name}

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

        text-2xl font-semibold
        text-white
      "
                    >

                      {appointment?.doctor?.name?.charAt(0)}

                    </div>

                  )}

                </div>

                {/* INFO */}

                <div className="flex-1">

                  <p
                    className="
                      text-sm text-slate-500
                    "
                  >

                    Consulting Doctor

                  </p>

                  <h2
                    className="
                      mt-1

                      text-2xl font-semibold

                      text-navy-dark
                    "
                  >

                    {appointment.doctor.name}

                  </h2>

                  <p className="mt-1 text-slate-500">

                    {appointment.doctor.speciality}

                  </p>

                  <div
                    className="
                      mt-5 inline-flex

                      rounded-full

                      bg-teal-50

                      px-4 py-2

                      text-sm font-medium

                      text-teal-700
                    "
                  >

                    {new Date(
                      appointment.slot.startTime
                    ).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>

                </div>

              </div>

            </div>

            {/* CONSULTATION MODE */}

            <div
              className="
                rounded-xl

                border border-slate-200

                bg-white

                p-8

                shadow-sm
              "
            >

              <div className="mb-5">

                <h3
                  className="
                    text-lg font-semibold

                    text-navy-dark
                  "
                >

                  Consultation Mode

                </h3>

                <p
                  className="
                    mt-1 text-sm text-slate-500
                  "
                >

                  Choose how you'd like to attend the consultation

                </p>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* GOOGLE */}

                <button
                  onClick={() =>
                    setMeetingType("google")
                  }

                  className={`
                    rounded-2xl border p-5 text-left transition

                    ${meetingType === "google"

                      ? `
                          border-teal-600
                          bg-teal-50
                        `

                      : `
                          border-slate-200
                          hover:border-slate-300
                        `
                    }
                  `}
                >

                  <p
                    className="
                      font-semibold

                      text-navy-dark
                    "
                  >

                    Google Meet

                  </p>

                  <p
                    className="
                      mt-2

                      text-xs text-slate-500
                    "
                  >

                    Secure online consultation via Google Meet

                  </p>

                </button>

                {/* ZOOM */}

                <button
                  disabled

                  className="
                    relative overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-5 text-left

                    opacity-70
                  "
                >

                  <span
                    className="
                      absolute right-3 top-3

                      rounded-full

                      bg-amber-100

                      px-2 py-1

                      text-[10px]
                      font-semibold

                      text-amber-700
                    "
                  >

                    Coming Soon

                  </span>

                  <p
                    className="
                      font-semibold text-slate-500
                    "
                  >

                    Zoom

                  </p>

                  <p
                    className="
                      mt-2

                      text-xs text-slate-400
                    "
                  >

                    Zoom consultations will be available soon

                  </p>

                </button>

              </div>

            </div>

            {/* MEDICINE */}

            <div
              className="
                rounded-xl

                border border-slate-200

                bg-white

                p-8

                shadow-sm
              "
            >

              <label
                className="
                  flex cursor-pointer
                  items-start gap-4
                "
              >

                <input
                  type="checkbox"

                  checked={needsMedicine}

                  onChange={(e) => {

                    setNeedsMedicine(
                      e.target.checked
                    );

                    if (!e.target.checked) {

                      setDeliveryMode("none");
                    }
                  }}

                  className="mt-1 h-4 w-4"
                />

                <div>

                  <p
                    className="
                      font-semibold

                      text-navy-dark
                    "
                  >

                    Prescription & Medicine Delivery

                  </p>

                  <p
                    className="
                      mt-1

                      text-sm leading-6

                      text-slate-500
                    "
                  >

                    Get prescription copies or medicines delivered after consultation.

                  </p>

                </div>

              </label>

              {/* OPTIONS */}

              {needsMedicine && (

                <div className="mt-6 space-y-4">

                  {/* PRESCRIPTION */}

                  <button
                    onClick={() =>
                      setDeliveryMode(
                        deliveryMode === "prescription"
                          ? "none"
                          : "prescription"
                      )
                    }

                    className={`
                      w-full rounded-2xl border p-5 text-left transition

                      ${deliveryMode === "prescription"

                        ? `
                            border-teal-600
                            bg-teal-50
                          `

                        : `
                            border-slate-200
                          `
                      }
                    `}
                  >

                    <div className="flex justify-between">

                      <span className="font-semibold">
                        Prescription Copy
                      </span>

                      <span>
                        {currencySymbol}
                        {prescriptionFee}
                      </span>

                    </div>

                  </button>

                  {/* DOOR */}

                  <div
                    onClick={() =>
                      setDeliveryMode(
                        deliveryMode === "door"
                          ? "none"
                          : "door"
                      )
                    }

                    className={`
                      w-full rounded-2xl border p-5 text-left transition

                      ${deliveryMode === "door"

                        ? `
                            border-teal-600
                            bg-white-50
                          `

                        : `
                            border-slate-200
                          `
                      }
                    `}
                  >

                    <p className="font-semibold">
                      Door Delivery
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Medicines delivered directly to your address
                    </p>

                    {/* DELIVERY TYPE */}

                    {deliveryMode === "door" && (

                      <div className="mt-5 border-t border-slate-200 pt-5">

                        <p className="mb-3 text-sm font-medium text-navy">
                          Choose delivery speed
                        </p>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                          {/* FAST */}

                          <button
                            type="button"

                            onClick={(e) => {

                              e.stopPropagation();

                              setDeliveryType("FAST");
                            }}

                            className={`
                              rounded-2xl border p-4 text-left transition

                              ${deliveryType === "FAST"

                                ? `
                                    border-emerald-500
                                    bg-emerald-50
                                  `

                                : `
                                    border-slate-200
                                    hover:border-emerald-200
                                  `
                              }
                            `}
                          >

                            <div className="flex items-center justify-between">

                              <span className="font-semibold text-navy">
                                Fast Delivery
                              </span>

                              <span
                                className="
                                  rounded-full

                                  bg-emerald-100

                                  px-2 py-1

                                  text-[10px]
                                  font-semibold

                                  text-emerald-700
                                "
                              >

                                Priority

                              </span>

                            </div>

                            <p
                              className="
                                mt-2

                                text-xs leading-5

                                text-slate-500
                              "
                            >

                              Faster processing and quicker medicine dispatch.

                            </p>

                          </button>

                          {/* NORMAL */}

                          <button
                            type="button"

                            onClick={(e) => {

                              e.stopPropagation();

                              setDeliveryType("NORMAL");
                            }}

                            className={`
                              rounded-2xl border p-4 text-left transition

                              ${deliveryType === "NORMAL"

                                ? `
                                    border-navy
                                    bg-navy/5
                                  `

                                : `
                                    border-slate-200
                                    hover:border-slate-300
                                  `
                              }
                            `}
                          >

                            <div className="flex items-center justify-between">

                              <span className="font-semibold text-navy">
                                Normal Delivery
                              </span>

                              <span
                                className="
                                  rounded-full

                                  bg-slate-100

                                  px-2 py-1

                                  text-[10px]
                                  font-semibold

                                  text-slate-600
                                "
                              >

                                Standard

                              </span>

                            </div>

                            <p
                              className="
                                mt-2

                                text-xs leading-5

                                text-slate-500
                              "
                            >

                              Standard delivery timing with regular dispatch.

                            </p>

                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              )}

              {/* ADDRESS */}

              {needsMedicine &&
                deliveryMode === "door" && (

                  <div className="mt-6">

                    <AddressForm
                      value={address}
                      onChange={setAddress}
                    />

                  </div>

                )}

            </div>

          </div>

          {/* =====================================================
             RIGHT
             ===================================================== */}

          <div
            className="
              sticky top-28

              h-fit

              rounded-xl

              border border-slate-200

              bg-white

              p-8

              shadow-sm
            "
          >

            <h3
              className="
                text-2xl font-semibold

                text-navy-dark
              "
            >

              Payment Summary

            </h3>

            <div className="mt-8 space-y-5">

              {checkoutStage === "FULL" && (

                <div
                  className="
                    flex justify-between

                    text-slate-600
                  "
                >

                  <span>
                    Slot Booking Fee
                  </span>

                  <span>
                    {currencySymbol}
                    {appointment.fees.slotFee}
                  </span>

                </div>

              )}

              <div
                className="
                  flex justify-between

                  text-slate-600
                "
              >

                <span>
                  Consultation Fee
                </span>

                <span>
                  {currencySymbol}
                  {appointment.fees.consultationFee}
                </span>

              </div>

              {needsMedicine &&
                deliveryMode === "prescription" && (

                  <div
                    className="
                    flex justify-between

                    text-slate-600
                  "
                  >

                    <span>
                      Prescription Copy
                    </span>

                    <span>
                      {currencySymbol}
                      {prescriptionFee}
                    </span>

                  </div>

                )}

              <div className="border-t border-gray-300 pt-5">

                <div
                  className="
                    flex items-center justify-between
                  "
                >

                  <span
                    className="
                      text-lg font-semibold

                      text-navy-dark
                    "
                  >

                    Total Payable

                  </span>

                  <span
                    className="
                      text-3xl font-semibold

                      text-teal-600
                    "
                  >

                    {currencySymbol}
                    {totalAmount}

                  </span>

                </div>

              </div>

            </div>

            {/* CTA */}

            <button
              onClick={handlePayment}

              className="
                mt-8 w-full

                rounded-xl

                bg-navy

                py-4

                text-lg font-semibold
                text-white

                transition

                hover:bg-navy-dark
              "
            >

              Continue Payment

            </button>

            <p
              className="
                mt-4

                text-center text-xs

                text-slate-500
              "
            >

              Secure payment powered by{" "}
              {paymentMethod}

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}