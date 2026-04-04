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
    return (
      <div className="max-w-5xl mx-auto py-24 px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-24 bg-slate-200 rounded-xl" />
          <div className="h-24 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const filtered = data.filter((b: any) =>
    tab === "PENDING"
      ? b.paymentStatus === "PENDING"
      : b.paymentStatus === "PAID"
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8">

      {/* TABS */}
      <div className="flex gap-3">
        <button
          onClick={() => setTab("PENDING")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              tab === "PENDING"
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
        >
          Pending Bills
        </button>

        <button
          onClick={() => setTab("PAID")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              tab === "PAID"
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
        >
          Payment History
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-400 text-sm">
              No payment records found
            </p>
          </div>
        )}

        {filtered.map((bill: any) => (
          <div
            key={bill.id}
            className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm space-y-4"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-navy-dark">
                  Invoice #{bill.invoiceNumber}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(bill.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg text-navy-dark">
                  {bill.currency} {bill.totalAmount}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    bill.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {bill.paymentStatus}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="text-sm text-slate-600 space-y-2">
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

              <div className="border-t border-slate-200 my-2"></div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {bill.currency} {bill.subtotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {bill.currency} {bill.deliveryCharge}
                </span>
              </div>

              {bill.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    - {bill.currency} {bill.discount}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-navy-dark border-t border-slate-200 pt-2 mt-2">
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
                className="text-sm border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50"
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

                      const data = res.data.data;

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

                      if (data.gateway === "STRIPE") {
                        window.location.href = data.checkoutUrl;
                      }
                    } catch (err) {
                      alert("Payment failed to start");
                    }
                  }}
                  className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg"
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