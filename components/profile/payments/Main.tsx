"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import Loader from "@/components/common/Loader";

export default function Payments() {

  const [tab, setTab] =
    useState("PENDING");

  const {
    data = [],
    isLoading,
  } = useQuery({

    queryKey: ["my-bills"],

    queryFn: async () => {

      const res = await api.get(
        "/consultations/my-bills"
      );

      return res.data;
    },
  });

  if (isLoading) {

    return <Loader fullScreen />
  }

  const filtered = data.filter((b: any) =>

    tab === "PENDING"

      ? b.paymentStatus === "PENDING"

      : b.paymentStatus === "PAID"
  );

  const pendingCount =
    data.filter(
      (b: any) =>
        b.paymentStatus === "PENDING"
    ).length;

  const paidCount =
    data.filter(
      (b: any) =>
        b.paymentStatus === "PAID"
    ).length;

  return (

    <div className="min-h-screen py-12">

      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* HEADER */}
        <div
          className="
        rounded-lg
        border border-slate-200

        bg-white

        px-5 py-4

        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between

        gap-5

        shadow-sm
    "
        >

          {/* LEFT */}
          <div className="space-y-3">

            {/* TABS */}
            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  setTab("PENDING")
                }
                className={`
                    px-4 py-2

                    rounded-lg

                    text-sm font-medium

                    transition

                    ${tab === "PENDING"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }
                `}
              >
                Pending Bills
              </button>

              <button
                onClick={() =>
                  setTab("PAID")
                }
                className={`
                    px-4 py-2

                    rounded-lg

                    text-sm font-medium

                    transition

                    ${tab === "PAID"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }
                `}
              >
                Payment History
              </button>

            </div>

            {/* COUNT */}
            <p className="text-sm text-slate-500">

              Showing{" "}

              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{" "}

              records

            </p>

          </div>

          {/* RIGHT STATS */}
          <div className="flex gap-3 flex-wrap">

            {/* PENDING */}
            <div
              className="
                rounded-lg

                bg-amber-50
                border border-amber-100

                px-4 py-3

                min-w-[120px]
            "
            >

              <p className="text-xs text-amber-700">
                Pending
              </p>

              <p className="mt-1 text-xl font-semibold text-amber-600">
                {pendingCount}
              </p>

            </div>

            {/* PAID */}
            <div
              className="
                rounded-lg

                bg-emerald-50
                border border-emerald-100

                px-4 py-3

                min-w-[120px]
            "
            >

              <p className="text-xs text-emerald-700">
                Paid
              </p>

              <p className="mt-1 text-xl font-semibold text-emerald-600">
                {paidCount}
              </p>

            </div>

          </div>

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {/* EMPTY */}
          {filtered.length === 0 && (

            <div
              className="
                                rounded-lg

                                border border-dashed border-slate-300

                                bg-white

                                py-16 px-6

                                text-center

                                shadow-sm
                            "
            >

              <div
                className="
                                    h-14 w-14

                                    rounded-full

                                    bg-slate-100

                                    flex items-center justify-center

                                    mx-auto mb-4
                                "
              >
                <CreditCard />
              </div>

              <h3 className="text-sm font-medium text-slate-700">
                No payment records found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your bills and invoices
                will appear here.
              </p>

            </div>

          )}

          {/* CARDS */}
          {filtered.map((bill: any) => (

            <div
              key={bill.id}
              className="
                                rounded-lg

                                border border-slate-200

                                bg-white

                                p-5

                                shadow-sm

                                space-y-5
                            "
            >

              {/* TOP */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div>

                  <p className="font-semibold text-slate-900">
                    Invoice #{bill.invoiceNumber}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(
                      bill.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="sm:text-right">

                  <p className="text-xl font-semibold text-slate-900">
                    {bill.currency}{" "}
                    {bill.totalAmount}
                  </p>

                  <span
                    className={`
                                            inline-flex items-center

                                            mt-2

                                            rounded-full

                                            px-3 py-1

                                            text-xs font-medium

                                            ${bill.paymentStatus === "PAID"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                      }
                                        `}
                  >
                    {bill.paymentStatus}
                  </span>

                </div>

              </div>

              {/* ITEMS */}
              <div className="space-y-2 text-sm text-slate-600">

                {bill.pharmacyItems?.map(
                  (item: any, i: number) => (

                    <div
                      key={i}
                      className="
                                                flex items-center justify-between gap-4
                                            "
                    >

                      <span>
                        {item.name} ({item.type})
                      </span>

                      <span className="font-medium text-slate-700">
                        {bill.currency}{" "}
                        {item.qty * item.price}
                      </span>

                    </div>
                  )
                )}

                <div className="border-t border-slate-200 my-3" />

                <div className="flex justify-between">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    {bill.currency}{" "}
                    {bill.subtotal}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Delivery
                  </span>

                  <span>
                    {bill.currency}{" "}
                    {bill.deliveryCharge}
                  </span>

                </div>

                {bill.discount > 0 && (

                  <div className="flex justify-between text-emerald-600">

                    <span>
                      Discount
                    </span>

                    <span>
                      - {bill.currency}{" "}
                      {bill.discount}
                    </span>

                  </div>

                )}

                <div
                  className="
                                        flex justify-between

                                        border-t border-slate-200

                                        pt-3 mt-3

                                        font-semibold text-slate-900
                                    "
                >

                  <span>
                    Total
                  </span>

                  <span>
                    {bill.currency}{" "}
                    {bill.totalAmount}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap justify-end gap-3 pt-2">

                {/* DOWNLOAD */}
                <a
                  href={`/api/payments/invoice/${bill.id}`}
                  target="_blank"
                  className="
                                        inline-flex items-center

                                        rounded-lg

                                        border border-slate-300

                                        px-4 py-2

                                        text-sm font-medium text-slate-700

                                        hover:bg-slate-50

                                        transition
                                    "
                >
                  Download Invoice
                </a>

                {/* PAY */}
                {bill.paymentStatus === "PENDING" && (

                  <button
                    onClick={async () => {

                      try {

                        const res =
                          await api.post(
                            `/payments/pay-prescription/${bill.id}`
                          );

                        const data =
                          res.data.data;

                        if (
                          data.gateway ===
                          "RAZORPAY"
                        ) {

                          const options = {

                            key: data.key,

                            amount: data.amount,

                            currency:
                              data.currency,

                            name: "Healora",

                            description:
                              "Pharmacy Bill Payment",

                            order_id:
                              data.orderId,

                            handler:
                              function () {

                                window.location.reload();
                              },
                          };

                          const rzp =
                            new (
                              window as any
                            ).Razorpay(
                              options
                            );

                          rzp.open();
                        }

                        if (
                          data.gateway ===
                          "STRIPE"
                        ) {

                          window.location.href =
                            data.checkoutUrl;
                        }

                      } catch {

                        alert(
                          "Payment failed to start"
                        );
                      }
                    }}
                    className="
                                            inline-flex items-center

                                            rounded-lg

                                            bg-teal-600
                                            hover:bg-teal-700

                                            px-5 py-2

                                            text-sm font-medium text-white

                                            transition
                                        "
                  >
                    Pay Now
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}