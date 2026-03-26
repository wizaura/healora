"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";
import AddressForm from "./AddressForm";

declare global {
    interface Window {
        Razorpay: any;
    }
}

type Address = {
    name?: string;
    phone?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
};

type Props = {
    doctorId: string;
    slotId: string;
    paymentMethod: "razorpay" | "stripe";
};

export default function CheckoutFooter({
    doctorId,
    slotId,
    paymentMethod,
}: Props) {
    const [slotFee, setSlotFee] = useState(0);
    const [consultationFee, setConsultationFee] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState("₹");

    const [prescriptionFee, setPrescriptionFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);

    const [loading, setLoading] = useState(true);

    const [meetingType, setMeetingType] = useState<"google" | "zoom" | null>(null);
    const [deliveryMode, setDeliveryMode] = useState<"none" | "prescription" | "door">("none");
    const [payMode, setPayMode] = useState<"slot" | "full">("slot");

    const [address, setAddress] = useState<Address>({});

    const router = useRouter();

    /* ---------------- Fetch Fees ---------------- */
    useEffect(() => {
        const fetchFees = async () => {
            try {
                const [slotFeeRes, prescriptionRes, doctorRes] = await Promise.all([
                    api.get("/settings/slot-fee"),
                    api.get("/settings/prescription-fee"),
                    api.get(`/doctor/${doctorId}`),
                ]);

                setSlotFee(slotFeeRes.data.slotFee || 0);
                setPrescriptionFee(prescriptionRes.data.prescriptionFee || 0);
                setDeliveryFee(prescriptionRes.data.deliveryFee || 0);

                setConsultationFee(doctorRes.data.consultationFee || 0);
                setCurrencySymbol(doctorRes.data.currencySymbol || "₹");
            } catch (err) {
                console.error("Failed to load fees", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFees();
    }, [doctorId]);

    /* ---------------- Total Calculation ---------------- */
    const totalAmount = useMemo(() => {
        let total = slotFee;

        if (payMode === "full") {
            total += consultationFee;

            if (deliveryMode === "prescription") {
                total += prescriptionFee;
            }

            if (deliveryMode === "door") {
                total += deliveryFee;
            }
        }

        return total;
    }, [slotFee, consultationFee, payMode, deliveryMode, prescriptionFee, deliveryFee]);

    /* ---------------- Payment ---------------- */
    const handlePayment = async () => {
        if (payMode === "full" && !meetingType) {
            return toast.error("Please select consultation mode");
        }

        if (payMode === "full" && deliveryMode === "none") {
            return toast.error("Please choose prescription or medicine delivery");
        }

        if (deliveryMode === "door" && !address.line1) {
            return toast.error("Please enter delivery address");
        }

        try {
            setLoading(true);

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const bookingRes = await api.post("/booking/initiate", {
                doctorId,
                slotId,
                timeZone,
            });

            const { appointmentId } = bookingRes.data.data;

            const payload: any = {
                appointmentId,
                doctorId,
                slotId,
                payMode,
                paymentMethod,
            };

            if (payMode === "full") {
                payload.meetingType = meetingType;
                payload.deliveryMode = deliveryMode;
            }

            if (deliveryMode === "door") {
                payload.address = address;
            }

            const paymentRes = await api.post("/payments/initiate", payload);

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
            toast.error("Payment service not loaded.");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount * 100,
            currency: order.currency,
            order_id: order.orderId,
            name: "Healora",
            description: "Appointment Payment",
            handler: () => {
                router.push(`/payment/pending?appointmentId=${appointmentId}`);
            },
            theme: { color: "#0E3B43" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading) return null;

    return (
        <section className="rounded-2xl bg-white shadow-sm max-h-[650px] flex flex-col">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="overflow-y-auto p-6 max-w-lg mx-auto w-full">

                <h2 className="text-xl font-semibold text-navy mb-6">
                    Choose Payment Option
                </h2>

                {/* Payment Mode */}
                <div className="space-y-3">
                    <div
                        onClick={() => {
                            setPayMode("slot");
                            setDeliveryMode("none");
                            setMeetingType(null);
                        }}
                        className={`cursor-pointer rounded-xl border p-4 ${
                            payMode === "slot"
                                ? "border-navy bg-navy/5"
                                : "border-gray-200"
                        }`}
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">Pay Slot Fee Only</span>
                            <span>{currencySymbol}{slotFee}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => setPayMode("full")}
                        className={`cursor-pointer rounded-xl border p-4 ${
                            payMode === "full"
                                ? "border-navy bg-navy/5"
                                : "border-gray-200"
                        }`}
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Pay Slot + Consultation
                            </span>
                            <span>{currencySymbol}{slotFee + consultationFee}</span>
                        </div>
                    </div>
                </div>

                {/* Only show below if FULL PAYMENT */}
                {payMode === "full" && (
                    <>
                        {/* Add-ons */}
                        <div className="mt-6 space-y-3">
                            <p className="text-sm font-medium">Add-ons</p>

                            <div
                                onClick={() =>
                                    setDeliveryMode(
                                        deliveryMode === "prescription"
                                            ? "none"
                                            : "prescription"
                                    )
                                }
                                className={`cursor-pointer rounded-xl border p-3 ${
                                    deliveryMode === "prescription"
                                        ? "border-navy bg-navy/5"
                                        : "border-gray-200"
                                }`}
                            >
                                Prescription Copy ({currencySymbol}{prescriptionFee})
                            </div>

                            <div
                                onClick={() =>
                                    setDeliveryMode(
                                        deliveryMode === "door" ? "none" : "door"
                                    )
                                }
                                className={`cursor-pointer rounded-xl border p-3 ${
                                    deliveryMode === "door"
                                        ? "border-navy bg-navy/5"
                                        : "border-gray-200"
                                }`}
                            >
                                Door-to-door Medicine Delivery
                            </div>
                        </div>

                        {/* Meeting Mode */}
                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-medium">
                                Choose Consultation Mode
                            </p>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMeetingType("google")}
                                    className={`flex-1 py-2 rounded-lg border ${
                                        meetingType === "google"
                                            ? "border-navy bg-navy/5"
                                            : "border-gray-200"
                                    }`}
                                >
                                    Google Meet
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMeetingType("zoom")}
                                    className={`flex-1 py-2 rounded-lg border ${
                                        meetingType === "zoom"
                                            ? "border-navy bg-navy/5"
                                            : "border-gray-200"
                                    }`}
                                >
                                    Zoom
                                </button>
                            </div>
                        </div>

                        {/* Address */}
                        {deliveryMode === "door" && (
                            <div className="mt-6">
                                <p className="text-sm font-medium mb-3">
                                    Delivery Address
                                </p>

                                <AddressForm value={address} onChange={setAddress} />
                            </div>
                        )}
                    </>
                )}

                {/* Total */}
                <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                    <span>Total Payable</span>
                    <span>{currencySymbol}{totalAmount}</span>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-navy py-4 text-white font-semibold"
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