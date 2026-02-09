"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutFooter({
    doctorId,
    slotId,
    date,
    startTime,
    endTime,
    paymentMethod,
}: {
    doctorId: string;
    slotId: string;
    date: string;
    startTime: string;
    endTime: string;
    paymentMethod: "razorpay" | "stripe";
}) {
    const [slotFee, setSlotFee] = useState<number>(0);
    const [consultationFee, setConsultationFee] = useState<number>(0);
    const [appointmentId, setAppointmentId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const [slotFeeRes, doctorRes] = await Promise.all([
                    api.get("/settings/slot-fee"),
                    api.get(`/doctor/${doctorId}`),
                ]);

                setSlotFee(slotFeeRes.data.slotFee || 0);
                setConsultationFee(doctorRes.data.consultationFee || 0);
            } catch (err) {
                console.error("Failed to load fees", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFees();
    }, [doctorId]);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // 1️⃣ Initiate booking
            const bookingRes = await api.post("/booking/initiate", {
                doctorId,
                slotId,
            });

            const { appointmentId } = bookingRes.data.data;
            setAppointmentId(appointmentId);

            // 2️⃣ Initiate payment
            const paymentRes = await api.post("/payments/initiate", {
                appointmentId,
                paymentMethod,
            });

            if (paymentMethod === "razorpay") {
                openRazorpay(paymentRes.data.data, appointmentId);
            }

            if (paymentMethod === "stripe") {
                window.location.href = paymentRes.data.data.checkoutUrl;
            }
        } catch (err) {
            toast.error("Failed to initiate payment");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openRazorpay = (order: any, appointmentId: string) => {
        if (!window.Razorpay) {
            toast.error("Payment service not loaded. Please refresh.");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount * 100,
            currency: "INR",
            order_id: order.orderId,
            name: "Healora",
            description: "Slot booking fee",

            handler: () => {
                router.push(`/payment/pending?appointmentId=${appointmentId}`);
            },

            modal: {
                ondismiss: () => {
                    toast.error("Payment cancelled");
                },
            },

            theme: { color: "#0E3B43" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading) return null;

    return (
        <section className="rounded-2xl bg-white p-4">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
            <div className="mx-auto max-w-lg text-center">

                {/* pill */}
                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Summary
                </span>

                {/* title */}
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Confirm your slot
                </h2>

                {/* breakdown */}
                <div className="mt-8 space-y-3 rounded-2xl bg-wellness-bg px-6 py-4 text-left">
                    <div className="flex justify-between text-sm text-navy/70">
                        <span>Doctor consultation fee</span>
                        <span className="font-medium text-navy">
                            ₹{consultationFee}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm text-navy/70">
                        <span>Slot booking fee</span>
                        <span className="font-medium text-navy">
                            ₹{slotFee}
                        </span>
                    </div>

                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="text-sm font-medium text-navy">
                            Pay now
                        </span>
                        <span className="text-xl font-semibold text-navy">
                            ₹{slotFee}
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-navy py-4 text-white font-semibold"
                >
                    {loading ? "Processing..." : "Pay slot fee & confirm"}
                </button>

                <p className="mt-4 text-center text-xs text-navy/50">
                    Slot fee confirms your booking.
                    Consultation fee is paid separately to the doctor.
                </p>

                <p className="mt-1 text-center text-xs text-navy/40">
                    Secure payment • {paymentMethod.toUpperCase()}
                </p>
            </div>
        </section>
    );
}
