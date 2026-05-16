"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailsModal from "./AppointmentModal";
import { CalendarX2, Search } from "lucide-react";
import Loader from "@/components/common/Loader";
import SelectOption from "@/components/common/SelectOption";
import AppointmentReviewModal from "./AppointmentReviewModal";

export default function UserAppointments() {

    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<any>(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [reviewAppointment, setReviewAppointment] = useState<any>(null);

    useEffect(() => {
        fetchAppointments();
    }, [statusFilter]);

    useEffect(() => {

        const pendingReview =
            appointments.find(
                (a) =>
                    a.status === "COMPLETED" &&
                    a.doctorRatingStatus ===
                    "PENDING"
            );

        if (pendingReview) {
            setReviewAppointment(
                pendingReview
            );
        }

    }, [appointments]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const res = await api.get("/appointments/my", {
                params: statusFilter ? { status: statusFilter } : {},
            });

            setAppointments(res.data);

        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        return appointments.filter((a) =>
            a.doctor?.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [appointments, search]);

    return (

        <div className="space-y-8">

            {/* =====================================================
           PAGE HEADER
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

                    bg-gradient-to-r
                    from-wellness-bg/90
                    via-wellness-bg/50
                    to-white

                    px-4 md:px-8 py-7
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

                                Appointments

                            </div>

                            <h1
                                className="
                                text-3xl font-semibold mt-2

                                tracking-[-0.03em]

                                text-navy-dark
                            "
                            >

                                My Appointments

                            </h1>

                            <p
                                className="
                                mt-2

                                max-w-2xl

                                text-sm leading-6

                                text-slate-500
                            "
                            >

                                View upcoming consultations,
                                manage payments, join meetings,
                                and track your appointment history.

                            </p>

                        </div>

                        {/* STATS */}

                        <div
                            className="
                            inline-flex items-center gap-3

                            rounded-2xl

                            border border-teal-100

                            bg-white/80

                            px-2 md:px-5 py-4
                        "
                        >

                            <div
                                className="
                                flex h-12 w-12
                                items-center justify-center

                                rounded-2xl

                                bg-teal-100
                            "
                            >

                                <CalendarX2
                                    size={22}
                                    className="text-teal-700"
                                />

                            </div>

                            <div>

                                <p
                                    className="
                                    text-xs font-medium

                                    uppercase tracking-wide

                                    text-slate-400
                                "
                                >

                                    Total

                                </p>

                                <p
                                    className="
                                    text-2xl font-semibold

                                    text-slate-800
                                "
                                >

                                    {appointments.length}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================================
               FILTER BAR
               ===================================================== */}

                <div className="p-4 md:p-8">

                    <div
                        className="
                        rounded-2xl

                        border border-slate-200

                        bg-slate-50/80

                        p-5
                    "
                    >

                        <div
                            className="
                            flex flex-col gap-4

                            xl:flex-row
                            xl:items-center
                            xl:justify-between
                        "
                        >

                            {/* LEFT */}

                            <div
                                className="
                                flex flex-col gap-3

                                md:flex-row

                                flex-1
                            "
                            >

                                {/* SEARCH */}

                                <div className="relative flex-1">

                                    <Search
                                        size={18}
                                        className="
                                        absolute left-4 top-1/2
                                        -translate-y-1/2

                                        text-slate-400
                                    "
                                    />

                                    <input
                                        placeholder="Search doctor name..."

                                        value={search}

                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }

                                        className="
                                        w-full

                                        rounded-xl

                                        border border-slate-200

                                        bg-white

                                        py-3 pl-11 pr-4

                                        text-sm

                                        shadow-sm

                                        transition

                                        focus:border-teal-500
                                        focus:outline-none
                                        focus:ring-4
                                        focus:ring-teal-500/10
                                    "
                                    />

                                </div>

                                {/* STATUS */}

                                <SelectOption
                                    value={statusFilter}

                                    onChange={setStatusFilter}

                                    placeholder="All Status"

                                    className="min-w-[200px]"

                                    subClasses="
                                    rounded-xl

                                    border border-slate-200

                                    bg-white

                                    px-4 py-3

                                    shadow-sm
                                "

                                    options={[
                                        {
                                            label: "All Status",
                                            value: "",
                                        },

                                        {
                                            label: "Confirmed",
                                            value: "CONFIRMED",
                                        },

                                        {
                                            label: "Pending",
                                            value: "PENDING",
                                        },

                                        {
                                            label: "Completed",
                                            value: "COMPLETED",
                                        },

                                        {
                                            label: "Cancelled",
                                            value: "CANCELLED",
                                        },

                                        {
                                            label: "No Show",
                                            value: "NO_SHOW",
                                        },
                                    ]}
                                />

                            </div>

                            {/* QUICK FILTERS */}

                            <div className="flex flex-wrap gap-2">

                                {[
                                    {
                                        label: "Upcoming",
                                        value: "CONFIRMED",
                                    },

                                    {
                                        label: "Completed",
                                        value: "COMPLETED",
                                    },

                                    {
                                        label: "Cancelled",
                                        value: "CANCELLED",
                                    },
                                ].map((item) => (

                                    <button
                                        key={item.value}

                                        onClick={() =>
                                            setStatusFilter(
                                                item.value
                                            )
                                        }

                                        className={`
                                        rounded-full

                                        px-4 py-2

                                        text-sm font-medium

                                        transition

                                        ${statusFilter === item.value

                                                ? `
                                                bg-teal-600
                                                text-white
                                                shadow-sm
                                            `

                                                : `
                                                bg-white
                                                text-slate-600

                                                border border-slate-200

                                                hover:bg-slate-100
                                            `
                                            }
                                    `}
                                    >

                                        {item.label}

                                    </button>

                                ))}

                                {(search || statusFilter) && (

                                    <button
                                        onClick={() => {

                                            setSearch("");

                                            setStatusFilter("");
                                        }}

                                        className="
                                        rounded-full

                                        border border-red-200

                                        bg-red-50

                                        px-4 py-2

                                        text-sm font-medium

                                        text-red-600

                                        transition

                                        hover:bg-red-100
                                    "
                                    >

                                        Clear

                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* =====================================================
                   LIST
                   ===================================================== */}

                    <div className="mt-8">

                        {loading ? (

                            <Loader fullScreen />

                        ) : filtered.length === 0 ? (

                            <div
                                className="
                                flex flex-col
                                items-center
                                justify-center

                                rounded-3xl

                                border border-slate-200

                                bg-white

                                p-14

                                text-center

                                shadow-sm
                            "
                            >

                                <div
                                    className="
                                    mb-5

                                    flex h-16 w-16
                                    items-center justify-center

                                    rounded-full

                                    bg-slate-100
                                "
                                >

                                    <CalendarX2
                                        size={30}
                                        className="text-slate-400"
                                    />

                                </div>

                                <h3
                                    className="
                                    text-lg font-semibold

                                    text-slate-700
                                "
                                >

                                    No appointments found

                                </h3>

                                <p
                                    className="
                                    mt-2

                                    max-w-md

                                    text-sm leading-6

                                    text-slate-500
                                "
                                >

                                    Try changing your search or
                                    filters to view more appointments.

                                </p>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {filtered.map((appt) => (

                                    <AppointmentCard
                                        key={appt.id}

                                        appt={appt}

                                        onView={() =>
                                            setSelected(appt)
                                        }
                                    />

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {selected && (
                <AppointmentDetailsModal
                    appointment={selected}
                    onClose={() => setSelected(null)}
                />
            )}

            {reviewAppointment && (
                <AppointmentReviewModal
                    appointment={reviewAppointment}
                    onClose={() =>
                        setReviewAppointment(null)
                    }
                    onSubmitted={fetchAppointments}
                />
            )}

        </div>
    );
}