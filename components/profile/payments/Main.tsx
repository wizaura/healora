"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";

import {
    CreditCard,
    Download,
    Copy,
} from "lucide-react";

import Loader from "@/components/common/Loader";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Payments() {

    const [tab, setTab] =
        useState("PENDING");

    const {
        data: bills = [],
        isLoading:
        billsLoading,
    } = useQuery({

        queryKey: [
            "my-bills",
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/consultations/my-bills"
                );

            return res.data;
        },
    });

    const {
        data: history = [],
        isLoading:
        historyLoading,
    } = useQuery({

        queryKey: [
            "payment-history",
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/payments/my-history"
                );

            return res.data;
        },
    });

    if (billsLoading || historyLoading) {

        return <Loader fullScreen />;
    }

    console.log(bills, history, 'as')

    const billsMap =
        new Map(

            bills.map(
                (bill: any) => [

                    bill.id,

                    bill,
                ]
            )
        );

    const filtered =

        tab === "PENDING"

            ? bills.filter(
                (b: any) =>

                    b.paymentStatus ===
                    "PENDING"
            )

            : history.filter(
                (p: any) =>

                    p.status ===
                    "PAID"
            );

    const pendingCount =
        bills.filter(
            (b: any) =>

                b.paymentStatus ===
                "PENDING"
        ).length;

    const paidCount =
        history.filter(
            (p: any) =>

                p.status ===
                "PAID"
        ).length;

    const isPendingTab =
        tab === "PENDING";

    return (

        <div className="space-y-8">

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                {/* =====================================================
                   HEADER
                   ===================================================== */}

                <div
                    className="
                        border-b border-slate-200

                        bg-gradient-to-r
                        from-wellness-bg/90
                        via-wellness-bg/50
                        to-white

                        px-8 py-7
                    "
                >

                    <div
                        className="
                            flex flex-col gap-6

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        {/* LEFT */}

                        <div>

                            <div
                                className="
                                    inline-flex items-center gap-2

                                    rounded-full

                                    border border-teal-100

                                    bg-white

                                    px-3 py-1

                                    text-xs font-semibold

                                    uppercase tracking-wide

                                    text-teal-700
                                "
                            >

                                Billing & Payments

                            </div>

                            <h1
                                className="
                                    mt-4

                                    text-3xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                            >

                                Pharmacy Bills

                            </h1>

                            <p
                                className="
                                    mt-2

                                    max-w-2xl

                                    text-sm leading-6

                                    text-slate-500
                                "
                            >

                                Manage pending invoices,
                                completed payments, and
                                prescription billing history.

                            </p>

                        </div>

                        {/* STATS */}

                        <div className="flex flex-wrap gap-4">

                            {/* PENDING */}

                            <div
                                className="
                                    rounded-xl

                                    border border-amber-100

                                    bg-white

                                    px-5 py-4

                                    shadow-sm

                                    min-w-[140px]
                                "
                            >

                                <p
                                    className="
                                        text-xs font-medium

                                        uppercase tracking-wide

                                        text-amber-600
                                    "
                                >

                                    Pending

                                </p>

                                <p
                                    className="
                                        mt-2

                                        text-3xl font-semibold

                                        text-slate-900
                                    "
                                >

                                    {pendingCount}

                                </p>

                            </div>

                            {/* PAID */}

                            <div
                                className="
                                    rounded-xl

                                    border border-emerald-100

                                    bg-white

                                    px-5 py-4

                                    shadow-sm

                                    min-w-[140px]
                                "
                            >

                                <p
                                    className="
                                        text-xs font-medium

                                        uppercase tracking-wide

                                        text-emerald-600
                                    "
                                >

                                    Paid

                                </p>

                                <p
                                    className="
                                        mt-2

                                        text-3xl font-semibold

                                        text-slate-900
                                    "
                                >

                                    {paidCount}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================================
                   CONTENT
                   ===================================================== */}

                <div className="p-6 md:p-8">

                    {/* =====================================================
                       TABS
                       ===================================================== */}

                    <div
                        className="
                            flex flex-col gap-5

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <div
                            className="
                                inline-flex

                                rounded-xl

                                border border-slate-200

                                bg-slate-100

                                p-1
                            "
                        >

                            <button
                                onClick={() =>
                                    setTab("PENDING")
                                }

                                className={`
                                    rounded-xl

                                    px-5 py-2.5

                                    text-sm font-medium

                                    transition

                                    ${tab === "PENDING"

                                        ? `
                                            bg-white
                                            text-slate-900
                                            shadow-sm
                                        `

                                        : `
                                            text-slate-500
                                            hover:text-slate-700
                                        `
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
                                    rounded-xl

                                    px-5 py-2.5

                                    text-sm font-medium

                                    transition

                                    ${tab === "PAID"

                                        ? `
                                            bg-white
                                            text-slate-900
                                            shadow-sm
                                        `

                                        : `
                                            text-slate-500
                                            hover:text-slate-700
                                        `
                                    }
                                `}
                            >

                                Payment History

                            </button>

                        </div>

                        {/* RECORD COUNT */}

                        <p className="text-sm text-slate-500">

                            Showing{" "}

                            <span className="font-semibold text-slate-800">

                                {filtered.length}

                            </span>{" "}

                            records

                        </p>

                    </div>

                    {/* =====================================================
                       EMPTY
                       ===================================================== */}

                    {filtered.length === 0 && (

                        <div
                            className="
                                mt-8

                                rounded-2xl

                                border border-dashed border-slate-300

                                bg-white

                                py-20 px-6

                                text-center

                                shadow-sm
                            "
                        >

                            <div
                                className="
                                    mx-auto mb-5

                                    flex h-16 w-16
                                    items-center justify-center

                                    rounded-full

                                    bg-slate-100
                                "
                            >

                                <CreditCard
                                    className="text-slate-500"
                                />

                            </div>

                            <h3
                                className="
                                    text-lg font-semibold

                                    text-slate-800
                                "
                            >

                                No payment records found

                            </h3>

                            <p
                                className="
                                    mt-2

                                    text-sm

                                    text-slate-500
                                "
                            >

                                Your bills and invoices
                                will appear here.

                            </p>

                        </div>

                    )}

                    {/* =====================================================
                       LIST
                       ===================================================== */}

                    <div className="mt-8 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                        {filtered.map((item: any) => {

                            const isPendingTab =
                                tab === "PENDING";

                            const isAppointment =
                                item.type !==
                                "PHARMACY_BILL";

                            const prescription =
                                isPendingTab

                                    ? item

                                    : (

                                        item.prescription

                                            &&

                                            billsMap.get(
                                                item.prescription.id
                                            )

                                            ? {

                                                ...item.prescription,

                                                ...(billsMap.get(
                                                    item.prescription.id
                                                ) as any),
                                            }

                                            : item.prescription
                                    );
                            const appointment =
                                isPendingTab

                                    ? item.appointment

                                    : item.appointment;

                            return (

                                <div
                                    key={item.id}

                                    className="
                overflow-hidden

                rounded-2xl

                border border-slate-200

                bg-white

                shadow-sm

                transition-all duration-300

                hover:-translate-y-1
                hover:shadow-lg
            "
                                >

                                    <div className="p-6 space-y-6">

                                        {/* =====================================================
                   TOP
                   ===================================================== */}

                                        <div
                                            className="
                        flex flex-col gap-6

                        rounded-2xl

                        border border-slate-200

                        bg-gradient-to-br
                        from-white
                        to-slate-50

                        p-6

                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                                        >

                                            {/* LEFT */}

                                            <div className="flex-1 space-y-5">

                                                {/* META */}

                                                <div
                                                    className="
                                flex flex-wrap
                                items-center
                                gap-3
                            "
                                                >

                                                    <div
                                                        className="
                                    inline-flex items-center

                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-semibold

                                    text-slate-600
                                "
                                                    >

                                                        {isPendingTab

                                                            ? "Invoice"

                                                            : isAppointment

                                                                ? "Appointment"

                                                                : "Pharmacy"}
                                                    </div>

                                                    <p
                                                        className="
                                    text-xl font-semibold

                                    text-slate-900
                                "
                                                    >

                                                        {isPendingTab

                                                            ? `#${item.invoiceNumber}`

                                                            : isAppointment

                                                                ? ""

                                                                : `#${prescription?.invoiceNumber}`}
                                                    </p>

                                                    <span className="text-slate-300">
                                                        •
                                                    </span>

                                                    <p className="text-sm text-slate-500">

                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()}

                                                    </p>

                                                </div>

                                                {/* PRESCRIPTION DETAILS */}

                                                {(isPendingTab ||

                                                    !isAppointment)

                                                    &&

                                                    prescription && (

                                                        <div className="space-y-3">

                                                            {prescription.trackingId && (

                                                                <div>

                                                                    <p
                                                                        className="
                                                    text-xs font-medium

                                                    uppercase tracking-wide

                                                    text-slate-400
                                                "
                                                                    >

                                                                        Tracking ID

                                                                    </p>

                                                                    <div
                                                                        className="
                                                    mt-2

                                                    inline-flex items-center gap-2

                                                    rounded-2xl

                                                    border border-slate-200

                                                    bg-white

                                                    px-4 py-3
                                                "
                                                                    >

                                                                        <span
                                                                            className="
                                                        font-mono

                                                        text-sm font-semibold

                                                        text-slate-800
                                                    "
                                                                        >

                                                                            {prescription.trackingId}

                                                                        </span>

                                                                        <button
                                                                            onClick={() =>
                                                                                navigator.clipboard.writeText(
                                                                                    prescription.trackingId
                                                                                )
                                                                            }

                                                                            className="
                                                        flex items-center gap-1

                                                        rounded-xl

                                                        border border-slate-200

                                                        bg-slate-50

                                                        px-3 py-1.5

                                                        text-xs font-medium

                                                        text-teal-700

                                                        transition

                                                        hover:bg-teal-50
                                                    "
                                                                        >

                                                                            <Copy size={12} />

                                                                            Copy

                                                                        </button>

                                                                    </div>

                                                                </div>
                                                            )}

                                                            <div className="space-y-2">

                                                                {/* DELIVERY */}

                                                                <div className="text-sm text-slate-600">

                                                                    Delivery Mode:{" "}

                                                                    <span className="font-semibold text-slate-800">

                                                                        {
                                                                            prescription
                                                                                ?.deliveryMode
                                                                        }

                                                                    </span>

                                                                </div>

                                                                {/* PAYMENT */}

                                                                <div className="text-sm text-slate-600">

                                                                    Payment Provider:{" "}

                                                                    <span className="font-semibold text-slate-800">

                                                                        {prescription.paymentMethod}

                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    )}

                                                {/* APPOINTMENT DETAILS */}

                                                {!isPendingTab &&
                                                    isAppointment &&
                                                    appointment && (

                                                        <div className="space-y-2">

                                                            <div className="text-sm text-slate-600">

                                                                Doctor:{" "}

                                                                <span className="font-semibold text-slate-800">

                                                                    {
                                                                        appointment
                                                                            ?.doctor
                                                                            ?.user
                                                                            ?.name
                                                                    }

                                                                </span>

                                                            </div>

                                                            <div className="text-sm text-slate-600">

                                                                Meeting Type:{" "}

                                                                <span className="font-semibold text-slate-800">

                                                                    {
                                                                        appointment
                                                                            ?.meetingType
                                                                    }

                                                                </span>

                                                            </div>

                                                            <div className="text-sm text-slate-600">

                                                                Payment Provider:{" "}

                                                                <span className="font-semibold text-slate-800">

                                                                    {item.provider}

                                                                </span>

                                                            </div>

                                                        </div>
                                                    )}

                                            </div>

                                            {/* RIGHT */}

                                            <div
                                                className="
                            flex flex-col gap-4

                            lg:items-end
                        "
                                            >

                                                <div>

                                                    <p
                                                        className="
                                    text-xs font-medium

                                    uppercase tracking-wide

                                    text-slate-400
                                "
                                                    >

                                                        Total Amount

                                                    </p>

                                                    <p
                                                        className="
                                    mt-2

                                    text-4xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                                                    >

                                                        {item.currency}{" "}

                                                        {isPendingTab

                                                            ? item.totalAmount

                                                            : item.amount}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`
                                inline-flex items-center

                                rounded-full

                                px-4 py-1.5

                                text-xs font-semibold

                                tracking-wide

                                ${(
                                                            item.paymentStatus === "PAID" ||

                                                            item.status === "PAID"
                                                        )

                                                            ? `
                                        bg-emerald-100
                                        text-emerald-700
                                    `

                                                            : `
                                        bg-amber-100
                                        text-amber-700
                                    `
                                                        }
                            `}
                                                >

                                                    {(
                                                        item.paymentStatus === "PAID" ||

                                                        item.status === "PAID"
                                                    )

                                                        ? "Paid"

                                                        : "Pending Payment"}

                                                </span>

                                            </div>

                                        </div>

                                        {/* =====================================================
                   PENDING PRESCRIPTION ITEMS
                   ===================================================== */}

                                        {isPendingTab &&
                                            item.pharmacyItems?.length > 0 && (

                                                <div
                                                    className="
                                rounded-2xl

                                border border-slate-200

                                bg-slate-50/60

                                p-5

                                text-sm text-slate-600
                            "
                                                >

                                                    <div className="space-y-2">

                                                        {item.pharmacyItems.map(
                                                            (
                                                                medicine: any,
                                                                i: number
                                                            ) => (

                                                                <div
                                                                    key={i}

                                                                    className="
                                                flex items-center justify-between gap-4

                                                rounded-xl

                                                px-3 py-2

                                                transition

                                                hover:bg-white
                                            "
                                                                >

                                                                    <span>

                                                                        {medicine.name}

                                                                    </span>

                                                                    <span
                                                                        className="
                                                    font-semibold

                                                    text-slate-800
                                                "
                                                                    >

                                                                        {item.currency}{" "}

                                                                        {medicine.qty * medicine.price}

                                                                    </span>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>

                                                    <div className="my-4 border-t border-slate-200" />

                                                    <div className="space-y-3">

                                                        <div className="flex justify-between">

                                                            <span>Subtotal</span>

                                                            <span>

                                                                {item.currency} {item.subtotal}

                                                            </span>

                                                        </div>

                                                        <div className="flex justify-between">

                                                            <span>Delivery</span>

                                                            <span>

                                                                {item.currency} {item.deliveryCharge}

                                                            </span>

                                                        </div>

                                                        {item.discount > 0 && (

                                                            <div
                                                                className="
                                            flex justify-between

                                            text-emerald-600
                                        "
                                                            >

                                                                <span>Discount</span>

                                                                <span>

                                                                    - {item.currency} {item.discount}

                                                                </span>

                                                            </div>
                                                        )}

                                                    </div>

                                                    <div
                                                        className="
                                    mt-5

                                    flex justify-between

                                    border-t border-slate-200

                                    pt-5

                                    text-base font-semibold

                                    text-slate-900
                                "
                                                    >

                                                        <span>Total</span>

                                                        <span>

                                                            {item.currency} {item.totalAmount}

                                                        </span>

                                                    </div>

                                                </div>
                                            )}

                                        {/* =====================================================
                   ACTIONS
                   ===================================================== */}

                                        <div
                                            className="
                        flex flex-wrap justify-end gap-3

                        border-t border-slate-200

                        pt-6
                    "
                                        >

                                            {/* DOWNLOAD ONLY FOR PENDING */}

                                            {isPendingTab && (

                                                <a
                                                    href={`/pharmacy/invoice/${item.id}/download`}

                                                    target="_blank"

                                                    className="
                                inline-flex items-center gap-2

                                rounded-lg

                                border border-slate-200

                                bg-white

                                px-5 py-3

                                text-sm font-semibold

                                text-slate-700

                                transition

                                hover:bg-slate-50
                            "
                                                >

                                                    <Download size={16} />

                                                    Download Invoice

                                                </a>
                                            )}

                                            {/* PAY */}

                                            {isPendingTab &&
                                                item.paymentStatus === "PENDING" && (

                                                    <button
                                                        onClick={async () => {

                                                            try {

                                                                const res =
                                                                    await api.post(
                                                                        `/payments/pay-prescription/${item.id}`
                                                                    );

                                                                const data =
                                                                    res.data.data;
                                                                console.log(data, 'ssq')
                                                                if (
                                                                    data.gateway ===
                                                                    "RAZORPAY"
                                                                ) {

                                                                    const options = {

                                                                        key: data.key,

                                                                        amount: data.amount,

                                                                        currency: data.currency,

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
                                    inline-flex items-center gap-2

                                    rounded-lg

                                    bg-teal-600

                                    px-5 py-3

                                    text-sm font-semibold
                                    text-white

                                    shadow-sm

                                    transition-all duration-200

                                    hover:bg-teal-700
                                    hover:shadow-md
                                "
                                                    >

                                                        <CreditCard size={16} />

                                                        Pay Now

                                                    </button>

                                                )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}