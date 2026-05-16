"use client";

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Link from "next/link";

import {
    Search,
    Calendar,
    User2,
    ArrowUpRight,
    Activity,
    Clock3,
} from "lucide-react";

import Loader from "@/components/common/Loader";

export default function PatientsPage() {

    /* =====================================================
       FILTERS
    ===================================================== */

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("ALL");

    /* =====================================================
       QUERY
    ===================================================== */

    const {
        data = [],
        isLoading,
    } = useQuery({

        queryKey: [
            "doctor-patients",
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/consultations/patients"
                );

            return res.data;
        },
    });

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredPatients =
        useMemo(() => {

            let filtered =
                [...data];

            /* SEARCH */

            if (search) {

                filtered =
                    filtered.filter(
                        (p: any) =>

                            p.name
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )

                            ||

                            p.email
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                    );
            }

            /* FILTERS */

            if (filter === "RECENT") {

                filtered.sort(

                    (a: any, b: any) =>

                        new Date(
                            b.recentActivity
                        ).getTime()

                        -

                        new Date(
                            a.recentActivity
                        ).getTime()
                );
            }

            if (
                filter === "MOST_VISITS"
            ) {

                filtered.sort(

                    (a: any, b: any) =>

                        b.totalAppointments

                        -

                        a.totalAppointments
                );
            }

            return filtered;

        }, [
            data,
            search,
            filter,
        ]);

    /* =====================================================
       LOADING
    ===================================================== */

    if (isLoading) {
        return <Loader fullScreen />;
    }

    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="space-y-8 max-w-7xl mx-auto">

            {/* =====================================================
               HERO
            ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-gradient-to-br
                    from-teal-50
                    via-white
                    to-cyan-50

                    p-8

                    shadow-sm
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

                    <div>

                        <div
                            className="
                                inline-flex items-center gap-2

                                rounded-full

                                border border-teal-100

                                bg-white

                                px-4 py-2

                                text-xs font-semibold

                                uppercase tracking-wide

                                text-teal-700
                            "
                        >

                            <User2 size={14} />

                            Patient Management

                        </div>

                        <h1
                            className="
                                mt-5

                                text-4xl font-semibold

                                tracking-[-0.03em]

                                text-slate-900
                            "
                        >

                            My Patients

                        </h1>

                        <p
                            className="
                                mt-3

                                max-w-2xl

                                text-sm leading-7

                                text-slate-600
                            "
                        >

                            Manage patient records,
                            appointments,
                            visit history,
                            and consultation activity
                            from one place.

                        </p>

                    </div>

                    {/* SEARCH */}

                    <div className="relative">

                        <Search
                            size={18}

                            className="
                                absolute left-4 top-1/2

                                -translate-y-1/2

                                text-slate-400
                            "
                        />

                        <input
                            type="text"

                            placeholder="Search patients..."

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                            className="
                                w-full min-w-[300px]

                                rounded-2xl

                                border border-slate-200

                                bg-white

                                py-3 pl-11 pr-4

                                text-sm

                                outline-none

                                transition

                                focus:border-teal-500
                                focus:ring-4
                                focus:ring-teal-500/10
                            "
                        />

                    </div>

                </div>

            </div>

            {/* =====================================================
               FILTERS
            ===================================================== */}

            <div className="flex flex-wrap gap-3">

                {[
                    "ALL",
                    "RECENT",
                    "MOST_VISITS",
                ].map((f) => (

                    <button
                        key={f}

                        onClick={() =>
                            setFilter(f)
                        }

                        className={`
                            rounded-lg

                            border

                            px-5 py-2.5

                            text-sm font-medium

                            transition

                            ${filter === f

                                ? `
                                    border-navy
                                    bg-navy
                                    text-white
                                `

                                : `
                                    border-slate-200
                                    bg-white
                                    text-slate-600

                                    hover:bg-slate-50
                                `
                            }
                        `}
                    >

                        {f
                            .replace("_", " ")}

                    </button>

                ))}

            </div>

            {/* =====================================================
               EMPTY
            ===================================================== */}

            {filteredPatients.length === 0 && (

                <div
                    className="
                        rounded-2xl

                        border border-dashed
                        border-slate-300

                        bg-white

                        py-20

                        text-center
                    "
                >

                    <div
                        className="
                            mx-auto

                            flex h-16 w-16
                            items-center justify-center

                            rounded-2xl

                            bg-slate-100

                            text-slate-400
                        "
                    >

                        <User2 size={26} />

                    </div>

                    <h3
                        className="
                            mt-5

                            text-lg font-semibold

                            text-slate-900
                        "
                    >

                        No Patients Found

                    </h3>

                    <p
                        className="
                            mt-2

                            text-sm

                            text-slate-500
                        "
                    >

                        No matching patients available.

                    </p>

                </div>

            )}

            {/* =====================================================
               PATIENTS
            ===================================================== */}

            <div
                className="
                    grid gap-5

                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >

                {filteredPatients.map(
                    (patient: any) => (

                        <div
                            key={patient.id}

                            className="
                                group

                                overflow-hidden

                                rounded-2xl

                                border border-slate-200

                                bg-white

                                p-6

                                shadow-sm

                                transition

                                hover:-translate-y-1
                                hover:shadow-md
                            "
                        >

                            {/* HEADER */}

                            <div
                                className="
                                    flex items-start justify-between
                                "
                            >

                                <div
                                    className="
                                        flex items-center gap-4
                                    "
                                >

                                    {/* AVATAR */}

                                    <div
                                        className="
                                            flex h-16 w-16
                                            items-center justify-center

                                            overflow-hidden

                                            rounded-2xl

                                            bg-navy

                                            text-lg font-semibold
                                            text-white

                                            shadow-sm
                                        "
                                    >

                                        {patient.image ? (

                                            <img
                                                src={patient.image}

                                                className="
                                                    h-full w-full

                                                    object-cover
                                                "
                                            />

                                        ) : (

                                            patient.name?.charAt(0)

                                        )}

                                    </div>

                                    {/* INFO */}

                                    <div>

                                        <h3
                                            className="
                                                text-lg font-semibold

                                                text-slate-900
                                            "
                                        >

                                            {patient.name}

                                        </h3>

                                        <p
                                            className="
                                                mt-1

                                                text-sm

                                                text-slate-500
                                            "
                                        >

                                            {patient.email}

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* STATS */}

                            <div
                                className="
                                    mt-6

                                    grid grid-cols-2 gap-3
                                "
                            >

                                <MiniCard
                                    icon={
                                        <Calendar size={16} />
                                    }

                                    label="Appointments"

                                    value={
                                        patient.totalAppointments || 0
                                    }
                                />

                                <MiniCard
                                    icon={
                                        <Clock3 size={16} />
                                    }

                                    label="Last Visit"

                                    value={
                                        patient.lastVisit

                                            ? new Date(
                                                patient.lastVisit
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            )

                                            : "—"
                                    }
                                />

                            </div>

                            {/* RECENT */}

                            <div
                                className="
                                    mt-5

                                    rounded-2xl

                                    border border-slate-200

                                    bg-slate-50/70

                                    p-4
                                "
                            >

                                <div
                                    className="
                                        flex items-center gap-2
                                    "
                                >

                                    <Activity
                                        size={15}

                                        className="
                                            text-teal-600
                                        "
                                    />

                                    <span
                                        className="
                                            text-xs font-medium

                                            uppercase tracking-wide

                                            text-slate-500
                                        "
                                    >

                                        Recent Activity

                                    </span>

                                </div>

                                <p
                                    className="
                                        mt-2

                                        text-sm

                                        text-slate-700
                                    "
                                >

                                    {patient.recentActivity

                                        ? new Date(
                                            patient.recentActivity
                                        ).toLocaleString(
                                            "en-GB",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",

                                                hour: "numeric",
                                                minute: "2-digit",

                                                hour12: true,
                                            }
                                        )

                                        : "No activity"}
                                </p>

                            </div>

                            {/* ACTION */}

                            <div className="mt-6">

                                <Link
                                    href={`/doctor/patients/${patient.id}`}

                                    className="
                                        inline-flex w-full items-center justify-center gap-2

                                        rounded-2xl

                                        bg-[#1F2147]

                                        px-5 py-3

                                        text-sm font-medium

                                        text-white

                                        transition

                                        hover:bg-[#141633]
                                    "
                                >

                                    View Patient

                                    <ArrowUpRight size={16} />

                                </Link>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
}

/* =====================================================
   MINI CARD
===================================================== */

function MiniCard({
    icon,
    label,
    value,
}: any) {

    return (

        <div
            className="
                rounded-2xl

                border border-slate-200

                bg-slate-50/70

                p-4
            "
        >

            <div
                className="
                    flex items-center gap-2
                "
            >

                <div className="text-teal-600">
                    {icon}
                </div>

                <span
                    className="
                        text-xs font-medium

                        uppercase tracking-wide

                        text-slate-500
                    "
                >

                    {label}

                </span>

            </div>

            <p
                className="
                    mt-3

                    text-lg font-semibold

                    text-slate-900
                "
            >

                {value}

            </p>

        </div>

    );
}