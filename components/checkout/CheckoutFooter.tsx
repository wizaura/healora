"use client";

import api from "@/lib/api";

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
    return (
        <section className="rounded-2xl bg-gradient-to-b from-white to-white p-4">
            <div className="mx-auto max-w-lg text-center">

                {/* pill label */}
                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Summary
                </span>

                {/* title */}
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Payment summary
                </h2>

                {/* price */}
                <div className="mt-8 flex items-center justify-between rounded-2xl bg-wellness-bg px-6 py-4">
                    <span className="text-sm font-medium text-navy/70">
                        Consultation fee
                    </span>
                    <span className="text-xl font-semibold text-navy">
                        ₹500
                    </span>
                </div>

                {/* CTA */}
                <button
                    className="
                        mt-8 w-full rounded-2xl
                        bg-navy py-4
                        text-sm font-semibold text-white
                        transition hover:bg-navy/90
                    "
                    onClick={() => {
                        // 🔒 slotId is used here
                        // api.post("/payments/initiate", {
                        //   slotId,
                        //   doctorId,
                        //   paymentMethod
                        // })
                    }}
                >
                    Pay & confirm
                </button>

                <p className="mt-4 text-center text-xs text-navy/50">
                    Secure payment • {paymentMethod.toUpperCase()}
                </p>
            </div>
        </section>
    );
}
