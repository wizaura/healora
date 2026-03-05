"use client";

import { Globe, Flag } from "lucide-react";

export default function PaymentMethodCard({
    paymentMethod,
    setPaymentMethod,
}: any) {
    return (
        <section className="rounded-3xl bg-white shadow-sm border border-gray-100 p-8">
            <div className="mx-auto max-w-lg text-center">

                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Payment
                </span>

                <h2 className="text-2xl font-semibold text-navy">
                    Choose payment method
                </h2>

                <div className="mt-8 space-y-4 text-left">

                    {/* Razorpay - India */}
                    <Option
                        selected={paymentMethod === "razorpay"}
                        icon={<Flag size={16} />}
                        title="Razorpay"
                        tag="India"
                        desc="UPI, Cards, NetBanking (Domestic payments)"
                        onClick={() => setPaymentMethod("razorpay")}
                    />

                    {/* Stripe - International */}
                    <Option
                        selected={paymentMethod === "stripe"}
                        icon={<Globe size={16} />}
                        title="Stripe"
                        tag="International"
                        desc="Cards & global payments"
                        onClick={() => setPaymentMethod("stripe")}
                    />
                </div>
            </div>
        </section>
    );
}

function Option({
    selected,
    title,
    desc,
    onClick,
    tag,
    icon,
}: {
    selected: boolean;
    title: string;
    desc: string;
    onClick: () => void;
    tag: string;
    icon: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full rounded-2xl border px-6 py-5 text-left transition-all
                ${selected
                    ? "border-navy bg-navy/5 shadow-sm"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }
            `}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-navy">{icon}</span>
                        <p className="font-semibold text-navy">{title}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            {tag}
                        </span>
                    </div>
                    <p className="text-sm text-navy/60 mt-1">{desc}</p>
                </div>

                {selected && (
                    <span className="text-xs font-medium text-navy">
                        Selected
                    </span>
                )}
            </div>
        </button>
    );
}