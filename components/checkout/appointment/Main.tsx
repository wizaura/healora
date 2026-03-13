"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";
import AddressForm from "@/components/checkout/AddressForm";

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

        if (deliveryMode === "prescription") {
            total += 50;
        }

        return total;

    }, [appointment, payMode, deliveryMode]);

    const handlePayment = async () => {

        if (payMode !== "slot" && !meetingType) {
            return toast.error("Please select consultation mode");
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

            if (deliveryMode !== "none")
                payload.deliveryMode = deliveryMode;

            if (deliveryMode === "door")
                payload.address = address;

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
        <section className="min-h-screen bg-slate-50 py-24 px-4">

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER */}

                <div>
                    <h2 className="text-2xl font-semibold text-navy">
                        Complete Appointment Payment
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Review details and complete payment
                    </p>
                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* DOCTOR SUMMARY */}

                    <div className="bg-white border rounded-xl p-5 space-y-2">

                        <div className="font-medium text-slate-900">
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

                        <div className="bg-white border rounded-xl p-5 space-y-3">

                            <p className="text-sm font-medium">
                                Consultation Mode
                            </p>

                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    onClick={() => setMeetingType("google")}
                                    className={`py-2 rounded-lg border text-sm
                ${meetingType === "google"
                                            ? "border-navy bg-navy/5"
                                            : "border-gray-200"
                                        }`}
                                >
                                    Google Meet
                                </button>

                                <button
                                    onClick={() => setMeetingType("zoom")}
                                    className={`py-2 rounded-lg border text-sm
                ${meetingType === "zoom"
                                            ? "border-navy bg-navy/5"
                                            : "border-gray-200"
                                        }`}
                                >
                                    Zoom
                                </button>

                            </div>

                        </div>

                    )}

                    {/* ADDONS */}

                    <div className="bg-white border rounded-xl p-5 space-y-3">

                        <p className="text-sm font-medium">
                            Add-ons
                        </p>

                        <div
                            onClick={() =>
                                setDeliveryMode(
                                    deliveryMode === "prescription"
                                        ? "none"
                                        : "prescription"
                                )
                            }
                            className={`cursor-pointer rounded-xl border p-3 text-sm
            ${deliveryMode === "prescription"
                                    ? "border-navy bg-navy/5"
                                    : "border-gray-200"
                                }`}
                        >
                            Prescription Copy (₹50)
                        </div>

                        <div
                            onClick={() =>
                                setDeliveryMode(
                                    deliveryMode === "door"
                                        ? "none"
                                        : "door"
                                )
                            }
                            className={`cursor-pointer rounded-xl border p-3 text-sm
            ${deliveryMode === "door"
                                    ? "border-navy bg-navy/5"
                                    : "border-gray-200"
                                }`}
                        >
                            Door Delivery
                        </div>

                    </div>

                    {/* ADDRESS */}

                    {deliveryMode === "door" && (

                        <div className="bg-white border rounded-xl p-5">

                            <p className="text-sm font-medium mb-3">
                                Delivery Address
                            </p>

                            <AddressForm
                                value={address}
                                onChange={setAddress}
                            />

                        </div>

                    )}

                    {/* TOTAL */}

                    <div className="bg-white border rounded-xl p-5 flex justify-between text-lg font-semibold">

                        <span>Total Payable</span>

                        <span>₹{totalAmount}</span>

                    </div>

                </div>

                {/* PAY BUTTON */}

                <button
                    onClick={handlePayment}
                    className="w-full md:w-auto md:px-10 rounded-xl bg-navy py-4 text-white font-semibold hover:opacity-90 transition"
                >
                    Pay with {appointment.paymentProvider}
                </button>

            </div>

        </section>
    );
}