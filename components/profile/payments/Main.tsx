"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";

export default function Payments() {
    const [tab, setTab] = useState("PENDING");

    const { data, isLoading } = useQuery({
        queryKey: ["my-bills"],
        queryFn: async () => {
            const res = await api.get("/consultations/my-bills");
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="p-10">Loading...</div>;
    }

    const filtered = data.filter((b: any) =>
        tab === "PENDING"
            ? b.paymentStatus === "PENDING"
            : b.paymentStatus === "PAID"
    );

    return (
        <div className="max-w-5xl mx-auto py-24 px-6 space-y-6">

            <div>
                <h1 className="text-3xl font-semibold">Payments</h1>
                <p className="text-gray-500 text-sm">
                    View your bills and payment history
                </p>
            </div>

            {/* TABS */}
            <div className="flex gap-4 border-b border-gray-300">
                <button
                    onClick={() => setTab("PENDING")}
                    className={`pb-2 ${tab === "PENDING"
                        ? "border-b-2 border-teal-600 font-medium"
                        : "text-gray-400"
                        }`}
                >
                    Pending Bills
                </button>

                <button
                    onClick={() => setTab("PAID")}
                    className={`pb-2 ${tab === "PAID"
                        ? "border-b-2 border-teal-600 font-medium"
                        : "text-gray-400"
                        }`}
                >
                    Payment History
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {filtered.length === 0 && (
                    <div className="text-gray-400 text-sm">
                        No records found
                    </div>
                )}

                {filtered.map((bill: any) => (
                    <div
                        key={bill.id}
                        className="border border-gray-200 rounded-xl p-5 space-y-3"
                    >
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">
                                    Invoice #{bill.invoiceNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(bill.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    {bill.currency} {bill.totalAmount}
                                </p>
                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${bill.paymentStatus === "PAID"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {bill.paymentStatus}
                                </span>
                            </div>
                        </div>

                        {/* ITEMS */}
                        <div className="text-sm text-gray-600 space-y-1">
                            {/* ITEMS */}
                            {bill.pharmacyItems?.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between">
                                    <span>
                                        {item.name} ({item.type})
                                    </span>
                                    <span>
                                        {bill.currency} {item.qty * item.price}
                                    </span>
                                </div>
                            ))}

                            {/* DIVIDER */}
                            <div className="border-t border-gray-200 my-2"></div>

                            {/* SUBTOTAL */}
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>
                                    {bill.currency} {bill.subtotal}
                                </span>
                            </div>

                            {/* DELIVERY */}
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>
                                    {bill.currency} {bill.deliveryCharge}
                                </span>
                            </div>

                            {/* DISCOUNT */}
                            {bill.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>
                                        - {bill.currency} {bill.discount}
                                    </span>
                                </div>
                            )}

                            {/* TOTAL */}
                            <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                                <span>Total</span>
                                <span>
                                    {bill.currency} {bill.totalAmount}
                                </span>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 pt-2">
                            <a
                                href={`/api/payments/invoice/${bill.id}`}
                                target="_blank"
                                className="text-sm border px-3 py-1 rounded-lg"
                            >
                                Download Invoice
                            </a>

                            {bill.paymentStatus === "PENDING" && (
                                <button
                                    onClick={async () => {
                                        try {
                                            const res = await api.post(
                                                `/payments/pay-prescription/${bill.id}`
                                            );

                                            console.log(res.data,'res.data')

                                            const data = res.data.data;

                                            // Razorpay
                                            if (data.gateway === "RAZORPAY") {
                                                const options = {
                                                    key: data.key,
                                                    amount: data.amount,
                                                    currency: data.currency,
                                                    name: "Healora",
                                                    description: "Pharmacy Bill Payment",
                                                    order_id: data.orderId,
                                                    handler: function () {
                                                        window.location.reload();
                                                    },
                                                };

                                                const rzp = new (window as any).Razorpay(options);
                                                rzp.open();
                                            }

                                            // Stripe
                                            if (data.gateway === "STRIPE") {
                                                window.location.href = data.checkoutUrl;
                                            }

                                        } catch (err) {
                                            alert("Payment failed to start");
                                        }
                                    }}
                                    className="text-sm bg-teal-600 text-white px-4 py-1 rounded-lg"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}