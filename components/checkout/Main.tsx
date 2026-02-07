"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AppointmentSummary from "./AppointmentSummary";
import PaymentMethodCard from "./PaymentMethodCard";
import CheckoutFooter from "./CheckoutFooter";

export default function CheckoutMainPage() {
    const searchParams = useSearchParams();

    const doctorId = searchParams.get("doctorId")!;
    const date = searchParams.get("date")!;
    const slotId = searchParams.get("slotId")!;
    const startTime = searchParams.get("startTime")!;
    const endTime = searchParams.get("endTime")!;

    const [paymentMethod, setPaymentMethod] = useState<
        "razorpay" | "stripe"
    >("razorpay");

    return (
        <>
            {/* ================= HERO / SUMMARY ================= */}
            <section className="py-6">
                <AppointmentSummary
                    doctorId={doctorId}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                />
            </section>

            {/* ================= CHECKOUT CONTENT ================= */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    {/* LEFT — PAYMENT METHOD */}
                    <PaymentMethodCard
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />

                    {/* RIGHT — PRICE SUMMARY */}
                    <div className="sticky top-32 h-fit">
                        <CheckoutFooter
                            doctorId={doctorId}
                            slotId={slotId}
                            date={date}
                            startTime={startTime}
                            endTime={endTime}
                            paymentMethod={paymentMethod}
                        />
                    </div>

                </div>
            </section>
        </>
    );
}
