"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import {
    DollarSign,
    Users,
    Activity,
    CreditCard,
} from "lucide-react";
import SelectOption from "@/components/common/SelectOption";

export default function AdminAnalytics() {

    const [range, setRange] =
        useState<
            "daily" |
            "weekly" |
            "monthly"
        >("daily");

    const [doctorId, setDoctorId] =
        useState("");

    /* =====================================================
       DOCTORS
       ===================================================== */

    const {
        data: doctors = [],
    } = useQuery({

        queryKey: [
            "doctor-list",
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/admin/doctors"
                );

            return res.data.filter(
                (d: any) =>
                    d?.doctor?.isApproved &&
                    d?.isActive
            );
        },
    });

    /* =====================================================
       ANALYTICS
       ===================================================== */

    const {
        data,
        isLoading,
    } = useQuery({

        queryKey: [
            "admin-analytics",
            range,
            doctorId,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/admin/payments/analytics",
                    {
                        params: {
                            range,
                            doctorId,
                        },
                    }
                );

            return res.data;
        },
    });

    /* =====================================================
       LOADING
       ===================================================== */

    if (isLoading) {

        return (

            <div
                className="
                    pt-32

                    text-center
                "
            >

                Loading analytics...

            </div>
        );
    }

    /* =====================================================
       HELPERS
       ===================================================== */

    const currencies = [
        "INR",
        "USD",
        "GBP",
        "EUR",
        "AED",
        "CAD",
    ];

    const formatCurrency =
        (
            currency: string,
            value: number
        ) => {

            try {

                return new Intl.NumberFormat(
                    "en-US",
                    {
                        style: "currency",
                        currency,
                        maximumFractionDigits: 0,
                    }
                ).format(value);

            } catch {

                return `${currency} ${value}`;
            }
        };

    /* =====================================================
       UI
       ===================================================== */

    return (

        <div className="space-y-8">

            {/* =====================================================
               HEADER
               ===================================================== */}

            <div
                className="

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200
                        rounded-2xl

                        bg-gradient-to-r
                        from-teal-50
                        via-cyan-50
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

                                Revenue Analytics

                            </div>

                            <h1
                                className="
                                    mt-4

                                    text-3xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                            >

                                Financial Dashboard

                            </h1>

                            <p
                                className="
                                    mt-2

                                    text-sm leading-6

                                    text-slate-500
                                "
                            >

                                Track completed revenue,
                                gross revenue, transactions,
                                and doctor performance across
                                all currencies.

                            </p>

                        </div>

                        {/* FILTERS */}

                        <div
                            className="
                                flex flex-col gap-3

                                md:flex-row
                                md:items-center
                            "
                        >

                            {/* RANGE */}

                            <div
                                className="
                                    inline-flex

                                    rounded-2xl

                                    border border-slate-200

                                    bg-slate-100

                                    p-1
                                "
                            >

                                {[
                                    "daily",
                                    "weekly",
                                    "monthly",
                                ].map((r) => (

                                    <button
                                        key={r}

                                        onClick={() =>
                                            setRange(
                                                r as any
                                            )
                                        }

                                        className={`
                                            rounded-xl

                                            px-5 py-2.5

                                            text-sm font-medium

                                            capitalize

                                            transition

                                            ${range === r

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

                                        {r}

                                    </button>

                                ))}

                            </div>

                            {/* DOCTOR */}

                            <SelectOption
                                value={doctorId}

                                onChange={setDoctorId}

                                placeholder="All Doctors"

                                className="min-w-[220px]"

                                subClasses="
        rounded-2xl

        border border-slate-200

        bg-white

        px-4 py-3

        text-sm

        text-slate-700

        shadow-sm
    "

                                options={[

                                    {
                                        label: "All Doctors",
                                        value: "",
                                    },

                                    ...doctors.map((d: any) => ({

                                        label: d.name,

                                        value: d?.doctor?.id,
                                    })),
                                ]}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
               COUNTS
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-5

                    md:grid-cols-3
                "
            >

                <MiniCard
                    icon={
                        <CreditCard size={18} />
                    }

                    title="Transactions"

                    value={
                        data.counts
                            .totalTransactions
                    }
                />

                <MiniCard
                    icon={
                        <Users size={18} />
                    }

                    title="Active Doctors"

                    value={
                        data.counts
                            .activeDoctors
                    }
                />

                <MiniCard
                    icon={
                        <Activity size={18} />
                    }

                    title="Range"

                    value={range}
                />

            </div>

            {/* =====================================================
               COMPLETED REVENUE
               ===================================================== */}

            <CurrencySection
                title="Completed Revenue"

                subtitle="
                    Revenue successfully received from paid transactions.
                "

                data={
                    data.completedRevenue.total
                }

                formatCurrency={
                    formatCurrency
                }
            />

            {/* =====================================================
               GROSS REVENUE
               ===================================================== */}

            <CurrencySection
                title="Gross Revenue"

                subtitle="
                    Total generated revenue including pending and cancelled appointments.
                "

                data={
                    data.grossRevenue
                }

                formatCurrency={
                    formatCurrency
                }
            />

            {/* =====================================================
               BREAKDOWN
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-6

                    lg:grid-cols-2
                "
            >

                <RevenueCard
                    title="Slot Revenue"

                    data={
                        data.completedRevenue
                            .slot
                    }

                    formatCurrency={
                        formatCurrency
                    }
                />

                <RevenueCard
                    title="Consultation Revenue"

                    data={
                        data.completedRevenue
                            .consultation
                    }

                    formatCurrency={
                        formatCurrency
                    }
                />

                <RevenueCard
                    title="Prescription Revenue"

                    data={
                        data.completedRevenue
                            .prescription
                    }

                    formatCurrency={
                        formatCurrency
                    }
                />

                <RevenueCard
                    title="Pharmacy Revenue"

                    data={
                        data.completedRevenue
                            .pharmacy
                    }

                    formatCurrency={
                        formatCurrency
                    }
                />

            </div>

            {/* =====================================================
               DOCTOR PERFORMANCE
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200

                        px-7 py-5
                    "
                >

                    <h2
                        className="
                            text-xl font-semibold

                            text-slate-900
                        "
                    >

                        Doctor Performance

                    </h2>

                </div>

                <div className="p-6 space-y-5">

                    {data.doctorStats.map(
                        (doc: any) => (

                            <div
                                key={doc.doctorId}

                                className="
                                    rounded-3xl

                                    border border-slate-200

                                    bg-slate-50/60

                                    p-6
                                "
                            >

                                {/* HEADER */}

                                <div
                                    className="
                                        flex flex-col gap-4

                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                    "
                                >

                                    <div>

                                        <h3
                                            className="
                                                text-lg font-semibold

                                                text-slate-900
                                            "
                                        >

                                            {doc.doctorName}

                                        </h3>

                                        <p
                                            className="
                                                mt-1

                                                text-sm

                                                text-slate-500
                                            "
                                        >

                                            {doc.transactions} transactions

                                        </p>

                                    </div>

                                </div>

                                {/* CURRENCIES */}

                                <div className="mt-6 space-y-4">

                                    {Object.entries(
                                        doc.currencies
                                    ).map(
                                        (
                                            [currency, val]: any
                                        ) => (

                                            <div
                                                key={currency}

                                                className="
                                                    rounded-2xl

                                                    border border-slate-200

                                                    bg-white

                                                    p-5
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex items-center justify-between
                                                    "
                                                >

                                                    <h4
                                                        className="
                                                            text-sm font-semibold

                                                            text-slate-700
                                                        "
                                                    >

                                                        {currency}

                                                    </h4>

                                                    <p
                                                        className="
                                                            text-lg font-semibold

                                                            text-teal-600
                                                        "
                                                    >

                                                        {formatCurrency(
                                                            currency,
                                                            val.completedRevenue
                                                        )}

                                                    </p>

                                                </div>

                                                <div
                                                    className="
                                                        mt-5

                                                        grid grid-cols-2 gap-4

                                                        md:grid-cols-5
                                                    "
                                                >

                                                    <Stat
                                                        label="Slot"
                                                        value={
                                                            formatCurrency(
                                                                currency,
                                                                val.slotRevenue
                                                            )
                                                        }
                                                    />

                                                    <Stat
                                                        label="Consultation"
                                                        value={
                                                            formatCurrency(
                                                                currency,
                                                                val.consultationRevenue
                                                            )
                                                        }
                                                    />

                                                    <Stat
                                                        label="Prescription"
                                                        value={
                                                            formatCurrency(
                                                                currency,
                                                                val.prescriptionRevenue
                                                            )
                                                        }
                                                    />

                                                    <Stat
                                                        label="Pharmacy"
                                                        value={
                                                            formatCurrency(
                                                                currency,
                                                                val.pharmacyRevenue
                                                            )
                                                        }
                                                    />

                                                    <Stat
                                                        label="Gross"
                                                        value={
                                                            formatCurrency(
                                                                currency,
                                                                val.grossRevenue
                                                            )
                                                        }
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

            {/* =====================================================
               TRANSACTIONS
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200

                        px-7 py-5
                    "
                >

                    <h2
                        className="
                            text-xl font-semibold

                            text-slate-900
                        "
                    >

                        Transactions

                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead
                            className="
                                bg-slate-50
                            "
                        >

                            <tr>

                                <Th>Date</Th>

                                <Th>Doctor</Th>

                                <Th>Type</Th>

                                <Th>Currency</Th>

                                <Th>Amount</Th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.transactions.map(
                                (t: any) => (

                                    <tr
                                        key={t.id}

                                        className="
                                            border-t border-slate-200
                                        "
                                    >

                                        <Td>
                                            {new Date(
                                                t.date
                                            ).toLocaleDateString()}
                                        </Td>

                                        <Td>
                                            {t.doctorName}
                                        </Td>

                                        <Td>
                                            {t.type}
                                        </Td>

                                        <Td>
                                            {t.currency}
                                        </Td>

                                        <Td>
                                            {formatCurrency(
                                                t.currency,
                                                t.amount
                                            )}
                                        </Td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

/* =====================================================
   MINI CARD
   ===================================================== */

function MiniCard({
    icon,
    title,
    value,
}: any) {

    return (

        <div
            className="
                rounded-xl

                border border-slate-200

                bg-white

                p-6

                shadow-sm
            "
        >

            <div
                className="
                    flex h-11 w-11
                    items-center justify-center

                    rounded-xl

                    bg-teal-50

                    text-teal-600
                "
            >

                {icon}

            </div>

            <p
                className="
                    mt-4

                    text-sm

                    text-slate-500
                "
            >

                {title}

            </p>

            <p
                className="
                    mt-2

                    text-3xl font-semibold

                    text-slate-900
                "
            >

                {value}

            </p>

        </div>

    );
}

/* =====================================================
   CURRENCY SECTION
   ===================================================== */

function CurrencySection({
    title,
    subtitle,
    data,
    formatCurrency,
}: any) {

    return (

        <div
            className="
                overflow-hidden

                rounded-2xl

                border border-slate-200

                bg-white

                shadow-sm
            "
        >

            <div
                className="
                    border-b border-slate-200

                    px-7 py-5
                "
            >

                <h2
                    className="
                        text-xl font-semibold

                        text-slate-900
                    "
                >

                    {title}

                </h2>

                <p
                    className="
                        mt-1

                        text-sm

                        text-slate-500
                    "
                >

                    {subtitle}

                </p>

            </div>

            <div
                className="
                    grid grid-cols-2 gap-5

                    p-6

                    md:grid-cols-3
                    lg:grid-cols-6
                "
            >

                {Object.entries(data).map(
                    (
                        [currency, value]: any
                    ) => (

                        <div
                            key={currency}

                            className="
                                rounded-2xl

                                border border-slate-200

                                bg-slate-50/60

                                p-5
                            "
                        >

                            <p
                                className="
                                    text-xs font-medium

                                    uppercase tracking-wide

                                    text-slate-400
                                "
                            >

                                {currency}

                            </p>

                            <p
                                className="
                                    mt-3

                                    text-lg font-semibold

                                    text-slate-900
                                "
                            >

                                {formatCurrency(
                                    currency,
                                    value
                                )}

                            </p>

                        </div>

                    )
                )}

            </div>

        </div>

    );
}

/* =====================================================
   REVENUE CARD
   ===================================================== */

function RevenueCard({
    title,
    data,
    formatCurrency,
}: any) {

    return (

        <div
            className="
                rounded-2xl

                border border-slate-200

                bg-white

                p-6

                shadow-sm
            "
        >

            <h3
                className="
                    text-lg font-semibold

                    text-slate-900
                "
            >

                {title}

            </h3>

            <div className="mt-5 space-y-3">

                {Object.entries(data).map(
                    (
                        [currency, value]: any
                    ) => (

                        <div
                            key={currency}

                            className="
                                flex items-center justify-between

                                rounded-2xl

                                border border-slate-200

                                bg-slate-50/60

                                px-4 py-3
                            "
                        >

                            <span
                                className="
                                    text-sm font-medium

                                    text-slate-600
                                "
                            >

                                {currency}

                            </span>

                            <span
                                className="
                                    text-sm font-semibold

                                    text-slate-900
                                "
                            >

                                {formatCurrency(
                                    currency,
                                    value
                                )}

                            </span>

                        </div>

                    )
                )}

            </div>

        </div>

    );
}

/* =====================================================
   TABLE
   ===================================================== */

function Th({
    children,
}: any) {

    return (

        <th
            className="
                px-6 py-4

                text-left

                font-medium

                text-slate-600
            "
        >

            {children}

        </th>

    );
}

function Td({
    children,
}: any) {

    return (

        <td
            className="
                px-6 py-4

                text-slate-700
            "
        >

            {children}

        </td>

    );
}

/* =====================================================
   STAT
   ===================================================== */

function Stat({
    label,
    value,
}: any) {

    return (

        <div>

            <p
                className="
                    text-xs

                    uppercase tracking-wide

                    text-slate-400
                "
            >

                {label}

            </p>

            <p
                className="
                    mt-1

                    text-sm font-semibold

                    text-slate-900
                "
            >

                {value}

            </p>

        </div>

    );
}