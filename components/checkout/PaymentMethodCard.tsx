"use client";

export default function PaymentMethodCard({
    paymentMethod,
    setPaymentMethod,
}: any) {
    return (
        <section className="rounded-2xl bg-gradient-to-b from-white to-white p-4">
            <div className="mx-auto max-w-lg text-center">

                {/* pill label */}
                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Payment
                </span>

                {/* title */}
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Choose payment method
                </h2>

                {/* options */}
                <div className="mt-8 space-y-4 text-left">
                    <Option
                        selected={paymentMethod === "razorpay"}
                        title="Razorpay"
                        desc="UPI, Cards, NetBanking"
                        onClick={() => setPaymentMethod("razorpay")}
                    />

                    <Option
                        selected={paymentMethod === "stripe"}
                        title="Stripe"
                        desc="Cards & International payments"
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
}: {
    selected: boolean;
    title: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full rounded-2xl border px-5 py-4 text-left transition-all cursor-pointer
                ${selected
                    ? "border-navy bg-navy/5"
                    : "border-gray-200 bg-white hover:bg-navy/5"
                }
            `}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-navy">{title}</p>
                    <p className="text-sm text-navy/60">{desc}</p>
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
