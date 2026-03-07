"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

type Props = {
    doctorId: string;
    slotId: string;
    date: string;
    startTime: string;
    endTime: string;
    paymentMethod: "razorpay" | "stripe";
};

export default function CheckoutFooter({
    doctorId,
    slotId,
    date,
    startTime,
    endTime,
    paymentMethod,
}: Props) {
    const [slotFee, setSlotFee] = useState(0);
    const [consultationFee, setConsultationFee] = useState(0);
    const [prescriptionFee, setPrescriptionFee] = useState(50); // small optional fee
    const [loading, setLoading] = useState(true);
    const [meetingType, setMeetingType] = useState<"google" | "zoom" | null>(null);
    const [deliveryMode, setDeliveryMode] = useState<"none" | "prescription" | "door">("none");
    const [address, setAddress] = useState("");
    const deliveryFee = 100; // example

    const [payMode, setPayMode] = useState<"slot" | "full">("slot");
    const [includePrescription, setIncludePrescription] = useState(false);

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

    // 🔥 dynamic total calculation
    const totalAmount = useMemo(() => {
        let total = slotFee;

        if (payMode === "full") {
            total += consultationFee;
        }

        if (deliveryMode === "prescription") {
            total += prescriptionFee;
        }

        return total;
    }, [slotFee, consultationFee, payMode, deliveryMode]);

    const handlePayment = async () => {
        if (payMode === "full" && !meetingType) {
            return toast.error("Please select consultation mode");
        }

        if (deliveryMode === "door" && !address.trim()) {
            return toast.error("Please enter delivery address");
        }

        try {
            setLoading(true);

            // 1️⃣ initiate booking
            const bookingRes = await api.post("/booking/initiate", {
                doctorId,
                slotId,
            });

            const { appointmentId } = bookingRes.data.data;

            // 2️⃣ initiate payment with totalAmount
            const paymentRes = await api.post("/payments/initiate", {
                doctorId,
                slotId,
                payMode,
                meetingType,
                deliveryMode,
                address: deliveryMode === "door" ? address : null,
            });


            if (paymentMethod === "razorpay") {
                openRazorpay(paymentRes.data.data, appointmentId);
            }

            if (paymentMethod === "stripe") {
                window.location.href =
                    paymentRes.data.data.checkoutUrl;
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
            toast.error("Payment service not loaded.");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount * 100,
            currency: "INR",
            order_id: order.orderId,
            name: "Healora",
            description: "Appointment Payment",
            handler: () => {
                router.push(
                    `/payment/pending?appointmentId=${appointmentId}`
                );
            },
            theme: { color: "#0E3B43" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading) return null;

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="max-w-lg mx-auto">

                {/* Title */}
                <h2 className="text-xl font-semibold text-navy mb-6">
                    Choose Payment Option
                </h2>

                {/* Payment Mode Options */}
                <div className="space-y-3">

                    {/* Slot only */}
                    <div
                        onClick={() => setPayMode("slot")}
                        className={`cursor-pointer rounded-xl border p-4 ${payMode === "slot"
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Pay Slot Fee Only
                            </span>
                            <span>₹{slotFee}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Confirm booking now. Consultation later.
                        </p>
                    </div>

                    {/* Full payment */}
                    <div
                        onClick={() => setPayMode("full")}
                        className={`cursor-pointer rounded-xl border p-4 ${payMode === "full"
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Pay Slot + Consultation
                            </span>
                            <span>
                                ₹{slotFee + consultationFee}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Complete payment in one go.
                        </p>
                    </div>
                </div>

                {/* Optional Prescription */}
                <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium">Add-ons</p>

                    <div
                        onClick={() => setDeliveryMode("prescription")}
                        className={`cursor-pointer rounded-xl border p-3 ${deliveryMode === "prescription"
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                            }`}
                    >
                        Prescription Copy (₹{prescriptionFee})
                    </div>

                    <div
                        onClick={() => setDeliveryMode("door")}
                        className={`cursor-pointer rounded-xl border p-3 ${deliveryMode === "door"
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                            }`}
                    >
                        Door-to-door Medicine Delivery
                    </div>
                </div>

                {payMode === "full" && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Choose Consultation Mode</p>
    
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setMeetingType("google")}
                                className={`px-4 py-2 rounded-lg border ${meetingType === "google"
                                    ? "border-navy bg-navy/5"
                                    : "border-gray-200"
                                    }`}
                            >
                                Google Meet
                            </button>
    
                            <button
                                type="button"
                                onClick={() => setMeetingType("zoom")}
                                className={`px-4 py-2 rounded-lg border ${meetingType === "zoom"
                                    ? "border-navy bg-navy/5"
                                    : "border-gray-200"
                                    }`}
                            >
                                Zoom
                            </button>
                        </div>
                    </div>
                )}
                {deliveryMode === "door" && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">
                            Delivery Address
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border px-4 py-3 text-sm"
                            placeholder="Enter full address with pincode"
                        />
                    </div>
                )}

                {/* Summary */}
                <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                    <span>Total Payable</span>
                    <span>₹{totalAmount}</span>
                </div>

                {/* CTA */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-navy py-4 text-white font-semibold hover:opacity-90 transition"
                >
                    {loading ? "Processing..." : "Proceed to Payment"}
                </button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                    Secure payment • {paymentMethod.toUpperCase()}
                </p>
            </div>
        </section>
    );
}