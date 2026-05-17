"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";
import AddressForm from "./AddressForm";
import { getApiError } from "@/lib/util";
import Loader from "../common/Loader";

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
    paymentMethod: "RAZORPAY" | "STRIPE";
};

export default function CheckoutFooter({
    doctorId,
    slotId,
    paymentMethod,
}: Props) {
    const [slotFee, setSlotFee] = useState(0);
    const [consultationFee, setConsultationFee] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState("₹");
    const [currency, setCurrency] = useState("INR");

    const [prescriptionFee, setPrescriptionFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);

    const [loading, setLoading] = useState(true);

    const [meetingType, setMeetingType] = useState<"google" | "zoom" | null>(null);
    const [deliveryMode, setDeliveryMode] = useState<"none" | "prescription" | "door">("none");
    const [payMode, setPayMode] = useState<"SLOT" | "FULL">("FULL");
    const [deliveryType, setDeliveryType] = useState<
        "FAST" | "NORMAL" | null
    >(null);

    const [address, setAddress] = useState<Address>({});
    const [needsMedicine, setNeedsMedicine] = useState(false);

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
                setCurrency(doctorRes.data.currency || "INR");
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

        if (payMode === "FULL") {
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
        if (payMode === "FULL" && !meetingType) {
            return toast.error("Please select consultation mode");
        }

        if (payMode === "FULL" && needsMedicine && deliveryMode === "none") {
            return toast.error("Please choose prescription or medicine delivery");
        }

        if (deliveryMode === "door" && !deliveryType) {
            return toast.error("Please choose delivery speed");
        }

        if (deliveryMode === "door" && !address.line1) {
            return toast.error("Please enter delivery address");
        }

        try {
            setLoading(true);

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            /* ================= BOOKING ================= */

            const bookingRes = await api.post("/booking/initiate", {
                doctorId,
                slotId,
                timeZone,
                paymentMethod,
                currency,

                payMode,
                meetingType: payMode === "FULL" ? meetingType : undefined,
                deliveryMode: needsMedicine ? deliveryMode : "none",
                deliveryType: deliveryMode === "door" ? deliveryType : undefined,
                address: deliveryMode === "door" ? address : undefined,
            });

            const { appointmentId } = bookingRes.data.data;

            /* ================= PAYMENT ================= */

            const paymentRes = await api.post("/payments/initiate", {
                appointmentId,
                paymentMethod, // ✅ ONLY THIS NEEDED
            });

            /* ================= HANDLE GATEWAY ================= */

            if (paymentMethod === "RAZORPAY") {
                openRazorpay(paymentRes.data.data, appointmentId);
            }

            if (paymentMethod === "STRIPE") {
                window.location.href = paymentRes.data.data.checkoutUrl;
            }

        } catch (err) {
            toast.error(getApiError(err));
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

    if (loading) {
        return <Loader fullScreen />;
    }

    return (
        <section className="rounded-2xl md:max-h-[90vh] bg-white shadow-sm flex flex-col">
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
                        onClick={() => setPayMode("FULL")}
                        className={`cursor-pointer rounded-xl border p-4 ${payMode === "FULL"
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
                    <div
                        onClick={() => {
                            setPayMode("SLOT");
                            setDeliveryMode("none");
                            setMeetingType(null);
                        }}
                        className={`cursor-pointer rounded-xl border p-4 ${payMode === "SLOT"
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">Pay Slot Fee Only</span>
                            <span>{currencySymbol}{slotFee}</span>
                        </div>
                    </div>
                </div>

                {/* Ask if medicine/prescription needed */}
                {payMode === "FULL" && (
                    <div className="mt-6">
                        <label className="flex items-center gap-3 cursor-pointer border rounded-xl p-4 border-slate-200 hover:bg-slate-50">
                            <input
                                type="checkbox"
                                checked={needsMedicine}
                                onChange={(e) => {
                                    setNeedsMedicine(e.target.checked);
                                    if (!e.target.checked) {
                                        setDeliveryMode("none");
                                    }
                                }}
                                className="h-4 w-4"
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

                {/* Only show below if FULL PAYMENT */}
                {payMode === "FULL" && (
                    <>
                        {/* Add-ons */}
                        {needsMedicine && (

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
                                    className={`cursor-pointer rounded-xl border p-3 ${deliveryMode === "prescription"
                                        ? "border-navy bg-navy/5"
                                        : "border-gray-200"
                                        }`}
                                >
                                    Prescription Copy ({currencySymbol}{prescriptionFee})
                                </div>

                                <div
                                    className={`
        rounded-2xl border p-4 transition

        ${deliveryMode === "door"
                                            ? "border-navy"
                                            : "border-gray-200"
                                        }
    `}
                                >

                                    <div
                                        onClick={() =>
                                            setDeliveryMode(
                                                deliveryMode === "door"
                                                    ? "none"
                                                    : "door"
                                            )
                                        }
                                        className="cursor-pointer"
                                    >

                                        <div className="flex items-start justify-between gap-3">

                                            <div>

                                                <p className="font-medium text-navy-dark">
                                                    Door-to-door Medicine Delivery
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500 leading-5">
                                                    Get medicines delivered directly to your address.
                                                </p>

                                            </div>

                                            <div
                                                className={`
                    mt-1 h-5 w-5 rounded-full border-2 transition

                    ${deliveryMode === "door"
                                                        ? "border-navy bg-navy"
                                                        : "border-slate-300"
                                                    }
                `}
                                            />

                                        </div>

                                    </div>

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

                                                    onClick={() =>
                                                        setDeliveryType("FAST")
                                                    }

                                                    className={`
                        rounded-2xl border p-4 text-left transition

                        ${deliveryType === "FAST"
                                                            ? "border-emerald-500 bg-emerald-50"
                                                            : "border-slate-200 hover:border-emerald-200"
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

                                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                                        Faster processing and quicker medicine dispatch.
                                                    </p>

                                                </button>

                                                {/* NORMAL */}

                                                <button
                                                    type="button"

                                                    onClick={() =>
                                                        setDeliveryType("NORMAL")
                                                    }

                                                    className={`
                        rounded-2xl border p-4 text-left transition

                        ${deliveryType === "NORMAL"
                                                            ? "border-navy bg-navy/5"
                                                            : "border-slate-200 hover:border-slate-300"
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

                                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                                        Standard delivery timing with regular dispatch.
                                                    </p>

                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>
                            </div>
                        )}

                        {/* Meeting Mode */}
                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-medium">
                                Choose Consultation Mode
                            </p>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMeetingType("google")}
                                    className={`flex-1 py-2 rounded-lg border ${meetingType === "google"
                                        ? "border-navy bg-navy/5"
                                        : "border-gray-200"
                                        }`}
                                >
                                    Google Meet
                                </button>

                                <button
                                    type="button"
                                    disabled
                                    className="
        relative flex-1 overflow-hidden

        rounded-lg border border-slate-200

        bg-slate-50

        py-3

        text-sm font-medium text-slate-400

        cursor-not-allowed
    "
                                >

                                    <span>
                                        Zoom
                                    </span>

                                    <span
                                        className="
            absolute right-2 top-2

            rounded-full

            bg-amber-100

            px-2 py-0.5

            text-[8px]
            font-semibold

            uppercase tracking-wide

            text-amber-700
        "
                                    >
                                        Coming Soon
                                    </span>

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
                <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
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