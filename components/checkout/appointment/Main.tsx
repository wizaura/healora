"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";
import AddressForm from "@/components/checkout/AddressForm";
import { ArrowLeft } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AppointmentCheckout() {
  const { appointmentId } = useParams();
  const router = useRouter();

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [meetingType, setMeetingType] =
    useState<"google" | "zoom" | null>(null);

  const [deliveryMode, setDeliveryMode] =
    useState<"none" | "prescription" | "door">("none");

  const [needsMedicine, setNeedsMedicine] = useState(false);

  const [payMode, setPayMode] =
    useState<"slot" | "consultation" | "full">("slot");

  const [address, setAddress] = useState<any>({});

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const res = await api.get(
        `/appointments/${appointmentId}/checkout`
      );

      const appt = res.data;
      setAppointment(appt);

      /* determine payment mode */
      if (appt.paymentStatus.slot !== "PAID") {
        setPayMode("slot");
      }

      if (
        appt.paymentStatus.slot === "PAID" &&
        appt.paymentStatus.consultation !== "PAID"
      ) {
        setPayMode("consultation");
      }

      if (
        appt.paymentStatus.slot !== "PAID" &&
        appt.paymentStatus.consultation !== "PAID"
      ) {
        setPayMode("full");
      }

      /* prefill */
      if (appt.meetingType) {
        setMeetingType(appt.meetingType.toLowerCase());
      }

      if (appt.deliveryMode) {
        setDeliveryMode(appt.deliveryMode.toLowerCase());
        setNeedsMedicine(true);
      }

      if (appt.deliveryAddress) {
        setAddress(appt.deliveryAddress);
      }
    } catch {
      toast.error("Failed to load appointment");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = useMemo(() => {
    if (!appointment) return 0;

    let total = 0;

    if (payMode === "slot") {
      total += appointment.fees.slotFee;
    }

    if (payMode === "consultation") {
      total += appointment.fees.consultationFee;
    }

    if (payMode === "full") {
      total +=
        appointment.fees.slotFee +
        appointment.fees.consultationFee;
    }

    if (needsMedicine && deliveryMode === "prescription") {
      total += 50;
    }

    if (needsMedicine && deliveryMode === "door") {
      total += 100;
    }

    return total;
  }, [appointment, payMode, deliveryMode, needsMedicine]);

  const handlePayment = async () => {
    if (payMode !== "slot" && !meetingType) {
      return toast.error("Please select consultation mode");
    }

    if (needsMedicine && deliveryMode === "none") {
      return toast.error("Please choose prescription or door delivery");
    }

    if (deliveryMode === "door" && !address?.line1) {
      return toast.error("Please enter delivery address");
    }

    try {
      const payload: any = {
        appointmentId,
        payMode,
        paymentMethod: appointment.paymentProvider,
      };

      if (meetingType) payload.meetingType = meetingType;

      if (needsMedicine && deliveryMode !== "none") {
        payload.deliveryMode = deliveryMode;
      }

      if (deliveryMode === "door") {
        payload.address = address;
      }

      const paymentRes = await api.post(
        "/payments/initiate",
        payload
      );

      const order = paymentRes.data.data;

      if (appointment.paymentProvider === "razorpay") {
        openRazorpay(order);
      }

      if (appointment.paymentProvider === "stripe") {
        window.location.href = order.checkoutUrl;
      }
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

  const openRazorpay = (order: any) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount * 100,
      currency: "INR",
      order_id: order.orderId,
      name: "Healora",
      description: "Appointment Payment",
      handler: () => {
        router.push("/appointments");
      },
      theme: { color: "#0E3B43" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading || !appointment) return null;

  return (
    <section className="min-h-screen py-24 px-4">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-navy-dark">
              Appointment Checkout
            </h2>
            <p className="text-sm text-navy/60 mt-1">
              Review your appointment and complete payment
            </p>
          </div>

          <button
            onClick={() => router.push("/profile/appointments")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOCTOR SUMMARY */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Doctor</p>
            <div className="font-semibold text-navy-dark">
              {appointment.doctor.name}
            </div>
            <div className="text-sm text-slate-500">
              {appointment.doctor.speciality}
            </div>
            <div className="text-sm text-slate-600">
              {new Date(
                appointment.slot.startTime
              ).toLocaleString("en-IN")}
            </div>
          </div>

          {/* CONSULTATION MODE */}
          {payMode !== "slot" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-navy-dark mb-3">
                Consultation Mode
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMeetingType("google")}
                  className={`py-3 rounded-xl border text-sm font-medium ${
                    meetingType === "google"
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200"
                  }`}
                >
                  Google Meet
                </button>

                <button
                  onClick={() => setMeetingType("zoom")}
                  className={`py-3 rounded-xl border text-sm font-medium ${
                    meetingType === "zoom"
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200"
                  }`}
                >
                  Zoom
                </button>
              </div>
            </div>
          )}

          {/* CHECKBOX */}
          {payMode !== "slot" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsMedicine}
                  onChange={(e) => {
                    setNeedsMedicine(e.target.checked);
                    if (!e.target.checked) {
                      setDeliveryMode("none");
                    }
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-navy-dark">
                    I need prescription / medicine delivery
                  </p>
                  <p className="text-xs text-slate-500">
                    Optional for homeopathy consultations
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* ADDONS */}
          {needsMedicine && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-navy-dark mb-3">
                Delivery Options
              </p>

              <div className="space-y-3">
                <div
                  onClick={() =>
                    setDeliveryMode(
                      deliveryMode === "prescription"
                        ? "none"
                        : "prescription"
                    )
                  }
                  className={`cursor-pointer rounded-xl border p-4 ${
                    deliveryMode === "prescription"
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200"
                  }`}
                >
                  Prescription Copy (₹50)
                </div>

                <div
                  onClick={() =>
                    setDeliveryMode(
                      deliveryMode === "door" ? "none" : "door"
                    )
                  }
                  className={`cursor-pointer rounded-xl border p-4 ${
                    deliveryMode === "door"
                      ? "border-teal-600 bg-teal-50"
                      : "border-slate-200"
                  }`}
                >
                  Door Delivery
                </div>
              </div>
            </div>
          )}

          {/* ADDRESS */}
          {needsMedicine && deliveryMode === "door" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-navy-dark mb-3">
                Delivery Address
              </p>

              <AddressForm value={address} onChange={setAddress} />
            </div>
          )}
        </div>

        {/* TOTAL */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-sm">
          <span className="text-lg font-semibold text-navy-dark">
            Total Payable
          </span>
          <span className="text-2xl font-semibold text-teal-600">
            ₹{totalAmount}
          </span>
        </div>

        {/* PAY BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            className="px-10 py-4 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700"
          >
            Pay with {appointment.paymentProvider}
          </button>
        </div>
      </div>
    </section>
  );
}